from django.urls import path
from .views import LoginView, RegisterCommercialView

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/checkusernameunique/", views.CheckUsernameUniqueView.as_view(), name="check_username_unique"),
    path("api/register/commercial/", RegisterCommercialView.as_view(), name="register"),
    path("api/login/", LoginView.as_view(), name="login"),
]
