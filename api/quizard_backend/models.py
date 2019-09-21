from time import time

from uuid import uuid4
from sanic.exceptions import InvalidUsage, NotFound
from gino.dialects.asyncpg import ARRAY

from quizard_backend import db
from quizard_backend.exceptions import LoginFailureError
from quizard_backend.utils.query import (
    get_one,
    get_one_latest,
    get_many,
    create_one,
    update_one,
    delete_many,
)
from quizard_backend.utils.crypto import hash_password, validate_password_strength
from quizard_backend.utils.exceptions import raise_not_found_exception
from quizard_backend.utils.serialization import serialize_to_dict


def generate_uuid():
    return uuid4().hex


def unix_time():
    """Return the current unix timestamp."""
    return int(time())


class BaseModel(db.Model):
    @classmethod
    async def get(
        cls,
        many=False,
        last_id=None,
        limit=15,
        fields=None,
        in_column=None,
        in_values=None,
        **kwargs
    ):
        """
        Retrieve the row(s) of a model, using Keyset Pagination (last_id).

        Kwargs:
            last_id (str):
                The returned result will start from row
                with id == last_id (exclusive).

                Ignored if many=False.
        """
        # Using an param `many` to optimize Select queries for single row
        if many:
            data = await get_many(
                cls,
                last_id=last_id,
                limit=limit,
                in_column=in_column,
                in_values=in_values,
                **kwargs
            )
        else:
            data = await get_one(cls, **kwargs)

        serialized_data = serialize_to_dict(data, fields=fields)

        # Raise NotFound if no single user is found
        # Ignore if many=True, as returning an empty List is expected
        if not many and not serialized_data:
            raise_not_found_exception(cls, **kwargs)

        return serialized_data

    @classmethod
    async def add(cls, **kwargs):
        data = await create_one(cls, **kwargs)
        return serialize_to_dict(data)

    @classmethod
    async def modify(cls, get_kwargs, update_kwargs):
        model_id = get_kwargs.get("id")
        if not model_id:
            raise InvalidUsage("Missing field 'id' in query parameter")

        payload = await get_one(cls, id=model_id)
        if not payload:
            raise_not_found_exception(cls, id=model_id)

        data = await update_one(payload, **update_kwargs)
        return serialize_to_dict(data)

    @classmethod
    async def remove(cls, **kwargs):
        model_id = kwargs.get("id")
        if not model_id:
            raise InvalidUsage("Missing field 'id' in query parameter")

        model = await get_one(cls, id=model_id)
        if not model:
            raise_not_found_exception(cls, id=model_id)

        await model.delete()


class QuizQuestion(BaseModel):
    __tablename__ = "quiz_question"

    id = db.Column(
        db.String(length=32), nullable=False, unique=True, default=generate_uuid
    )
    internal_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    quiz_id = db.Column(db.String(length=32), db.ForeignKey("quiz.id"), nullable=False)
    text = db.Column(db.String, nullable=False)
    options = db.Column(ARRAY(db.String), server_default="{}")
    correct_option = db.Column(db.SmallInteger, nullable=False, default=0)
    created_at = db.Column(db.BigInteger, nullable=False, default=unix_time)
    updated_at = db.Column(db.BigInteger, onupdate=unix_time)

    # Index
    _idx_quiz_question_id = db.Index("idx_quiz_question_id", "id")
    _idx_quiz_question_quiz_id = db.Index("idx_quiz_question_quiz_id", "quiz_id")


class QuizAnswer(BaseModel):
    __tablename__ = "quiz_answer"

    id = db.Column(
        db.String(length=32), nullable=False, unique=True, default=generate_uuid
    )
    internal_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    question_id = db.Column(
        db.String(length=32), db.ForeignKey("quiz_question.id"), nullable=False
    )
    attempt_id = db.Column(
        db.String(length=32), db.ForeignKey("quiz_attempt.id"), nullable=False
    )
    user_id = db.Column(db.String(length=32), db.ForeignKey("user.id"), nullable=False)
    selected_option = db.Column(db.SmallInteger)
    created_at = db.Column(db.BigInteger, nullable=False, default=unix_time)
    updated_at = db.Column(db.BigInteger, onupdate=unix_time)

    # Index
    _idx_quiz_anawer_id = db.Index("idx_quiz_anawer_id", "id")
    _idx_quiz_answer_question_attempt_user = db.Index(
        "idx_quiz_answer_question_attempt_user", "question_id", "attempt_id", "user_id"
    )


