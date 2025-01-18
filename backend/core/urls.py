from django.urls import path
from .views import LoginView, RegisterCommercialView
from rest_framework_simplejwt.views import TokenRefreshView


from . import views

urlpatterns = [
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("check-username-unique/", views.CheckUsernameUniqueView.as_view(), name="check_username_unique"),
    path("register/commercial/", RegisterCommercialView.as_view(), name="register_commercial"),
    path("register/contract/", views.RegisterContractView.as_view(), name="register_contract"),
    path("login/", LoginView.as_view(), name="login"),

    path("devices/add/", views.DeviceCreateView.as_view(), name="device_create"),
    path("devices/brewery/<int:brewery_id>/", views.DeviceListForBreweryView.as_view(), name="device_list_brewery"),
    path("devices/all/", views.DeviceListAllView.as_view(), name="device_list_all"),
    path("devices/<int:device_id>/time-slots/all/", views.TimeSlotListView.as_view(), name="time_slot_list_all"),
    path("devices/<int:device_id>/time-slots/add/", views.TimeSlotCreateView.as_view(), name="time_slot_create"),
    path("devices/brewery/<int:brewery_id>/with-time-slots/", views.DevicesWithTimeSlotsView.as_view(), name="time_slot_list_brewery"),
    path(
        "commercial-brewery/<int:brewery_id>/",
        views.CommercialBreweryInfo.as_view(),
        name="commercial_brewery_info"
    ),
    path(
        "contract-brewery/<int:brewery_id>/",
        views.ContractBreweryInfo.as_view(),
        name="contract_brewery_info"
    ),
    path(
        "accounts/commercial/<int:profile_id>/",
        views.CommercialAccountInfo.as_view(),
        name="commercial_account_info"
    ),
    path(
        "accounts/contract/<int:profile_id>/",
        views.ContractAccountInfo.as_view(),
        name="contract_account_info"
    ),
]
