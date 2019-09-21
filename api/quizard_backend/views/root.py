from uuid import uuid4
from sanic.response import json
from sanic_jwt_extended import create_access_token, create_refresh_token

from quizard_backend.models import User
from quizard_backend.views.urls import root_blueprint as blueprint
from quizard_backend.utils.request import unpack_request
from quizard_backend.utils.validation import validate_request, validate_token


@blueprint.route("/")
async def root(request):
    return json({"hello": "world"})


@blueprint.route("/login", methods=["POST"])
@unpack_request
@validate_request(schema="user_login", skip_args=True)
async def login(request, *, req_args, req_body):
    """
    Return an access token and refresh token to user,
    if the login credentials of email and password are correct.

    Note:
        Invalid token received in any protected routes
        will return a 422 response.

    Return HTTP Codes:
        400: Missing `email` and/or `password` in request's body.
        401: Invalid email or password.
    """
    user = await User.login(**req_body)

    # Identity can be any data that is json serializable
    access_token = await create_access_token(identity=user, app=request.app)
    refresh_token = await create_refresh_token(identity=str(uuid4()), app=request.app)
    return json({"access_token": access_token, "refresh_token": refresh_token})


@blueprint.route("/refresh", methods=["POST"])
async def create_new_access_token(request):
    jwt_token_data = await validate_token(request, token_type="refresh")
    access_token = await create_access_token(
        identity=jwt_token_data["identity"], app=request.app
    )
    return json({"access_token": access_token})
