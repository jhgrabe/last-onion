from rest_framework import viewsets, permissions
from api_proj.permissions import IsOwner
from .models import FavoriteRecipe
from .serializers import FavoriteRecipeSerializer


class FavoriteRecipeViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteRecipeSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        return FavoriteRecipe.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)