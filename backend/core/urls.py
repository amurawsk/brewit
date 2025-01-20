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
]
