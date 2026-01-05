from django.urls import path
from .views import  me_view, logout_view, SignupView, JWTLoginView
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    # path("login/", login_view, name="login"),
    path("login/", JWTLoginView.as_view(), name="login"),
    path("signup/", SignupView.as_view(), name="signup"),
    path("me/", me_view, name="me"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", logout_view, name="logout")
]