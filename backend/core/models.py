from typing import Collection
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.db.models import Q, F, Sum
from django.core.exceptions import ValidationError
from django_measurement.models import MeasurementField
from measurement.measures import (
    Volume,
    Temperature,
    Time
)


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
        if CommercialBrewery.objects.filter(name=self.name).exists():
            raise ValidationError(
                "Commercial brewery with this name already exists."
            )
        if ContractBrewery.objects.filter(name=self.name).exists():
            raise ValidationError(
                "Contract brewery with this name already exists."
            )
        return super().validate_unique(exclude)


class ContractBrewery(Brewery):
    owner_name = models.CharField(max_length=255)

    def validate_unique(self, exclude: Collection[str] | None = ...) -> None:
        if CommercialBrewery.objects.filter(name=self.name).exists():
            raise ValidationError(
                "Commercial brewery with this name already exists."
            )
        if ContractBrewery.objects.filter(name=self.name).exists():
            raise ValidationError(
                "Contract brewery with this name already exists."
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

    def __str__(self):
        return f"Profile of {self.user}"


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
    serial_number = models.CharField(max_length=255, blank=True)
    capacity = MeasurementField(measurement=Volume, blank=True)
    temperature_min = MeasurementField(
        measurement=Temperature,
        blank=True,
        null=True
    )
    temperature_max = MeasurementField(
        measurement=Temperature,
        blank=True,
        null=True
    )
    sour_beers = models.BooleanField(default=False)
    carbonation = models.CharField(max_length=100, blank=True)
    supported_containers = models.CharField(max_length=255, blank=True)
    commercial_brewery = models.ForeignKey(
        CommercialBrewery,
        on_delete=models.CASCADE
    )


class Recipe(models.Model):
    name = models.CharField(max_length=100)
    full_volume = MeasurementField(measurement=Volume, blank=True, null=True)
    contract_brewery = models.ForeignKey(
        ContractBrewery,
        on_delete=models.CASCADE
    )

    @property
    def full_time(self):
        return self.stage_set.aggregate(sum=Sum("time"))['sum'] or Time(s=0)

    def __str__(self) -> str:
        return f"Przepis na {self.name} autorstwa {self.contract_brewery}"


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
    beer_type = models.CharField(max_length=100)
    beer_volume = MeasurementField(measurement=Volume)
    description = models.CharField(max_length=255, blank=True)
    rate = models.BooleanField(blank=True, null=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    contract_brewery = models.ForeignKey(
        ContractBrewery,
        on_delete=models.CASCADE
    )
    recipe = models.ForeignKey(Recipe, on_delete=models.SET_NULL, null=True)

    @property
    def total_price(self):
        return self.timeslot_set.aggregate(sum=Sum("price"))['sum'] or 0


class TimeSlot(models.Model):
    class Status(models.TextChoices):
        FREE = "F", "Wolne"
        RESERVED = "R", "Zarezerwowane"
        HIRED = "H", "Zajęte"
        UNAVAILABLE = "U", "Niedostępne"

    class SlotType(models.TextChoices):
        DAY = "D", "Dzień"
        HOUR = "H", "Godzina"

    status = models.CharField(
        max_length=50,
        choices=Status,
        default=Status.FREE
    )
    slot_type = models.CharField(max_length=50, choices=SlotType)
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
    is_deleted = models.BooleanField(default=False)

    def delete(self, *args, **kwargs):
        self.is_deleted = True
        self.save()

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
    time = MeasurementField(measurement=Time)
    description = models.CharField(max_length=255, blank=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"Etap {self.name} w przepisie {self.recipe.name}"


class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    amount = models.CharField(max_length=100)
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE)
