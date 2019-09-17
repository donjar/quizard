from typing import Tuple

from sqlalchemy import and_

from quizard_backend.utils.transaction import in_transaction


def dict_to_filter_args(model, **kwargs):
    """
    Convert a dictionary to Gino/SQLAlchemy's conditions for filtering.

    Example:
        A correct Gino's query is:
            User.query.where(
                and_(
                    User.role_id == 10,
                    User.location == "Singapore"
                )
            ).gino.all()

        The given `kwargs` is:
            {
                "role_id": 10,
                "location": "Singapore",
            }
        This function unpacks the given dictionary `kwargs`
        into `and_(*clauses)`.
    """
    return (getattr(model, k) == v for k, v in kwargs.items())


async def get_one(model, **kwargs):
    return await model.query.where(
        and_(*dict_to_filter_args(model, **kwargs))
    ).gino.first()


async def get_many(model, last_id=None, limit=15, **kwargs):
    last_internal_id = 0
    if last_id:
        row_of_last_id = await model.query.where(model.uuid == last_id).gino.first()
        last_internal_id = row_of_last_id.id

    return (
        await model.query.where(
            and_(*dict_to_filter_args(model, **kwargs), model.id > last_internal_id)
        )
        .order_by(model.id)
        .limit(limit)
        .gino.all()
    )


@in_transaction
async def create_one(model, **kwargs):
    return await model(**kwargs).create()


@in_transaction
async def update_one(row, **kwargs):
    if not kwargs:
        return row

    await row.update(**kwargs).apply()
    return row


@in_transaction
async def update_many(model, get_kwargs, update_kwargs):
    status: Tuple[str, list] = await model.update.values(**update_kwargs).where(
        and_(*and_(*dict_to_filter_args(model, **get_kwargs)))
    ).gino.status()
    return status[0]


@in_transaction
async def delete_many(model, **kwargs):
    status: Tuple[str, list] = await model.delete.where(
        and_(*dict_to_filter_args(model, **kwargs))
    ).gino.status()
    return status[0]
