from sanic_jwt_extended.decorators import (
    get_jwt_data_in_request_header,
    verify_jwt_data_type,
)

from quizard_backend import app


async def validate_token(request, token_type="access"):
    jwt_token_data = await get_jwt_data_in_request_header(app, request)
    await verify_jwt_data_type(jwt_token_data, token_type)
    return jwt_token_data


async def get_jwt_token_requester(request):
    jwt_token_data = await validate_token(request)
    requester = jwt_token_data["identity"]
    return requester
