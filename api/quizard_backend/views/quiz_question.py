from sanic.response import json

from quizard_backend.views.urls import quiz_question_blueprint as blueprint
from quizard_backend.models import QuizQuestion


@blueprint.route("/<question_id>", methods=["GET"])
async def quiz_route_get_question(request, quiz_id):
    return json({"data": await QuizQuestion(id=quiz_id)})
