from sanic.response import json
from sanic_jwt_extended import jwt_required

from quizard_backend.views.urls import user_blueprint as blueprint
from quizard_backend.models import User
from quizard_backend.utils.validation import validate_request, validate_permission


@validate_request(schema="user_read", skip_body=True)
async def user_retrieve(req, req_args, req_body, many=True, *args, **kwargs):
    return await User.get(**req_args, many=many)


@validate_request(schema="user_write", skip_args=True)
async def user_create(req, req_args, req_body, *args, **kwargs):
    return await User.add(**req_body)


@validate_request(schema="user_write")
@validate_permission(model=User)
async def user_replace(req, req_args, req_body, *args, **kwargs):
    return await User.modify(req_args, req_body)


@validate_request(schema="user_write", update=True)
@validate_permission(model=User)
async def user_update(req, req_args, req_body, *args, **kwargs):
    return await User.modify(req_args, req_body)


@validate_request(schema="user_read", skip_body=True)
@validate_permission(model=User)
async def user_delete(req, req_args, req_body, *args, **kwargs):
    await User.remove(**req_args)


@blueprint.route("/", methods=["GET", "POST"])
async def user_route(request):
    call_funcs = {"GET": user_retrieve, "POST": user_create}
    data = await call_funcs[request.method](request)
    return json({"data": data})


@blueprint.route("/<user_id>", methods=["GET", "PUT", "PATCH"])
async def quiz_route(request, user_id):
    user_id = user_id.strip()

    call_funcs = {
        "GET": user_retrieve,
        "PUT": user_replace,
        "PATCH": user_update,
        # "DELETE": user_delete,
    }
    data = await call_funcs[request.method](
        request, req_args=None, req_body=None, id=user_id, many=False
    )
    return json({"data": data})