class Quiz(BaseModel):
    __tablename__ = "quiz"

    id = db.Column(
        db.String(length=32), nullable=False, unique=True, default=generate_uuid
    )
    internal_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    num_attempts = db.Column(db.BigInteger, nullable=False, default=0)
    creator_id = db.Column(
        db.String(length=32), db.ForeignKey("user.id"), nullable=False
    )
    category_id = db.Column(db.SmallInteger)
    type_id = db.Column(db.SmallInteger)
    animation_id = db.Column(db.SmallInteger)
    questions = db.Column(ARRAY(db.String), server_default="{}")
    created_at = db.Column(db.BigInteger, nullable=False, default=unix_time)
    updated_at = db.Column(db.BigInteger, onupdate=unix_time)

    # Index
    _idx_quiz_id = db.Index("idx_quiz_id", "id")
    _idx_quiz_creator = db.Index("idx_quiz_creator", "creator_id")
    _idx_quiz_category_id = db.Index("idx_quiz_category_id", "category_id")

    @classmethod
    async def add(cls, creator_id=None, **kwargs):
        return await super(Quiz, cls).add(creator_id=creator_id, **kwargs)

    @classmethod
    async def remove(cls, **kwargs):
        if "id" not in kwargs:
            raise KeyError("Missing key 'id' in query parameter.")

        # Delete all the attempts linked to the quiz
        await delete_many(QuizAttempt, quiz_id=kwargs["id"])

        # Delete all the questions linked to the quiz
        await delete_many(QuizQuestion, quiz_id=kwargs["id"])

        return await super(Quiz, cls).remove(**kwargs)


class QuizAttempt(BaseModel):
    __tablename__ = "quiz_attempt"

    id = db.Column(
        db.String(length=32), nullable=False, unique=True, default=generate_uuid
    )
    internal_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    quiz_id = db.Column(db.String(length=32), db.ForeignKey("quiz.id"), nullable=False)
    user_id = db.Column(db.String(length=32), db.ForeignKey("user.id"), nullable=False)
    score = db.Column(db.BigInteger, nullable=True)
    created_at = db.Column(db.BigInteger, nullable=False, default=unix_time)
    updated_at = db.Column(db.BigInteger, onupdate=unix_time)

    # Index
    _idx_quiz_attempt_id = db.Index("idx_quiz_attempt_id", "id")
    _idx_quiz_attempt_quiz_id_score = db.Index(
        "idx_quiz_attempt_quiz_id_score", "quiz_id", "score"
    )

    @classmethod
    async def get_latest_or_add(cls, **kwargs):
        created_attempt = await get_one_latest(QuizAttempt, **kwargs)

        # Update the number of attempts in Quiz, if no previous attempts of the user are found
        if not created_attempt:
            current_num_attempts = (
                await get_one(Quiz, id=kwargs["quiz_id"])
            ).num_attempts
            await Quiz.modify(
                {"id": kwargs["quiz_id"]}, {"num_attempts": current_num_attempts + 1}
            )
            data = await create_one(cls, **kwargs)
            return serialize_to_dict(data)

        return serialize_to_dict(created_attempt)

    @classmethod
    async def remove(cls, **kwargs):
        if "attempt_id" not in kwargs:
            raise KeyError("Missing key 'attempt_id' in kwargs.")

        # Delete all the answers linked to the attempt
        await delete_many(QuizAnswer, attempt_id=kwargs["attempt_id"])
        return await super(QuizAttempt, cls).remove(**kwargs)


class User(BaseModel):
    __tablename__ = "user"

    id = db.Column(
        db.String(length=32), nullable=False, unique=True, default=generate_uuid
    )
    internal_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    full_name = db.Column(db.String, nullable=False)
    display_name = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    disabled = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.BigInteger, nullable=False, default=unix_time)
    updated_at = db.Column(db.BigInteger, onupdate=unix_time)

    # Index
    _idx_user_id = db.Index("idx_user_id", "id")
    _idx_user_email = db.Index("idx_user_email", "email")

    @classmethod
    async def add(cls, password=None, **kwargs):
        # Follow guidelines from OWASP
        # https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
        if password:
            validate_password_strength(password)
            password = hash_password(password)

        return await super(User, cls).add(password=password, **kwargs)

    @classmethod
    async def modify(cls, get_kwargs, update_kwargs):
        if "password" in update_kwargs:
            password = update_kwargs["password"]
            validate_password_strength(password)
            update_kwargs["password"] = hash_password(password)

        return await super(User, cls).modify(get_kwargs, update_kwargs)

    @classmethod
    async def remove(cls, **kwargs):
        """For User, only disabled it, without completely delete it."""
        if "id" not in kwargs:
            raise InvalidUsage("Missing field 'id' in query parameter")

        await super(User, cls).modify(kwargs, {"disabled": True})

    @classmethod
    async def login(cls, email=None, password=None, **kwargs):
        if not email:
            raise InvalidUsage("Missing field 'email' in request's body.")
        if not password:
            raise InvalidUsage("Missing field 'password' in request's body.")

        validate_password_strength(password)
        password = hash_password(password)

        user = None
        try:
            user = await cls.get(email=email, password=password, **kwargs)
        except NotFound:
            pass

        if not user:
            raise LoginFailureError()
        return user
