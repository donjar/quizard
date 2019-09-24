from sanic.exceptions import Forbidden

from quizard_backend.models import Quiz, QuizQuestion
from quizard_backend.utils.query import get_many


async def calculate_score(question_ids, answers):
    score = 0
    questions = await get_many(QuizQuestion, in_column="id", in_values=question_ids)

    for question in questions:
        if question.correct_option == answers[question.id]:
            score += 1

    return score


async def extract_quiz_questions_from_quiz(
    quiz_id, requester=None, allow_readonly=False, query_params=None
):
    quiz = await Quiz.get(id=quiz_id)
    quiz_question_ids = quiz["questions"]
    query_params = query_params or {}

    # Check if the requester is the Quiz's owner
    if requester and requester["id"] != quiz["creator_id"]:
        raise Forbidden("You are not allowed to perform this action")

    questions = []
    if quiz_question_ids:
        quiz_questions = await QuizQuestion.get(
            in_column="id",
            in_values=quiz_question_ids,
            many=True,
            allow_readonly=allow_readonly,
            **query_params,
        )
        questions_dict = {question["id"]: question for question in quiz_questions}
        questions = [questions_dict[question_id] for question_id in quiz_question_ids]

    return quiz_question_ids, questions_dict, questions
