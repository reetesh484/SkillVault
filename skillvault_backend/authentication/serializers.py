from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

class SignupSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    firstname = serializers.CharField(required=True)
    lastname = serializers.CharField(required=True)
    email = serializers.EmailField(required=False)

    def validate_username(self,value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists!")
        return value
    
    def create(self,validated_data):
        return User.objects.create(
            username=validated_data['username'], 
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data['firstname'],
            last_name=validated_data['lastname']
        )

class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = serializers.CharField(required=False)
    def validate(self, attrs):
        request = self.context.get("request")
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            raise serializers.ValidationError("Refresh token is required.")
        attrs["refresh"] = refresh_token
        return super().validate(attrs)
