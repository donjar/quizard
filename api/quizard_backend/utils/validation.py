from functools import partial, wraps
from cerberus import Validator
from sanic.exceptions import Unauthorized
from sanic_jwt_extended.decorators import (
    get_jwt_data_in_request_header,
    verify_jwt_data_type,
)

from quizard_backend import app
from quizard_backend.exceptions import SchemaValidationError
from quizard_backend.models import Quiz
from quizard_backend.schemas import schemas


def validate_against_schema(document, schema_name, update=False):
    _validator = Validator()
    if not _validator.validate(document, schemas[schema_name], update=update):
        raise SchemaValidationError(_validator.errors)

    return _validator.document


def validate_request(
    func=None,
    schema=None,
    update=False,
    skip_body=False,
    skip_args=False,
    *args,
    **kargs,
):
    """
    Validate the request data and args to ensure private fields are protected.

    Functions that is decorated by this function
    will have 2 more arguments of `req_args` and `req_body`.

    Kwargs:
        schema (dict):
            A Dict for a Cerberus rule

        update (bool):
            If True, fields with required=True will be ignored.
            https://cerberus-sanhe.readthedocs.io/usage.html#required

        skip_body (bool):
            If True, ignore validating and pre-load request.json

        skip_args (bool):
            If True, ignore validating and pre-load request.args
    """
    if func is None:
        return partial(
            validate_request,
            schema=schema,
            update=update,
            skip_body=skip_body,
            skip_args=skip_args,
            *args,
            **kargs,
        )

    @wraps(func)
    async def inner(request, *args, req_args=None, req_body=None, **kwargs):
        """
        After validating the request's body and args,
        pass them to the function to avoid re-parsing.
        """
        req_body = req_body or {}
        req_args = req_args or {}

        # Pass if there are no schema given
        if not schema or schema not in schemas:
            return await func(
                request, req_args=req_args, req_body=req_body, *args, **kwargs
            )

        _schema = schemas[schema]
        if not skip_body:
            req_body = validate_against_schema(req_body, schema, update=update)

        if not skip_args:
            # For request's arguments,
            # use READ schema
            model_name = schema.split("_")[0]
            _schema = model_name + "_read"
            req_args = validate_against_schema(req_args, _schema)

        return await func(
            request, req_args=req_args, req_body=req_body, *args, **kwargs
        )

    return inner


async def validate_token(request, token_type="access"):
    jwt_token_data = await get_jwt_data_in_request_header(app, request)
    await verify_jwt_data_type(jwt_token_data, token_type)
    return jwt_token_data


def validate_permission(func=None, model=None, token_type="access"):
    if func is None:
        return partial(validate_permission, model=model, token_type=token_type)

    @wraps(func)
    async def inner(request, *args, req_args=None, **kwargs):
        # Validate the token before checking permission
        jwt_token_data = await validate_token(request)

        if model and request.method in ("PUT", "PATCH"):
            requester = jwt_token_data["identity"]
            # Get the resource, to check if the requester
            # is modifying a resource he/she owns
            resource = await model.get(**req_args)
            resource_owner_id = None
            if model.__tablename__ == "quiz":
                resource_owner_id = resource.get("creator_id")
            elif model.__tablename__ == "user":
                resource_owner_id = resource.get("id")
            else:
                # In the current models, besides table `quiz` and `user`,
                # all other tables have a property `quiz_id`
                quiz_parent = await Quiz.get(**req_args)
                resource_owner_id = quiz_parent["creator_id"]

            if requester["id"] != resource_owner_id:
                raise Unauthorized("You are not allowed to perform this action")

        return await func(request, req_args=req_args, *args, **kwargs)

    return inner
