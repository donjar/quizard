from hashlib import sha512

from sanic.exceptions import InvalidUsage

from quizard_backend.config import PASSWORD_SALT


def hash_password(password: str) -> str:
    salted = password + PASSWORD_SALT
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
