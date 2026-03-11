from concepts.models import Concept, Tag, User
from django.contrib.auth.models import User


def run():
    user = User.objects.first()
    
    user.set_password("admin")
    user.save()
