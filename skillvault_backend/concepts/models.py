from django.db import models
from django.contrib.auth.models import User

class Tag(models.Model):
    name = models.CharField(max_length=50,unique=True)
    
    def __str__(self):
        return self.name

class Concept(models.Model):
    title = models.CharField(max_length=255)
    notes = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, related_name="concepts", blank=True)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="concepts",
    )
    
    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
