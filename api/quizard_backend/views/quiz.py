from sanic.response import json
from sanic_jwt_extended import jwt_required
from sanic_jwt_extended.decorators import get_jwt_data_in_request_header

from quizard_backend.views.urls import quiz_blueprint as blueprint
from quizard_backend.models import Quiz, QuizQuestion
from quizard_backend.utils.validation import validate_request, validate_permission

# from quizard_backend.views.quiz_attempt import (
#     quiz_attempt_retrieve,
#     quiz_attempt_create,
#     quiz_attempt_update,
# )


@validate_request(schema="quiz_read", skip_body=True)
async def quiz_retrieve(req, req_args, req_body, many=True, *args, **kwargs):
    return await Quiz.get(**req_args, many=many)


@validate_request(schema="quiz_write", skip_args=True)
@validate_permission(model=Quiz)
async def quiz_create(req, req_args, req_body, *args, **kwargs):
    jwt_data = await get_jwt_data_in_request_header(req.app, req)
    quiz_questions = req_body.pop("questions", [])

    # Assign the requester to be the creator of the quiz
    req_body["creator_id"] = jwt_data["identity"]["uuid"]
    result = await Quiz.add(**req_body)

    # Create the questions
    quiz_id = result["id"]
    questions_order = []
    for question in quiz_questions:
        quiz_question = await QuizQuestion.add(**question, quiz_id=quiz_id)
        questions_order.append(quiz_question["id"])

    # Update the questions' order in quiz
    # using the IDs of created questions
    if not questions_order:
        return await Quiz.modify(
            {"uuid": result["id"]}, {"questions_order": questions_order}
        )

    return result


@validate_request(schema="quiz_write")
@validate_permission(model=Quiz)
async def quiz_replace(req, req_args, req_body, *args, **kwargs):
    return await Quiz.modify(req_args, req_body)


@validate_request(schema="quiz_write", update=True)
@validate_permission(model=Quiz)
async def quiz_update(req, req_args, req_body, *args, **kwargs):
    return await Quiz.modify(req_args, req_body)


@validate_request(schema="quiz_read", skip_body=True)
@validate_permission(model=Quiz)
async def quiz_delete(req, req_args, req_body, *args, **kwargs):
    await Quiz.remove(**req_args)


@blueprint.route("/", methods=["GET", "POST", "PUT", "PATCH", "DELETE"])
async def quiz_route(request):
    call_funcs = {
        "GET": quiz_retrieve,
        "POST": quiz_create,
        # "PUT": quiz_replace,
        # "PATCH": quiz_update,
        # "DELETE": quiz_delete,
    }
    data = await call_funcs[request.method](request)
    return json({"data": data})


@blueprint.route("/<quiz_id>", methods=["GET", "PUT", "PATCH"])
async def quiz_route(request, quiz_id):
    quiz_id = quiz_id.strip()

    call_funcs = {
        "GET": quiz_retrieve,
        "PUT": quiz_replace,
        "PATCH": quiz_update,
        # "DELETE": quiz_delete,
    }

    data = await call_funcs[request.method](
        request, req_args=None, req_body=None, id=quiz_id, many=False
    )
    return json({"data": data})


# @blueprint.route("/attempt", methods=["GET", "POST", "PUT"])
# async def quiz_register_route(request):
#     call_funcs = {
#         "GET": quiz_attempt_retrieve,
#         "POST": quiz_attempt_create,
#         "PUT": quiz_attempt_update,
#     }
#     data = await call_funcs[request.method](request)
#     return json({"data": data})
