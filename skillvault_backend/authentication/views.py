from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import SignupSerializer
from django.db import transaction
from rest_framework_simplejwt.tokens import RefreshToken

# Session based auth 
# @api_view(["POST"])
# @permission_classes([AllowAny])
# def login_view(request):
#     username = request.data.get("username")
#     password = request.data.get("password")
    
#     user = authenticate(request, username=username, password=password)
    
#     if user is None:
#         return Response(
#             {"detail": "Invalid credentials"},
#             status=status.HTTP_401_UNAUTHORIZED
#         )
    
#     login(request,user)
#     return Response({"detail": "Login successful"}, status=status.HTTP_200_OK)

# jwt auth 
class JWTLoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is None:
            return Response(
                {"detail": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)
        
        response = Response({
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
        
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite='Lax',
            path='/'
        )

        return response


@api_view(["GET"])
def me_view(request):
    user = request.user

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
    })
    
@api_view(["POST"])
def logout_view(request):
    response = Response({"detail": "Logged out"}, status=status.HTTP_200_OK)
    response.delete_cookie('refresh_token', path='/', samesite='Lax')
    return response

class SignupView(APIView):
    authentication_classes = []
    permission_classes = []
    
    
    def post(self,request):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            user = serializer.save()
            # login(request,user)
            refresh = RefreshToken.for_user(user)

            response = Response({
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)

            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite='Lax',
                path='/'
            )

            return response