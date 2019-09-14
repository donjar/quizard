from os import environ

mode = environ.get("MODE", "development").lower()

if mode == "production":
    DB_CONFIG = {
        "DB_HOST": environ.get("DB_HOSTNAME", "localhost"),
        "DB_PORT": environ.get("DB_PORT", "5432"),
        "DB_USER": environ.get("DB_USERNAME", "postgres"),
        "DB_PASSWORD": environ.get("DB_PASSWORD"),
        "DB_DATABASE": environ.get("DB_NAME", "postgres"),
        "DB_KWARGS": {"command_timeout": 60 * 2},
        "DB_POOL_MIN_SIZE": 5,
        "DB_POOL_MAX_SIZE": 10,
    }
elif mode == "development":
    DB_CONFIG = {
        "DB_HOST": "localhost",
        "DB_PORT": "54320",
        "DB_USER": "postgres",
        "DB_DATABASE": "postgres",
        "DB_KWARGS": {"command_timeout": 60 * 2},
        "DB_POOL_MIN_SIZE": 10,
        "DB_POOL_MAX_SIZE": 20,
    }
elif mode == "testing":
    DB_CONFIG = {
        "DB_HOST": "localhost",
        "DB_PORT": "54321",
        "DB_USER": "postgres",
        "DB_DATABASE": "postgres",
        "DB_POOL_MIN_SIZE": 10,
        "DB_POOL_MAX_SIZE": 20,
    }


def get_db_url():
    db_config = DB_CONFIG
    return "postgresql://%s:%s@%s:%s/%s" % (
        db_config["DB_USER"],
        db_config.get("DB_PASSWORD", ""),
        db_config["DB_HOST"],
        db_config["DB_PORT"],
        db_config["DB_DATABASE"],
    )
