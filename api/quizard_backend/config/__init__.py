from os import environ
from quizard_backend.config.db import DB_CONFIG

MODE = environ.get("MODE", "development").lower()

if MODE == "production":
    JWT_SECRET_KEY = environ["JWT_SECRET_KEY"]
    PASSWORD_SALT = environ["PASSWORD_SALT"]
else:
    # These are dummy values for dev and testing
    # Actual production servers have kept these info as env variables
    JWT_SECRET_KEY = "oi123n1k231kloiqwescqklwn"
    PASSWORD_SALT = "07facbc897aab311d1e72a1cb1c131616b68868921674ed56ade6ffcef18ee6e"

SANIC_CONFIG = {**DB_CONFIG, "KEEP_ALIVE_TIMEOUT": 10}

SANIC_RUN_CONFIG = {
    "host": "0.0.0.0",
    "port": 8000,
    "debug": MODE != "production",
    "access_log": MODE != "production",
    "workers": 3,
}
