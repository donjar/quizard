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
    number_of_questions_per_quiz,
)


users = [get_fake_user() for _ in range(number_of_users)]
users += [
    {"full_name": "Quizard", "email": "quizard", "password": "cs3216a3"},
    {"full_name": "User 1", "email": "user1", "password": "cs3216a3"},
    {"full_name": "User 2", "email": "user2", "password": "cs3216a3"},
    {"full_name": "User 3", "email": "user3", "password": "cs3216a3"},
]
quizzes = [get_fake_quiz(users[index]["id"]) for index in range(number_of_quizzes)]
questions_list = [get_fake_questions_for_quiz(quiz["id"]) for quiz in quizzes]

# Update the questions' order in all quizzes
for index, quiz in enumerate(quizzes):
    quizzes[index]["questions"] = [question["id"] for question in questions_list[index]]

# Flatten the questions, for `setup_dev_db`
questions = [item for sublist in questions_list for item in sublist]
