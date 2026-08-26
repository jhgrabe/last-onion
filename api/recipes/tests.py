from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import FavoriteRecipe

User = get_user_model()


class FavoriteRecipeTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(email="a@test.com", password="pass1234")
        self.other_user = User.objects.create_user(email="b@test.com", password="pass1234")
        self.client.force_authenticate(user=self.user)

    def test_create_favorite(self):
        response = self.client.post("/api/recipes/favorites/", {
            "mealdb_id": "52772", "title": "Teriyaki Chicken", "rating": 4
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_only_shows_own_favorites(self):
        FavoriteRecipe.objects.create(mealdb_id="1", title="Other's Recipe", owner=self.other_user)
        response = self.client.get("/api/recipes/favorites/")
        self.assertEqual(len(response.data), 0)

    def test_unauthenticated_request_rejected(self):
        self.client.force_authenticate(user=None)
        response = self.client.get("/api/recipes/favorites/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_cannot_modify_others_favorite(self):
        favorite = FavoriteRecipe.objects.create(mealdb_id="1", title="Other's Recipe", owner=self.other_user)
        response = self.client.delete(f"/api/recipes/favorites/{favorite.id}/")
        self.assertIn(response.status_code, [status.HTTP_403_FORBIDDEN, status.HTTP_404_NOT_FOUND])

    def test_invalid_rating_rejected(self):
        response = self.client.post("/api/recipes/favorites/", {
            "mealdb_id": "52772", "title": "Bad Rating Recipe", "rating": 10
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)