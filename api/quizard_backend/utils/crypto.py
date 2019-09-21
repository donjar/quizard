from hashlib import sha512

from sanic.exceptions import InvalidUsage

salt = "07facbc897aab311d1e72a1cb1c131616b68868921674ed56ade6ffcef18ee6e"


def hash_password(password: str) -> str:
    salted = password + salt
    return sha512(salted.encode("utf8")).hexdigest()


def validate_password_strength(password: str):
    """
    Validate if the password is strong enough.

    Password strength rules:
    - Minimum length: 8 characters
    - Has at least 1 number
    """
    if len(password) >= 8 and any(char.isdigit() for char in password):
        return

    raise InvalidUsage(
        "Your password is not strong enough. "
        "Ensure it has at least 8 characters, and at least 1 number."
    )
