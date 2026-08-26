from rest_framework.routers import DefaultRouter
from .views import FavoriteRecipeViewSet, RecipeSuggestionView
from django.urls import path

router = DefaultRouter()
router.register(r"favorites", FavoriteRecipeViewSet, basename="favorite-recipes")

urlpatterns = router.urls + [
    path("suggest/", RecipeSuggestionView.as_view(), name="recipe-suggest"),
]
