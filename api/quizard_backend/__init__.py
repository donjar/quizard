from datetime import timedelta

from gino.ext.sanic import Gino
from sanic import Blueprint, Sanic
from sanic.response import json
from sanic_jwt_extended import JWTManager
from sanic_cors import CORS

from quizard_backend.config import SANIC_CONFIG

app = Sanic(__name__)

app.config.update(SANIC_CONFIG)
app.config["JWT_SECRET_KEY"] = "oi123n1k231kloiqwescqklwn"  # Remove later
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)

app.config["CORS_AUTOMATIC_OPTIONS"] = True
# CORS(app)

# Note: Gino doesn't auto-generate any new changes in the schema
# Use alembic to apply new changes to the db
# (Refer to scripts/migration.sh)
db = Gino()

# Initialize the DB before doing anything else
# to avoid circular importing
db.init_app(app)
JWTManager(app)


async def create_tables(app, loop):
    await db.gino.create_all()


app.register_listener(create_tables, "after_server_start")

# Register the routes/views
from quizard_backend.views.urls import blueprints

app.blueprint(blueprints)

# Register error handlers
from quizard_backend.exceptions import sanic_error_handler
from sanic.exceptions import SanicException

app.error_handler.add(SanicException, sanic_error_handler)
