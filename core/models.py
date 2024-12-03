from typing import Collection
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.db.models import Q, F
from django.core.exceptions import ValidationError


class Brewery(models.Model):
    name = models.CharField(max_length=255, unique=True)
    contract_phone_number = models.CharField(max_length=30)
    contract_email = models.EmailField(max_length=100)
    description = models.CharField(max_length=255, blank=True)

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return self.name


class CommercialBrewery(Brewery):
    nip = models.CharField(
        max_length=10,
        validators=[
            RegexValidator(
                regex=r'^\d{10}$',
                message="NIP number must be a string of 10 digits."
            )
        ],
        unique=True
    )
    address = models.CharField(max_length=255)

    def validate_unique(self, exclude: Collection[str] | None = ...) -> None:
        if ContractBrewery.objects.filter(name=self.name).exists():
            raise ValidationError(
                "Contract brewery with this Name already exists."
            )
        return super().validate_unique(exclude)


class ContractBrewery(Brewery):
    owner_name = models.CharField(max_length=255)

    def validate_unique(self, exclude: Collection[str] | None = ...) -> None:
        if CommercialBrewery.objects.filter(name=self.name).exists():
            raise ValidationError(
                "Commercial brewery with this Name already exists."
            )
        return super().validate_unique(exclude)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    contract_brewery = models.ForeignKey(
        ContractBrewery,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    commercial_brewery = models.ForeignKey(
        CommercialBrewery,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=~Q(
                    contract_brewery__isnull=False,
                    commercial_brewery__isnull=False
                ),
                name="brewery_arc"
            )
        ]


class DeviceType(models.TextChoices):
    BREWING_TANK = "BT", "Tank warzelny"
    FERMENTATION_TANK = "FT", "Pojemnik fermentacyjny"
    AGING_CONTAINER = "AC", "Kocioł do leżakowania"
    BOTTLING_EQUIPMENT = "BE", "Urządzenie do rozlewania"


class Device(models.Model):
    name = models.CharField(max_length=100)
    device_type = models.CharField(
        max_length=50,
        choices=DeviceType
    )
    serial_number = models.CharField(max_length=255, null=True, blank=True)
    capacity = models.IntegerField(null=True)
    temperature_min = models.IntegerField(null=True)
    temperature_max = models.IntegerField(null=True)
    sour_beers = models.BooleanField()
    carbonation = models.CharField(max_length=100)
    supported_containers = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    commercial_brewery = models.ForeignKey(
        CommercialBrewery,
        on_delete=models.CASCADE
    )


class Recipe(models.Model):
    name = models.CharField(max_length=100)
    full_time = models.IntegerField(null=True)  # brak jednostki??
    full_volume = models.IntegerField(null=True)
    contract_brewery = models.ForeignKey(
        ContractBrewery,
        on_delete=models.CASCADE
    )


class Order(models.Model):
    class Status(models.TextChoices):
        NEW = "N", "Nowe"
        CURRENT = "C", "Aktualne"
        PAST = "P", "Przeszłe"
        REJECTED = "R", "Odrzucone"
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=50,
        choices=Status,
        default=Status.NEW
    )
    beer_type = models.CharField(max_length=100)  # choices czy dowolność??
    beer_volume = models.IntegerField()
    description = models.CharField(max_length=255, blank=True)
    rate = models.CharField(max_length=1, blank=True, null=True)
    ended_at = models.DateTimeField(null=True)
    contract_brewery = models.ForeignKey(
        ContractBrewery,
        on_delete=models.CASCADE
    )
    recipe = models.ForeignKey(Recipe, on_delete=models.SET_NULL, null=True)


class TimeSlot(models.Model):
    class Status(models.TextChoices):
        FREE = "F", "Wolne"
        RESERVED = "R", "Zarezerwowane"
        HIRED = "H", "Zajęte"
        UNAVAILABLE = "U", "Niedostępne"

    status = models.CharField(
        max_length=50,
        choices=Status,
        default=Status.FREE
    )
    slot_type = models.CharField(max_length=50)  # choices??
    price = models.DecimalField(max_digits=10, decimal_places=2)
    start_timestamp = models.DateTimeField()
    end_timestamp = models.DateTimeField()
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    order = models.ForeignKey(
        Order,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=Q(start_timestamp__lte=F('end_timestamp')),
                name="timeslots_timestamps_direction"
            )
        ]


class Stage(models.Model):
    name = models.CharField(max_length=100)
    device_type = models.CharField(max_length=50, choices=DeviceType)
    time = models.IntegerField(null=True)  # brak jednostki??
    description = models.CharField(max_length=255, blank=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)


class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    amount = models.CharField(max_length=100)
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE)
