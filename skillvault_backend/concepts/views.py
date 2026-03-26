from rest_framework.response import Response

from rest_framework import viewsets
from rest_framework.filters import OrderingFilter

from .models import Concept
from .serializers import ConceptSerializer
from .pagination import CustomPagination
from django.core.cache import cache
from .constants import CachePrefixes
from .helpers import invalidate_cache


class ConceptViewSet(viewsets.ModelViewSet):
    serializer_class = ConceptSerializer
    pagination_class = CustomPagination
    
    filter_backends = [OrderingFilter]
    
    ordering_fields = [
        'created_at',
        'title',
        'id'
    ]
    
    ordering = ["-created_at", "id"]
    
    def list(self, request, *args, **kwargs):
        cache_key = f"{CachePrefixes.CONCEPTS}_{request.user.id}_{request.get_full_path()}"
        cached = cache.get(cache_key)
        if cached:
            return Response(cached)
        response = super().list(request, *args, **kwargs)
        print("Setting cache for key:", cache_key)
        cache.set(cache_key, response.data, timeout=None)
        return response
    
    def get_queryset(self):
        qs = Concept.objects.filter(owner=self.request.user)
        q = self.request.query_params.get('q', None)
        tags = self.request.query_params.get('tags')
        
        if q:
            qs = qs.filter(title__icontains=q)
        
        if tags:
            tag_list = [t.strip().lower() for t in tags.split(",")]
            qs = qs.filter(tags__name__in=tag_list).distinct()

        return qs

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        invalidate_cache(self, CachePrefixes.CONCEPTS)
        
    def perform_update(self,serializer):
        serializer.save(owner=self.request.user)
        invalidate_cache(self, CachePrefixes.CONCEPTS)
    
    def perform_destroy(self, instance):
        instance.delete()
        invalidate_cache(self, CachePrefixes.CONCEPTS)