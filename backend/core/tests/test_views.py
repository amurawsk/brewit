from core.serializers import RegisterCommercialSerializer
from rest_framework import status
from rest_framework.test import APIClient
from django.urls import reverse
import pytest


@pytest.fixture
def commercial_brewery_user():
    # Mock or create a user directly (bypass the registration API call)
    user_data = {
        "username": "brewery",
        "password": "pass1",
        "commercial_brewery": {
            "name": "Brewery",
            "contract_phone_number": "123456789",
            "contract_email": "contact@brewery.com",
            "description": "Just some commercial brewery.",
            "nip": "1234567890",
            "address": "ul. Browarna 1, Warszawa"
        }
    }

    # You can directly create the user and associated commercial brewery
    serializer = RegisterCommercialSerializer(data=user_data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    return user


####################
# /api/register/commercial/
####################


@pytest.mark.django_db
def test_register_commercial():
    client = APIClient()
    url = reverse('register_commercial')
    data = {
        'username': 'brewery',
        'password': 'pass1',
        'commercial_brewery': {
            'name': 'Brewery',
            'contract_phone_number': '123456789',
            'contract_email': 'contact@brewery.com',
            'description': 'Just some commercial brewery.',
            'nip': '1234567890',
            'address': 'ul. Browarna 1, Warszawa'
        }
    }

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert 'refresh' in response.data
    assert 'access' in response.data
    assert response.data['message'] == 'User registered successfully!'
    assert response.data['user_type'] == 'commercial_brewery'


@pytest.mark.django_db
def test_register_commercial_duplicate_username():
    client = APIClient()
    url = reverse('register_commercial')
    data = {
        'username': 'brewery',
        'password': 'pass1',
        'commercial_brewery': {
            'name': 'Brewery',
            'contract_phone_number': '123456789',
            'contract_email': 'contact@brewery.com',
            'description': 'Just some commercial brewery.',
            'nip': '1234567890',
            'address': 'ul. Browarna 1, Warszawa'
        }
    }

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data['username'][0] == 'A user with that username already exists.'


@pytest.mark.django_db
def test_register_commercial_duplicate_nip():
    client = APIClient()
    url = reverse('register_commercial')
    data = {
        'username': 'brewery',
        'password': 'pass1',
        'commercial_brewery': {
            'name': 'Brewery',
            'contract_phone_number': '123456789',
            'contract_email': 'contact@brewery.com',
            'description': 'Just some commercial brewery.',
            'nip': '1234567890',
            'address': 'ul. Browarna 1, Warszawa'
        }
    }

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED

    data['username'] = 'newbrewery'
    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert 'nip' in response.data
    assert response.data['nip'] == 'This NIP is already taken.'


# @pytest.mark.django_db
# def test_register_commercial_duplicate_brewery_name():
#     client = APIClient()
#     url = reverse('register_commercial')
#     data = {
#         'username': 'brewery',
#         'password': 'pass1',
#         'commercial_brewery': {
#             'name': 'Brewery',
#             'contract_phone_number': '123456789',
#             'contract_email': 'contact@brewery.com',
#             'description': 'Just some commercial brewery.',
#             'nip': '1234567890',
#             'address': 'ul. Browarna 1, Warszawa'
#         }
#     }

#     response = client.post(url, data, format='json')
#     print(response.data)
#     assert response.status_code == status.HTTP_201_CREATED

#     data['username'] = 'newbrewery'
#     data['commercial_brewery']['nip'] = '9876543210'
#     response = client.post(url, data, format='json')
#     assert response.status_code == status.HTTP_400_BAD_REQUEST
#     assert response.data['contract_brewery']['name'][0] == 'commercial brewery with this name already exists.'


@pytest.mark.django_db
def test_register_commercial_invalid_request_type():
    client = APIClient()
    url = reverse('register_commercial')
    data = {
        'username': 'brewery',
        'password': 'pass1',
        'commercial_brewery': {
            'name': 'Brewery',
            'contract_phone_number': '123456789',
            'contract_email': 'contact@brewery.com',
            'description': 'Just some commercial brewery.',
            'nip': '1234567890',
            'address': 'ul. Browarna 1, Warszawa'
        }
    }

    response = client.get(url, data, format='json')
    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED


####################
# /api/register/contract/
####################


@pytest.mark.django_db
def test_register_contract():
    client = APIClient()
    url = reverse('register_contract')
    data = {
        "username": "mybrewery",
        "password": "password123",
        "contract_brewery": {
            "name": "My brewery",
            "contract_phone_number": "555555555",
            "contract_email": "contact@mybrewery.com",
            "description": "I like beer.",
            "owner_name": "Janusz Palikot"
        }
    }

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert 'refresh' in response.data
    assert 'access' in response.data
    assert response.data['message'] == 'User registered successfully!'
    assert response.data['user_type'] == 'contract_brewery'


@pytest.mark.django_db
def test_register_contract_duplicate_username():
    client = APIClient()
    url = reverse('register_contract')
    data = {
        "username": "mybrewery",
        "password": "password123",
        "contract_brewery": {
            "name": "My brewery",
            "contract_phone_number": "555555555",
            "contract_email": "contract@mybrewery.com",
            "description": "I like beer.",
            "owner_name": "Janusz Palikot"
        }
    }

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data['username'][0] == 'A user with that username already exists.'


@pytest.mark.django_db
def test_register_contract_duplicate_brewery_name():
    client = APIClient()
    url = reverse('register_contract')
    data = {
        "username": "mybrewery",
        "password": "password123",
        "contract_brewery": {
            "name": "My brewery",
            "contract_phone_number": "555555555",
            "contract_email": "contract@mybrewery.com",
            "description": "I like beer.",
            "owner_name": "Janusz Palikot"
        }
    }

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED

    data['username'] = 'newbrewery'
    response = client.post(url, data, format='json')
    print(response.data['contract_brewery']['name'][0])
    assert response.data['contract_brewery']['name'][0] == 'contract brewery with this name already exists.'


@pytest.mark.django_db
def test_register_contract_invalid_request_type():
    client = APIClient()
    url = reverse('register_contract')
    data = {
        "username": "mybrewery",
        "password": "password123",
        "contract_brewery": {
            "name": "My brewery",
            "contract_phone_number": "555555555",
            "contract_email": "contract@mybrewery.com",
            "description": "I like beer.",
            "owner_name": "Janusz Palikot"
        }
    }

    response = client.get(url, data, format='json')
    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED


####################
# /api/check-username-unique/
####################


@pytest.mark.django_db
def test_check_username_unique():
    client = APIClient()
    url = reverse('check_username_unique')
    data = {
        'username': 'uniqueusername'
    }

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert response.data['unique'] == True       # NOQA: E712


@pytest.mark.django_db
def test_check_username_not_unique_contract():
    client = APIClient()
    url = reverse('register_contract')
    data_register = {
        "username": "notunique",
        "password": "password123",
        "contract_brewery": {
            "name": "My brewery",
            "contract_phone_number": "555555555",
            "contract_email": "contract@mybrewery.com",
            "description": "I like beer.",
            "owner_name": "Janusz Palikot"
        }
    }
    response = client.post(url, data_register, format='json')
    assert response.status_code == status.HTTP_201_CREATED

    url = reverse('check_username_unique')
    data = {
        'username': 'notunique'
    }

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert response.data['unique'] == False      # NOQA: E712


@pytest.mark.django_db
def test_check_username_not_unique_commercial():
    client = APIClient()
    url = reverse('register_commercial')
    data_register = {
        'username': 'notunique',
        'password': 'pass1',
        'commercial_brewery': {
            'name': 'Brewery',
            'contract_phone_number': '123456789',
            'contract_email': 'contact@brewery.com',
            'description': 'Just some commercial brewery.',
            'nip': '1234567890',
            'address': 'ul. Browarna 1, Warszawa'
        }
    }
    response = client.post(url, data_register, format='json')
    assert response.status_code == status.HTTP_201_CREATED

    url = reverse('check_username_unique')
    data = {
        'username': 'notunique'
    }

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert response.data['unique'] == False      # NOQA: E712


@pytest.mark.django_db
def test_check_username_invalid_request_type():
    client = APIClient()
    url = reverse('check_username_unique')
    data = {
        'username': 'uniqueusername'
    }

    response = client.get(url, data, format='json')
    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED


####################
# /api/login/
####################


@pytest.mark.django_db
def test_login(commercial_brewery_user):
    client = APIClient()
    url = reverse('login')
    data = {
        'username': 'brewery',
        'password': 'pass1'
    }

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert 'refresh' in response.data
    assert 'access' in response.data
    assert response.data['message'] == 'Login successful!'
    assert response.data['user_type'] == 'commercial_brewery'


@pytest.mark.django_db
def test_login_invalid_username(commercial_brewery_user):
    client = APIClient()
    url = reverse('login')
    data = {
        'username': 'invalid',
        'password': 'password123'
    }

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data['non_field_errors'][0] == 'Invalid credentials'


@pytest.mark.django_db
def test_login_invalid_password(commercial_brewery_user):
    client = APIClient()
    url = reverse('login')
    data = {
        'username': 'brewery',
        'password': 'invalid'
    }

    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data['non_field_errors'][0] == 'Invalid credentials'


@pytest.mark.django_db
def test_login_invalid_request_type(commercial_brewery_user):
    client = APIClient()
    url = reverse('login')
    data = {
        'username': 'brewery',
        'password': 'pass1'
    }

    response = client.get(url, data, format='json')
    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED
