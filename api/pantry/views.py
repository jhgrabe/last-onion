from django.shortcuts import render
from rest_framework import viewsets, permissions
from api_proj.permissions import IsOwner
from .models import PantryItem
from .serializers import PantryItemSerializer


class PantryItemViewSet(viewsets.ModelViewSet):
    serializer_class = PantryItemSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        return PantryItem.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)