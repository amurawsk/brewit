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
    path("devices/<int:device_id>/details/", views.DeviceDetailView.as_view(), name="device_detail"),
    path("devices/brewery/<int:brewery_id>/", views.DeviceListForBreweryView.as_view(), name="device_list_brewery"),
    path("devices/all/", views.DeviceListAllView.as_view(), name="device_list_all"),
    path(
        "devices/brewery/<int:brewery_id>/with-time-slots/",
        views.DevicesWithTimeSlotsView.as_view(),
        name="time_slot_list_brewery"
    ),
    path(
        "devices/brewery/<int:brewery_id>/with-time-slots/free/",
        views.DevicesWithFreeTimeSlotsView.as_view(),
        name="time_slot_list_brewery_free"
    ),

    path("devices/<int:device_id>/time-slots/all/", views.TimeSlotListView.as_view(), name="time_slot_list_all"),
    path("devices/<int:device_id>/time-slots/add/", views.TimeSlotCreateView.as_view(), name="time_slot_create"),
    path("time-slots/edit/price/", views.TimeSlotEditPriceView.as_view(), name="time_slot_edit_price"),
    path("time-slots/delete/<int:time_slot_id>/", views.TimeSlotDeleteView.as_view(), name="time_slot_delete"),

    path("orders/add/", views.OrderCreateView.as_view(), name="order_create"),
    path("orders/<int:order_id>/details/", views.OrderDetailView.as_view(), name="order_detail"),
    path(
        "orders/<int:order_id>/contract-brewery/details/",
        views.OrderContractBreweryDetailView.as_view(),
        name="order_contract_brewery_detail"
    ),
    path("orders/<int:order_id>/accept/", views.OrderAcceptView.as_view(), name="order_accept"),
    path("orders/<int:order_id>/reject/", views.OrderRejectView.as_view(), name="order_reject"),
    path("orders/<int:order_id>/withdraw/", views.OrderWithdrawView.as_view(), name="order_withdraw"),
    path("orders/<int:order_id>/cancel/", views.OrderCancelView.as_view(), name="order_cancel"),
    path("orders/device/<int:device_id>/all/", views.OrderListForDeviceView.as_view(), name="order_list_device"),
    path(
        "orders/commercial/status/<str:status>/",
        views.OrderListCommercialView.as_view(),
        name="order_list_commercial"
    ),
    path("orders/commercial/dashboard/", views.OrderCommercialDashboardView.as_view(), name="commercial_dashboard"),
    path(
        "orders/contract/status/<str:status>/",
        views.OrderListContractView.as_view(),
        name="order_list_contract"
    ),

    path(
        "breweries/commercial/with-devices/",
        views.BreweryWithDevicesNumberView.as_view(),
        name="brewery_with_devices"
    ),
]
