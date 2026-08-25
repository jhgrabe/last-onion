from rest_framework.routers import DefaultRouter
from .views import FavoriteRecipeViewSet

router = DefaultRouter()
router.register(r"favorites", FavoriteRecipeViewSet, basename="favorite-recipes")

urlpatterns = router.urls