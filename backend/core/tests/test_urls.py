from django.urls import reverse, resolve
from core.views import (
    LoginView, RegisterCommercialView, CheckUsernameUniqueView, 
    RegisterContractBreweryView, DeviceCreateView, DeviceListForBreweryView, 
    DeviceListAllView, TimeSlotListView, TimeSlotCreateView, DevicesWithTimeSlotsView,
)
from rest_framework_simplejwt.views import TokenRefreshView


def test_token_refresh_url_resolves():
    url = reverse("token_refresh")
    assert url == "/api/token/refresh/"
    assert resolve(url).func.view_class == TokenRefreshView


def test_check_username_unique_url_resolves():
    url = reverse("check_username_unique")
    assert url == "/api/check-username-unique/"
    assert resolve(url).func.view_class == CheckUsernameUniqueView


def test_register_commercial_url_resolves():
    url = reverse("register_commercial")
    assert url == "/api/register/commercial/"
    assert resolve(url).func.view_class == RegisterCommercialView


def test_register_contract_url_resolves():
    url = reverse("register_contract")
    assert url == "/api/register/contract/"
    assert resolve(url).func.view_class == RegisterContractBreweryView


def test_login_url_resolves():
    url = reverse("login")
    assert url == "/api/login/"
    assert resolve(url).func.view_class == LoginView


def test_device_create_url_resolves():
    url = reverse("device_create")
    assert url == "/api/devices/add/"
    assert resolve(url).func.view_class == DeviceCreateView


def test_device_list_brewery_url_resolves():
    url = reverse("device_list_brewery", kwargs={"brewery_id": 1})
    assert url == "/api/devices/brewery/1/"
    assert resolve(url).func.view_class == DeviceListForBreweryView


def test_device_list_all_url_resolves():
    url = reverse("device_list_all")
    assert url == "/api/devices/all/"
    assert resolve(url).func.view_class == DeviceListAllView


def test_time_slot_list_all_url_resolves():
    url = reverse("time_slot_list_all", kwargs={"device_id": 1})
    assert url == "/api/devices/1/time-slots/all/"
    assert resolve(url).func.view_class == TimeSlotListView


def test_time_slot_create_url_resolves():
    url = reverse("time_slot_create", kwargs={"device_id": 1})
    assert url == "/api/devices/1/time-slots/add/"
    assert resolve(url).func.view_class == TimeSlotCreateView


def test_time_slot_list_brewery_url_resolves():
    url = reverse("time_slot_list_brewery", kwargs={"brewery_id": 1})
    assert url == "/api/devices/brewery/1/with-time-slots/"
    assert resolve(url).func.view_class == DevicesWithTimeSlotsView
