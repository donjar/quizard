import sys
from os.path import abspath, dirname

root_dir = dirname(dirname(dirname(abspath(__file__))))
sys.path.append(root_dir)

from quizard_backend import db
from quizard_backend.models import User, Quiz, QuizQuestion
from quizard_backend.tests.fixtures import users as _users, quizzes as _quizzes, questions as _questions
from quizard_backend.utils.crypto import hash_password


async def setup_db():
    # Re-setup the db
    for user in _users:
        user["password"] = hash_password(user["password"])
        await User(**user).create()

    for quiz in _quizzes:
        await Quiz(**quiz).create()

    for question in _questions:
        await QuizQuestion(**question).create()


if __name__ == "__main__":
    import asyncio
    import uvloop

    from quizard_backend.config.db import get_db_url

    loop = uvloop.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(db.set_bind(get_db_url()))
    loop.run_until_complete(db.gino.create_all())
    loop.run_until_complete(setup_db())
