from django.db import models
from django.conf import settings
from api_proj.validators import validate_rating_range


class FavoriteRecipe(models.Model):
    mealdb_id = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    image_url = models.URLField(blank=True)
    notes = models.TextField(blank=True)
    rating = models.IntegerField(null=True, blank=True, validators=[validate_rating_range])
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="favorite_recipes",
    )

    def __str__(self):
        return self.title