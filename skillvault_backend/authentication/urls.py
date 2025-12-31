from django.urls import path
from .views import login_view, me_view, logout_view, SignupView

urlpatterns = [
    path("login/", login_view, name="login"),
    path("signup/", SignupView.as_view(), name="signup"),
    path("me/", me_view, name="me"),
    path("logout/", logout_view, name="logout")
]