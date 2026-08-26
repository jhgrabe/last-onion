from rest_framework import viewsets, permissions, status
from api_proj.permissions import IsOwner
from .models import FavoriteRecipe
from .serializers import FavoriteRecipeSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from pantry.models import PantryItem
from .services import get_recipe_suggestion


class FavoriteRecipeViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteRecipeSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        return FavoriteRecipe.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class RecipeSuggestionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        pantry_items = PantryItem.objects.filter(owner=request.user).values("name")
        if not pantry_items:
            return Response(
                {"error": "Your pantry is empty. Add some ingredients first."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            suggestion = get_recipe_suggestion(list(pantry_items))
            return Response({"suggestion": suggestion})
        except Exception:
            return Response(
                {"error": "AI service is currently unavailable. Please try again later."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )