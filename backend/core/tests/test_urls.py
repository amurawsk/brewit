from django.urls import reverse, resolve
from core.views import (
    LoginView, RegisterCommercialView, CheckUsernameUniqueView, 
    RegisterContractBreweryView, DeviceCreateView, DeviceListForBreweryView, 
    DeviceListAllView, TimeSlotListView, TimeSlotCreateView, DevicesWithTimeSlotsView,
)
from rest_framework_simplejwt.views import TokenRefreshView


def test_token_refresh_url_resolves():
    url = reverse("token_refresh")
    assert resolve(url).func.view_class == TokenRefreshView


def test_check_username_unique_url_resolves():
    url = reverse("check_username_unique")
    assert resolve(url).func.view_class == CheckUsernameUniqueView


def test_register_commercial_url_resolves():
    url = reverse("register_commercial")
    assert resolve(url).func.view_class == RegisterCommercialView


def test_register_contract_url_resolves():
    url = reverse("register_contract")
    assert resolve(url).func.view_class == RegisterContractBreweryView


def test_device_create_url_resolves():
    url = reverse("device_create")
    assert resolve(url).func.view_class == DeviceCreateView


def test_device_list_brewery_url_resolves():
    url = reverse("device_list_brewery", kwargs={"brewery_id": 1})
    assert resolve(url).func.view_class == DeviceListForBreweryView


def test_device_list_all_url_resolves():
    url = reverse("device_list_all")
    assert resolve(url).func.view_class == DeviceListAllView


def test_time_slot_list_all_url_resolves():
    url = reverse("time_slot_list_all", kwargs={"device_id": 1})
    assert resolve(url).func.view_class == TimeSlotListView


def test_time_slot_create_url_resolves():
    url = reverse("time_slot_create", kwargs={"device_id": 1})
    assert resolve(url).func.view_class == TimeSlotCreateView


def test_time_slot_list_brewery_url_resolves():
    url = reverse("time_slot_list_brewery", kwargs={"brewery_id": 1})
    assert resolve(url).func.view_class == DevicesWithTimeSlotsView
