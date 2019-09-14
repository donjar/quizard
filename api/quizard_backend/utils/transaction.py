from functools import wraps

from quizard_backend import db


def in_transaction(func=None):
    """
    Use this decorator with any Create, Update, Delete
    operations, so that the invalid changes get rollback,
    using PostgreSQL's transaction.
    """

    @wraps(func)
    async def inner(*args, **kwargs):
        # TO-DO: Implement a retry mechanism with exponential backoff
        # if necessary
        # As sometimes, the resource is unable to get due to locks.
        async with db.transaction():
            result = await func(*args, **kwargs)
        return result

    return inner
