from django.urls import path
from .views import LoginView, RegisterCommercialView
from rest_framework_simplejwt.views import TokenRefreshView


from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/check-username-unique/", views.CheckUsernameUniqueView.as_view(), name="check_username_unique"),
    path("api/register/commercial/", RegisterCommercialView.as_view(), name="register_commercial"),
    path("api/register/contract/", views.RegisterContractBreweryView.as_view(), name="register_contract"),
    path("api/login/", LoginView.as_view(), name="login"),
    
    path("api/devices/add/", views.DeviceCreateView.as_view(), name="device_create"),
    path("api/devices/brewery/<int:brewery_id>/", views.DeviceListForBreweryView.as_view(), name="device_list_brewery"),
    path("api/devices/all/", views.DeviceListAllView.as_view(), name="device_list_all"),
    path("api/devices/<int:device_id>/time-slots/all/", views.TimeSlotListView.as_view(), name="time_slot_list_all"),
    path("api/devices/<int:device_id>/time-slots/add/", views.TimeSlotCreateView.as_view(), name="time_slot_create"),
    path("api/devices/brewery/<int:brewery_id>/with-time-slots/", views.DevicesWithTimeSlotsView.as_view(), name="time_slot_list_brewery"),
]
