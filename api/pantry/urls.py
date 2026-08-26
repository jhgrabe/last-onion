from rest_framework.routers import DefaultRouter
from .views import PantryItemViewSet

router = DefaultRouter()
router.register(r"items", PantryItemViewSet, basename="pantry-items")

urlpatterns = router.urls