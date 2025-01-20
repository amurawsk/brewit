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
    path("devices/<int:device_id>/edit/", views.DeviceEditView.as_view(), name="device_edit"),
    path("devices/<int:device_id>/delete/", views.DeviceDeleteView.as_view(), name="device_delete"),
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
    path("devices/brewery/<int:brewery_id>/with-time-slots/", views.DevicesWithTimeSlotsView.as_view(), name="time_slot_list_brewery"),
    path(
        "commercial-brewery/<int:brewery_id>/",
        views.CommercialBreweryInfoView.as_view(),
        name="commercial_brewery_info"
    ),
    path(
        "contract-brewery/<int:brewery_id>/",
        views.ContractBreweryInfoView.as_view(),
        name="contract_brewery_info"
    ),
    path(
        "accounts/commercial/<int:profile_id>/",
        views.CommercialAccountInfoView.as_view(),
        name="commercial_account_info"
    ),
    path(
        "accounts/contract/<int:profile_id>/",
        views.ContractAccountInfoView.as_view(),
        name="contract_account_info"
    ),
    # path(
    #     "accounts/intermediary/<int:profile_id>/",
    #     views.IntermediaryAccountInfoView.as_view(),
    #     name="intermediary_account_info"
    # ),
    path(
        "coworkers/",
        views.CoworkersView.as_view(),
        name="coworker_list"
    ),
    path(
        "coworkers/remove/",
        views.RemoveCoworkerView.as_view(),
        name="coworker_remove"
    ),
    path(
        "coworkers/create/",
        views.AddCoworkerView.as_view(),
        name="coworker_add"
    ),
    path(
        "recipies/",
        views.RecipiesView.as_view(),
        name="recipies"
    ),
    path(
        "recipies/<int:recipe_id>/orders/",
        views.OrderView.as_view(),
        name="recipies_orders_list"
    ),
    path(
        "recipies/stages/",
        views.StageView.as_view(),
        name="stages"
    ),
    path(
        "recipies/stages/delete",
        views.StageDeleteView.as_view(),
        name="stages_delete"
    ),
    path(
        "recipies/stages/update",
        views.StageUpdateView.as_view(),
        name="stages_update"
    ),
    path(
        "recipies/update/",
        views.RecipeUpdateView.as_view(),
        name="recipe_update"
    ),
    path(
        "recipies/delete/",
        views.RecipeDeleteView.as_view(),
        name="recipe_delete"
    ),
    path(
        "recipies/stages/ingredients/",
        views.IngredientCreateView.as_view(),
        name="ingredient_add"
    ),
    path(
        "recipies/stages/ingredients/delete",
        views.IngredientDeleteView.as_view(),
        name="ingredient_delete"
    ),
    path(
        "recipies/stages/ingredients/update",
        views.IngredientUpdateView.as_view(),
        name="ingredient_update"
    ),
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
    path("orders/<int:order_id>/rate/", views.OrderRateView.as_view(), name="order_rate"),
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
    path("orders/contract/dashboard/", views.OrderContractDashboardView.as_view(), name="contract_dashboard"),
    path(
        "orders/intermediary/status/<str:status>/",
        views.OrderListIntermediaryView.as_view(),
        name="order_list_intermediary"
    ),
    path(
        "orders/intermediary/dashboard/",
        views.OrderIntermediaryDashboardView.as_view(),
        name="intermediary_dashboard"
    ),

    path(
        "breweries/commercial/with-devices/",
        views.BreweryWithDevicesNumberView.as_view(),
        name="brewery_with_devices"
    ),
    # path("breweries/contract/all/", views.BreweryListContractView.as_view(), name="brewery_list_contract"),

    # path("users/all/", views.UserListView.as_view(), name="user_list"),
]
