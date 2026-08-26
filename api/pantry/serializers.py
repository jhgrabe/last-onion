from rest_framework import serializers
from .models import PantryItem


class PantryItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PantryItem
        fields = ["id", "name", "quantity", "unit", "expiration_date", "owner"]
        read_only_fields = ["owner"]