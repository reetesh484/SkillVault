from rest_framework import serializers
from .models import Concept, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class ConceptSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True,required=False)
    tag_names = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = Concept
        fields = ["id", "title", "notes", "tags", "tag_names"]
    
    def create(self, validated_data):
        tag_names = validated_data.pop('tag_names', [])
        concept = super().create(validated_data)
        concept.tags.set(self._resolve_tags(tag_names))
        return concept

    def update(self, instance,  validated_data):
        tag_names = validated_data.pop("tag_names", None)
        instance = super().update(instance, validated_data)
        
        if tag_names is not None:
            instance.tags.set(self._resolve_tags(tag_names))
        
        return instance
    
    def _resolve_tags(self, tag_names):
        tags = []
        for name in tag_names:
            normalized = name.strip().lower()
            if not normalized:
                continue
            tag, _ = Tag.objects.get_or_create(name=normalized)
            tags.append(tag)
        return tags
        
        