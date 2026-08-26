from django.db import models
from django.conf import settings


class PantryItem(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.DecimalField(max_digits=6, decimal_places=2)
    unit = models.CharField(max_length=20)
    expiration_date = models.DateField(null=True, blank=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='pantry_items',
    )


    def __str__(self):
        return f'{self.name} ({self.quantity} {self.unit})'
