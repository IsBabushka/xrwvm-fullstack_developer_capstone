# Uncomment the following imports before adding the Model code

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.

class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    country = models.CharField(max_length=50, blank=True)
    year_established = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name


class CarModel(models.Model):
    # Car type choices
    SEDAN = 'Sedan'
    SUV = 'SUV'
    WAGON = 'Wagon'
    COUPE = 'Coupe'
    CONVERTIBLE = 'Convertible'
    PICKUP = 'Pickup'
    VAN = 'Van'
    TRUCK = 'Truck'

    CAR_TYPE_CHOICES = [
        (SEDAN, 'Sedan'),
        (SUV, 'SUV'),
        (WAGON, 'Wagon'),
        (COUPE, 'Coupe'),
        (CONVERTIBLE, 'Convertible'),
        (PICKUP, 'Pickup'),
        (VAN, 'Van'),
        (TRUCK, 'Truck'),
    ]

    # Fields
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    type = models.CharField(
        max_length=20,
        choices=CAR_TYPE_CHOICES,
        default=SEDAN
    )
    year = models.IntegerField(
        default=2023,
        validators=[MinValueValidator(2015), MaxValueValidator(2023)]
    )

    def __str__(self):
        return f"{self.car_make.name} {self.name}"
