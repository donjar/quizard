from sanic.response import json

from quizard_backend.views.urls import user_blueprint as blueprint
from quizard_backend.models import User, Quiz, QuizAttempt
from quizard_backend.utils.links import generate_pagination_links
from quizard_backend.utils.query import (
    get_many,
    get_one_latest,
    get_latest_quiz_attempts,
)
from quizard_backend.utils.request import unpack_request
from quizard_backend.utils.validation import validate_request, validate_permission


@validate_request(schema="user_read", skip_body=True)
async def user_retrieve(req, *, req_args, req_body, many=True, query_params, **kwargs):
    data = await User.get(**req_args, many=many, **query_params)
    if many:
        return {"data": data, "links": generate_pagination_links(req.url, data)}
    return {"data": data}


@validate_request(schema="user_write", skip_args=True)
async def user_create(req, *, req_args, req_body, **kwargs):
    return {"data": await User.add(**req_body)}


@validate_request(schema="user_write")
@validate_permission(model=User)
async def user_replace(req, *, req_args, req_body, **kwargs):
    return {"data": await User.modify(req_args, req_body)}


@validate_request(schema="user_write", update=True)
@validate_permission(model=User)
async def user_update(req, *, req_args, req_body, **kwargs):
    return {"data": await User.modify(req_args, req_body)}


@validate_request(schema="user_read", skip_body=True)
@validate_permission(model=User)
async def user_delete(req, *, req_args, req_body, **kwargs):
    await User.remove(**req_args)


@blueprint.route("/", methods=["GET", "POST"])
@unpack_request
async def user_route(request, *, req_args=None, req_body=None, query_params=None):
    call_funcs = {"GET": user_retrieve, "POST": user_create}
    response = await call_funcs[request.method](
        request, req_args=req_args, req_body=req_body, query_params=query_params
    )
    return json(response)


@blueprint.route("/<user_id>", methods=["GET", "PUT", "PATCH"])
@unpack_request
async def user_route_single(
    request, user_id, *, req_args=None, req_body=None, query_params
):
    user_id = user_id.strip()

    call_funcs = {
        "GET": user_retrieve,
        "PUT": user_replace,
        "PATCH": user_update,
        # "DELETE": user_delete,
    }

    response = await call_funcs[request.method](
        request,
        req_args={**req_args, "id": user_id},
        req_body=req_body,
        many=False,
        query_params=query_params,
    )
    return json(response)


## GET Personal quizzes
@blueprint.route("/<user_id>/quizzes/created", methods=["GET"])
@unpack_request
@validate_request(schema="quiz_read")
async def user_quizzes_created_route(
    request, user_id, *, req_args, req_body, query_params, **kwargs
):
    user_id = user_id.strip()
    data = await Quiz.get(creator_id=user_id, many=True, **query_params)
    return json({"data": data, "links": generate_pagination_links(request.url, data)})


@blueprint.route("/<user_id>/quizzes/attempted", methods=["GET"])
@unpack_request
@validate_request(schema="quiz_read")
async def user_quizzes_attempted_route(
    request, user_id, *, req_args, req_body, query_params, **kwargs
):
    unique_quiz_attempts = []
    # Replace `after_id` from using Quiz ID to QuizAttempt ID
    if "after_id" in query_params:
        latest_attempt_of_after_quiz = await get_one_latest(
            QuizAttempt, quiz_id=query_params["after_id"], user_id=user_id
        )
        query_params["after_id"] = latest_attempt_of_after_quiz.id

    # Get the quiz attempts of an user, sorted by `most recent`
    unique_quiz_attempts = await get_latest_quiz_attempts(
        QuizAttempt, user_id, **query_params
    )

    # Get the quizzes from the attempts
    quiz_ids = [quiz_id for quiz_id, _, _, _ in unique_quiz_attempts]
    unordered_attempted_quizzes = []
    if unique_quiz_attempts:
        unordered_attempted_quizzes = await Quiz.get(
            in_column="id", in_values=quiz_ids, many=True, limit=None
        )

    # Only return the quizzes
    attempted_quizzes_as_dict = {
        quiz["id"]: quiz for quiz in unordered_attempted_quizzes
    }
    is_finished_dict = {
        quiz_id: is_finished for quiz_id, _, is_finished, _ in unique_quiz_attempts
    }
    # Inject `is_finished` from the attempts to returned quizzes
    data = [
        {**attempted_quizzes_as_dict[quiz_id], "is_finished": is_finished_dict[quiz_id]}
        for quiz_id in quiz_ids
    ]
    return json({"data": data, "links": generate_pagination_links(request.url, data)})
