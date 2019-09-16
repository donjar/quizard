import asyncio
import pytest
import uvloop
from sanic_jwt_extended import create_access_token

from quizard_backend import app as _app, db
from quizard_backend.tests.setup_dev_db import setup_db
from quizard_backend.tests.fixtures import users as _users, quizzes as _quizzes
from quizard_backend.config.db import get_db_url


## Keep this here, in case we find a way to implement rollback
def pytest_configure(config):
    # Create a new event loop
    # as the pytest's loop is not created
    loop = uvloop.new_event_loop()

    loop.run_until_complete(db.set_bind(get_db_url()))
    loop.run_until_complete(db.gino.create_all())


@pytest.fixture(autouse=True)
async def reset_db():
    await db.set_bind(get_db_url())

    # Truncate "user" table
    await db.status(db.text("""TRUNCATE "user" RESTART IDENTITY CASCADE;"""))
    # Re-setup the db
    await setup_db()


@pytest.fixture
def app():
    yield _app


@pytest.fixture
def client(loop, app, sanic_client):
    return loop.run_until_complete(sanic_client(app))


@pytest.fixture
def users():
    return _users


@pytest.fixture
def quizzes():
    return _quizzes


@pytest.fixture
async def token_user(app):
    token = await create_access_token(identity=_users[0], app=app)
    return "Bearer " + token
