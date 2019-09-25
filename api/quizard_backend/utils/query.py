from typing import Tuple

from sqlalchemy import and_, desc

from quizard_backend import db
from quizard_backend.utils.exceptions import raise_not_found_exception
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


async def get_many(
    model,
    columns=None,
    distinct=False,
    after_id=None,
    limit=15,
    in_column=None,
    in_values=None,
    order_by="internal_id",
    descrease=False,
    **kwargs,
):
    # Get the `internal_id` value from the starting row
    # And use it to query the next page of results
    last_internal_id = 0
    if after_id:
        row_of_after_id = await model.query.where(model.id == after_id).gino.first()
        if not row_of_after_id:
            raise_not_found_exception(model, **kwargs)

        last_internal_id = row_of_after_id.internal_id

    # Get certain columns only
    if columns:
        query = db.select([*(getattr(model, column) for column in columns)])
    else:
        query = model.query

    query = query.where(
        and_(
            *dict_to_filter_args(model, **kwargs),
            model.internal_id < last_internal_id
            if descrease and last_internal_id
            else model.internal_id > last_internal_id,
            getattr(model, in_column).in_(in_values)
            if in_column and in_values
            else True,
        )
    )
    if distinct:
        query = query.distinct()

    return (
        await query.order_by(
            desc(getattr(model, order_by)) if descrease else getattr(model, order_by)
        )
        .limit(limit)
        .gino.all()
    )


async def get_one_latest(model, **kwargs):
    return (
        await model.query.where(and_(*dict_to_filter_args(model, **kwargs)))
        .order_by(desc(model.internal_id))
        .gino.first()
    )


async def get_many_with_count_and_group_by(
    model, *, columns, in_column=None, in_values=None
):
    return (
        await db.select(
            [*[getattr(model, column) for column in columns], db.func.count()]
        )
        .where(
            getattr(model, in_column).in_(in_values)
            if in_column and in_values
            else True
        )
        .group_by(*[getattr(model, column) for column in columns])
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
