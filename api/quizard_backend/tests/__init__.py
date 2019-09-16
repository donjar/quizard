from random import choices
from string import ascii_lowercase, digits

from faker import Faker
from faker.providers import python as py_provider, profile as profile_provider, lorem

from quizard_backend.models import generate_uuid

# Set up Faker
fake = Faker()
fake.add_provider(py_provider)
fake.add_provider(profile_provider)
fake.add_provider(lorem)

fake_profile_fields = ["name", "mail"]
number_of_users = 20
number_of_quizzes = 20
number_of_questions_per_quiz = 10
number_of_options_per_question = 5


def get_fake_password():
    return "".join(choices(ascii_lowercase, k=10) + choices(digits, k=10))


def get_fake_user():
    profile = fake.profile(fields=fake_profile_fields)
    return {
        "uuid": generate_uuid(),
        "full_name": profile["name"],
        "email": profile["mail"],
        "password": get_fake_password(),
    }


def get_fake_question_data(has_uuid=True):
    question_data = {
        "uuid": generate_uuid(),
        "text": fake.sentence(nb_words=10),
        "options": [
            fake.sentence(nb_words=10) for _ in range(number_of_options_per_question)
        ],
        "correct_option": fake.pyint(max_value=number_of_options_per_question - 1),
    }
    if not has_uuid:
        question_data.pop("uuid")
    return question_data


def get_fake_quiz_questions(has_uuid=True):
    return [
        get_fake_question_data(has_uuid=has_uuid)
        for _ in range(number_of_questions_per_quiz)
    ]


def get_fake_questions_for_quiz(quiz_id):
    return [
        {**get_fake_question_data(), "quiz_id": quiz_id}
        for _ in range(number_of_questions_per_quiz)
    ]


def get_fake_quiz(creator_id=None):
    return {"uuid": generate_uuid(), "creator_id": creator_id}


# Helper functions


def profile_created_from_origin(
    origin: dict, created: dict, ignore={"password", "updated_at"}
):
    for key, val in origin.items():
        if key in ignore:
            continue
        key = "id" if key == "uuid" else key

        if val != created[key]:
            return False
    return True
