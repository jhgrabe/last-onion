from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import PantryItem

User = get_user_model()


class PantryItemTests(TestCase):
    
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(email="a@test.com", password="pass1234")
        self.other_user = User.objects.create_user(email="b@test.com", password="pass1234")
        self.client.force_authenticate(user=self.user)

    def test_create_pantry_item(self):
        response = self.client.post("/api/pantry/items/", {
            "name": "Onion", "quantity": 2, "unit": "whole"
            })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_only_shows_own_items(self):
        PantryItem.objects.create(name="Garlic", quantity=1, unit="clove", owner=self.other_user)
        response = self.client.get("/api/pantry/items/")
        self.assertEqual(len(response.data), 0)

    def test_unauthenticated_request_rejected(self):
        self.client.force_authenticate(user=None)
        response = self.client.get("/api/pantry/items/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_cannot_modify_others_item(self):
        item = PantryItem.objects.create(name="Garlic", quantity=1, unit="clove", owner=self.other_user)
        response = self.client.delete(f"/api/pantry/items/{item.id}/")
        self.assertIn(response.status_code, [status.HTTP_403_FORBIDDEN, status.HTTP_404_NOT_FOUND])