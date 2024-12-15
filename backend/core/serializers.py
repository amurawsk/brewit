from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import CommercialBrewery, CommercialBrewery, ContractBrewery, Profile


class CommercialBrewerySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommercialBrewery
        fields = ['name', 'contract_phone_number', 'contract_email', 'description', 'nip', 'address']


class ContractBrewerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractBrewery
        fields = ['name', 'contract_phone_number', 'contract_email', 'description', 'owner_name']


class RegisterCommercialSerializer(serializers.ModelSerializer):
    commercial_brewery = serializers.DictField()

    class Meta:
        model = User
        fields = ['username', 'password', 'commercial_brewery']

    def create(self, validated_data):
        commercial_brewery_data = validated_data.pop('commercial_brewery')

        if CommercialBrewery.objects.filter(nip=commercial_brewery_data['nip']).exists():
            raise serializers.ValidationError({"nip": "This NIP is already taken."})

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )

        commercial_brewery = CommercialBrewery.objects.create(
            name=commercial_brewery_data['name'],
            contract_phone_number=commercial_brewery_data['contract_phone_number'],
            contract_email=commercial_brewery_data['contract_email'],
            description=commercial_brewery_data['description'],
            nip=commercial_brewery_data['nip'],
            address=commercial_brewery_data['address']
        )

        Profile.objects.create(user=user, commercial_brewery=commercial_brewery)

        return user


class RegisterContractSerializer(serializers.ModelSerializer):
    contract_brewery = ContractBrewerySerializer()

    class Meta:
        model = User
        fields = ['username', 'password', 'contract_brewery']

    def create(self, validated_data):
        contract_brewery_data = validated_data.pop('contract_brewery')

        if ContractBrewery.objects.filter(owner_name=contract_brewery_data['owner_name']).exists():
            raise serializers.ValidationError({"owner_name": "This owner name is already registered."})

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )

        contract_brewery = ContractBrewery.objects.create(
            name=contract_brewery_data['name'],
            contract_phone_number=contract_brewery_data['contract_phone_number'],
            contract_email=contract_brewery_data['contract_email'],
            description=contract_brewery_data['description'],
            owner_name=contract_brewery_data['owner_name']
        )

        Profile.objects.create(user=user, contract_brewery=contract_brewery)

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials")

        return {"user": user}


class CheckUsernameUniqueSerializer(serializers.Serializer):
    username = serializers.CharField()

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value
