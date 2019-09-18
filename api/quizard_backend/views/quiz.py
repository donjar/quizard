from sanic.response import json
from sanic_jwt_extended import jwt_required
from sanic_jwt_extended.decorators import get_jwt_data_in_request_header

from quizard_backend.views.urls import quiz_blueprint as blueprint
from quizard_backend.models import Quiz, QuizQuestion, QuizAttempt, QuizAnswer
from quizard_backend.utils.query import get_one_latest, get_many
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
    req_body["creator_id"] = jwt_data["identity"]["id"]
    result = await Quiz.add(**req_body)

    # Create the questions
    quiz_id = result["id"]
    questions = []
    for question in quiz_questions:
        quiz_question = await QuizQuestion.add(**question, quiz_id=quiz_id)
        questions.append(quiz_question["id"])

    # Update the questions' order in quiz
    # using the IDs of created questions
    if not questions:
        return await Quiz.modify({"uuid": result["id"]}, {"questions": questions})

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


@blueprint.route("/", methods=["GET", "POST"])
async def quiz_route(request):
    call_funcs = {"GET": quiz_retrieve, "POST": quiz_create}
    data = await call_funcs[request.method](request)
    return json({"data": data})


@blueprint.route("/<quiz_id>", methods=["GET", "DELETE"])
async def quiz_route_quiz_id(request, quiz_id):
    quiz_id = quiz_id.strip()

    call_funcs = {
        "GET": quiz_retrieve,
        # "PUT": quiz_replace,
        # "PATCH": quiz_update,
        "DELETE": quiz_delete,
    }

    data = await call_funcs[request.method](
        request, req_args=None, req_body=None, id=quiz_id, many=False
    )
    return json({"data": data})


# @validate_request(schema="quiz_question_read", skip_body=True)
# async def quiz_question_retrieve(req, req_args, req_body, many=True, *args, **kwargs):
#     jwt_data = await get_jwt_data_in_request_header(req.app, req)
#     requester = jwt_data["identity"]
#
#     quiz_questions = await QuizQuestion.get(**req_args, many=many)
#
#     # Get the latest attempt
#     latest_attempt = await get_one_latest(QuizAttempt, user_id=requester["id"], **kwargs)
#
#     # return await Quiz.get(**req_args, many=many)


@blueprint.route("/<quiz_id>/questions", methods=["GET"])
async def quiz_route_get_questions(request, quiz_id):
    jwt_data = await get_jwt_data_in_request_header(request.app, request)
    requester = jwt_data["identity"]
    quiz = await Quiz.get(uuid=quiz_id)
    quiz_question_ids = quiz["questions"]

    # Get the latest attempt
    latest_attempt = await get_one_latest(
        QuizAttempt, user_id=requester["id"], quiz_id=quiz_id
    )
    is_finished = False
    first_unanswered_question = quiz_question_ids[0]


    # If the user has at least 1 answer in this quiz
    if latest_attempt:
        requester_answers = await get_many(
            QuizAnswer, attempt_id=latest_attempt.id, user_id=requester["id"]
        )

        first_unanswered_question = None
        if len(quiz_question_ids) > len(requester_answers):
            answered_question_ids = {answer.question_id for answer in requester_answers}
            for question_id in quiz_question_ids:
                if question_id not in answered_question_ids:
                    first_unanswered_question = question_id
                    break

        is_finished = first_unanswered_question is None

    if is_finished:
        return json(
            {
                "data": {
                    "questions": quiz_question_ids,
                    "score": latest_attempt.score,
                    "is_finished": is_finished,
                }
            }
        )

    return json(
        {
            "data": {
                "questions": quiz_question_ids,
                "is_finished": is_finished,
                "continue_from": first_unanswered_question,
            }
        }
    )

    # num_of_answers_for_attempt = await get_count(
    #     QuizAnswer,
    #     in_column="question_id",
    #     in_values=[question["id"] for question in quiz_questions]
    # )

    # return await Quiz.get(**req_args, many=many)
    # return json({"data": data})


# @blueprint.route("/attempt", methods=["GET", "POST", "PUT"])
# async def quiz_register_route(request):
#     call_funcs = {
#         "GET": quiz_attempt_retrieve,
#         "POST": quiz_attempt_create,
#         "PUT": quiz_attempt_update,
#     }
#     data = await call_funcs[request.method](request)
#     return json({"data": data})
