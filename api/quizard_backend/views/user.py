from sanic.response import json
from sanic_jwt_extended import jwt_required

from quizard_backend.views.urls import user_blueprint as blueprint
from quizard_backend.models import User
from quizard_backend.utils.validation import validate_request, validate_permission


@validate_request(schema="user_read", skip_body=True)
async def user_retrieve(req, req_args, req_body, *args, **kwargs):
    return await User.get(**req_args)


@validate_request(schema="user_write", skip_args=True)
async def user_create(req, req_args, req_body, *args, **kwargs):
    return await User.add(**req_body)


@validate_request(schema="user_write", update=True)
@validate_permission(model=User)
async def user_update(req, req_args, req_body, *args, **kwargs):
    return await User.modify(req_args, req_body)


@validate_request(schema="user_read", skip_body=True)
@validate_permission(model=User)
async def user_delete(req, req_args, req_body, *args, **kwargs):
    await User.remove(**req_args)


@blueprint.route("/", methods=["GET", "POST", "PUT"])
async def user_route(request):
    call_funcs = {
        "GET": user_retrieve,
        "POST": user_create,
        "PUT": user_update,
        # "DELETE": user_delete,
    }
    data = await call_funcs[request.method](request)
    return json({"data": data})
