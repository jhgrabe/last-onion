from rest_framework import serializers


def validate_passwords_match(password, password_confirm):

    if password != password_confirm:
        raise serializers.ValidationError({'password_confirm': 'Passwords do not match.'})