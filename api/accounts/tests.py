from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()


class AuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_register_success(self):
        response = self.client.post("/api/auth/register/", {
            "email": "a@test.com", "password": "pass1234", "password_confirm": "pass1234"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_duplicate_email_fails(self):
        User.objects.create_user(email="a@test.com", password="pass1234")
        response = self.client.post("/api/auth/register/", {
            "email": "a@test.com", "password": "pass1234", "password_confirm": "pass1234"
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_password_mismatch_fails(self):
        response = self.client.post("/api/auth/register/", {
            "email": "b@test.com", "password": "pass1234", "password_confirm": "wrong"
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_success(self):
        User.objects.create_user(email="c@test.com", password="pass1234")
        response = self.client.post("/api/auth/login/", {
            "email": "c@test.com", "password": "pass1234"
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_login_wrong_password_fails(self):
        User.objects.create_user(email="d@test.com", password="pass1234")
        response = self.client.post("/api/auth/login/", {
            "email": "d@test.com", "password": "wrongpass"
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
