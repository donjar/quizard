from sanic.exceptions import Unauthorized
from quizard_backend.models import Quiz, QuizQuestion


async def extract_quiz_questions_from_quiz(
    quiz_id, requester=None, allow_readonly=False
):
    quiz = await Quiz.get(id=quiz_id)
    quiz_question_ids = quiz["questions"]

    # Check if the requester is the Quiz's owner
    if requester and requester["id"] != quiz["creator_id"]:
        raise Unauthorized("You are not allowed to perform this action")

    questions = []
    if quiz_question_ids:
        quiz_questions = await QuizQuestion.get(
            in_column="id",
            in_values=quiz_question_ids,
            many=True,
            allow_readonly=allow_readonly,
        )
        questions_dict = {question["id"]: question for question in quiz_questions}
        questions = [questions_dict[question_id] for question_id in quiz_question_ids]

    return quiz_question_ids, questions_dict, questions
