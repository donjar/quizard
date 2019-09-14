import sys
from os.path import abspath, dirname

root_dir = dirname(dirname(dirname(abspath(__file__))))
sys.path.append(root_dir)

from quizard_backend.tests import (
    get_fake_user,
    get_fake_quiz,
	get_fake_questions_for_quiz,
    number_of_users,
    number_of_quizzes,
    number_of_questions_per_quiz
)


users = [get_fake_user() for _ in range(number_of_users)]
quizzes = [get_fake_quiz() for _ in range(number_of_quizzes)]
questions = [get_fake_questions_for_quiz(index + 1) for index in range(len(quizzes))]

# Update the questions' order in all quizzes
for index, quiz in enumerate(quizzes):
    quizzes[index]["questions_order"] = [
        number_of_questions_per_quiz * index + question_index
        for question_index in range(len(questions[index]))
    ]

# Flatten the questions
questions = [item for sublist in questions for item in sublist]
