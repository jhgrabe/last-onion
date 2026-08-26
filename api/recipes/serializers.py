from rest_framework import serializers
from .models import FavoriteRecipe


class FavoriteRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteRecipe
        fields = ["id", "mealdb_id", "title", "image_url", "notes", "rating", "owner"]
        read_only_fields = ["owner"]