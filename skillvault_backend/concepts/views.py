from rest_framework import viewsets
from rest_framework.filters import OrderingFilter

from .models import Concept
from .serializers import ConceptSerializer
from .pagination import CustomPagination


class ConceptViewSet(viewsets.ModelViewSet):
    serializer_class = ConceptSerializer
    pagination_class = CustomPagination
    queryset = Concept.objects.all()
    
    filter_backends = [OrderingFilter]
    
    ordering_fields = [
        'created_at',
        'title',
        'id'
    ]
    
    ordering = ["-created_at", "id"]
    
    def get_queryset(self):
        qs = super().get_queryset()
        q = self.request.query_params.get('q', None)
        tags = self.request.query_params.get('tags')
        
        if q:
            qs = qs.filter(title__icontains=q)
        
        if tags:
            tag_list = [t.strip().lower() for t in tags.split(",")]
            qs = qs.filter(tags__name__in=tag_list).distinct()

        return qs