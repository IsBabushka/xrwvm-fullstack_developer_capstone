from django.contrib import admin
from .models import CarMake, CarModel


# Register your models here.

# CarModelInline class
class CarModelInline(admin.StackedInline):
    model = CarModel
    extra = 0


# CarModelAdmin class
class CarModelAdmin(admin.ModelAdmin):
    fields = ['name', 'car_make', 'type', 'year']
    list_display = ['name', 'car_make', 'type', 'year']


# CarMakeAdmin class with CarModelInline
class CarMakeAdmin(admin.ModelAdmin):
    fields = ['name', 'description', 'country', 'year_established']
    list_display = ['name', 'description', 'country', 'year_established']
    inlines = [CarModelInline]


# Register models here
admin.site.register(CarMake, CarMakeAdmin)
admin.site.register(CarModel, CarModelAdmin)
