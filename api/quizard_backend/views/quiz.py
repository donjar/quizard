from sanic.response import json
from sanic_jwt_extended import jwt_required
from sanic_jwt_extended.decorators import get_jwt_data_in_request_header

from quizard_backend.views.urls import quiz_blueprint as blueprint
from quizard_backend.exceptions import ExistingAnswerError
from quizard_backend.models import Quiz, QuizQuestion, QuizAttempt, QuizAnswer
from quizard_backend.utils.query import get_one_latest, get_many, get_one, get_count
from quizard_backend.utils.validation import (
    validate_request,
    validate_permission,
    validate_against_schema,
)


@validate_request(schema="quiz_read", skip_body=True)
@validate_permission(model=Quiz)
async def quiz_retrieve(req, req_args, req_body, many=True, *args, **kwargs):
    return await Quiz.get(**req_args, many=many)


@validate_request(schema="quiz_write", skip_args=True)
@validate_permission(model=Quiz)
async def quiz_create(req, req_args, req_body, *args, **kwargs):
    jwt_data = await get_jwt_data_in_request_header(req.app, req)
    quiz_questions = req_body.pop("questions", [])

    # Assign the requester to be the creator of the quiz
    req_body["creator_id"] = jwt_data["identity"]["id"]
    req_body["questions"] = []
    result = await Quiz.add(**req_body)

    # Create the questions
    quiz_id = result["id"]
    questions = []
    for question in quiz_questions:
        quiz_question = await QuizQuestion.add(**question, quiz_id=quiz_id)
        questions.append(quiz_question["id"])

    # Update the questions' order in quiz
    # using the IDs of created questions
    if questions:
        return await Quiz.modify({"id": result["id"]}, {"questions": questions})
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


@blueprint.route("/<quiz_id>/questions/<question_id>/answers", methods=["POST"])
async def quiz_route_submit_answer(request, quiz_id, question_id):
    jwt_data = await get_jwt_data_in_request_header(request.app, request)
    requester = jwt_data["identity"]

    # Check if the quiz exists, before further processing
    await Quiz.get(id=quiz_id)

    # Get the latest attempt
    latest_attempt = await QuizAttempt.get_latest_or_add(
        quiz_id=quiz_id, user_id=requester["id"]
    )
    attempt_id = latest_attempt["id"]

    # Request's body validation
    req_body = request.json or {}
    quiz_answer_data = validate_against_schema(
        {
            **req_body,
            "attempt_id": attempt_id,
            "user_id": requester["id"],
            "question_id": question_id,
        },
        "quiz_answer_write",
    )
    # Check if the quiz exists, before further processing
    await QuizQuestion.get(id=question_id)

    # Fail the creation of answer
    # if the question is already answered in the current attempt
    if await get_one(
        QuizAnswer,
        attempt_id=attempt_id,
        user_id=requester["id"],
        question_id=question_id,
    ):
        raise ExistingAnswerError()

    await QuizAnswer.add(**quiz_answer_data)

    # Return the answer is correct or wrong
    question = await get_one(QuizQuestion, id=question_id)
    return json(
        {
            "data": {
                "is_correct": question.correct_option
                == quiz_answer_data.get("selected_option", -1)
            }
        }
    )


@blueprint.route("/<quiz_id>/questions", methods=["GET"])
@validate_permission
async def quiz_route_get_questions(request, quiz_id, **kwargs):
    quiz = await Quiz.get(id=quiz_id)
    quiz_question_ids = quiz["questions"]

    questions = []
    if quiz_question_ids:
        quiz_questions = await QuizQuestion.get(
            in_column="id", in_values=quiz_question_ids, many=True
        )
        questions_dict = {question["id"]: question for question in quiz_questions}
        questions = [questions_dict[question_id] for question_id in quiz_question_ids]

    return json({"data": questions})


async def calculate_score(question_ids, answers):
    score = 0
    questions = await get_many(QuizQuestion, in_column="id", in_values=question_ids)

    for question in questions:
        if question.correct_option == answers[question.id]:
            score += 1

    return score


async def quiz_route_get_attempt(request, requester, quiz_id):
    quiz = await Quiz.get(id=quiz_id)
    quiz_question_ids = quiz["questions"]
    is_finished = False
    first_unanswered_question = quiz_question_ids[0]

    # Get the latest attempt
    latest_attempt = await QuizAttempt.get_latest_or_add(
        quiz_id=quiz_id, user_id=requester["id"]
    )

    # by checking if the user has at least 1 answer in this quiz
    requester_answers = await get_many(
        QuizAnswer, attempt_id=latest_attempt["id"], user_id=requester["id"]
    )

    # Validate if the quiz has been fully answered
    first_unanswered_question = None
    if len(quiz_question_ids) > len(requester_answers):
        answered_question_ids = {answer.question_id for answer in requester_answers}
        for question_id in quiz_question_ids:
            if question_id not in answered_question_ids:
                first_unanswered_question = question_id
                break

    is_finished = first_unanswered_question is None
    answers = {
        answer.question_id: answer.selected_option for answer in requester_answers
    }
    if is_finished:
        score = latest_attempt["score"]
        if score is None:
            score = await calculate_score(quiz_question_ids, answers)

        return {"score": score, "is_finished": True, "answers": answers}

    return {
        "is_finished": False,
        "continue_from": first_unanswered_question,
        "answers": answers,
    }


async def quiz_route_create_attempt(request, requester, quiz_id):
    # Check if the quiz exists, before further processing
    await Quiz.get(id=quiz_id)

    return await QuizAttempt.add(user_id=requester["id"], quiz_id=quiz_id)


@blueprint.route("/<quiz_id>/attempt", methods=["GET", "POST"])
async def quiz_route_attempt(request, quiz_id):
    jwt_data = await get_jwt_data_in_request_header(request.app, request)
    requester = jwt_data["identity"]

    call_funcs = {"GET": quiz_route_get_attempt, "POST": quiz_route_create_attempt}

    data = await call_funcs[request.method](request, requester, quiz_id)
    return json({"data": data})
