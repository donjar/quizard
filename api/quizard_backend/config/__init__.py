from os import environ
from quizard_backend.config.db import DB_CONFIG

mode = environ.get("MODE", "development").lower()

SANIC_CONFIG = {**DB_CONFIG, "KEEP_ALIVE_TIMEOUT": 10}

SANIC_RUN_CONFIG = {
    "host": "0.0.0.0",
    "port": 8000,
    "debug": mode != "production",
    "access_log": mode != "production",
    "workers": 3,
}
