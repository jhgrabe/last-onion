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
