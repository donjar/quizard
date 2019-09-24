from functools import partial, wraps
from cerberus import Validator
from sanic.exceptions import Forbidden
from sanic_jwt_extended.decorators import (
    get_jwt_data_in_request_header,
    verify_jwt_data_type,
)

from quizard_backend import app
from quizard_backend.exceptions import SchemaValidationError
from quizard_backend.models import Quiz
from quizard_backend.schemas import schemas
from quizard_backend.utils.authentication import get_jwt_token_requester, validate_token


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
    async def inner(request, *args, req_args=None, req_body=None, query_params=None, **kwargs):
        """
        After validating the request's body and args,
        pass them to the function to avoid re-parsing.
        """
        req_body = req_body or {}
        req_args = req_args or {}
        if query_params:
            req_args.update(query_params)

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

        # As `query_params` was unpacked from req_args
        # Re-validate the key-values then unpack again
        validated_query_params = {}
        if query_params:
            validated_query_params = {
                key: req_args.pop(key) for key in list(req_args.keys()) if key in query_params
            }

        return await func(
            request, req_args=req_args, req_body=req_body, query_params=validated_query_params, *args, **kwargs
        )

    return inner


def validate_permission(func=None, model=None, token_type="access"):
    if func is None:
        return partial(validate_permission, model=model, token_type=token_type)

    @wraps(func)
    async def inner(request, *args, req_args=None, **kwargs):
        # Validate the token before checking permission
        requester = await get_jwt_token_requester(request)

        if model and request.method in ("PUT", "PATCH"):
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
                raise Forbidden("You are not allowed to perform this action")

        return await func(request, req_args=req_args, *args, **kwargs)

    return inner
