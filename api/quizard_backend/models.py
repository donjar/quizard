from time import time

from sanic.exceptions import InvalidUsage, NotFound
from gino.dialects.asyncpg import ARRAY

from quizard_backend import db
from quizard_backend.exceptions import LoginFailureError
from quizard_backend.utils.query import get_one, get_many, create_one, update_one
from quizard_backend.utils.crypto import hash_password, validate_password_strength
from quizard_backend.utils.serialization import serialize_to_dict


def unix_time():
    """Return the current unix timestamp."""
    return int(time())


class BaseModel(db.Model):
    @classmethod
    async def get(cls, many=False, last_id=0, limit=15, fields=None, **kwargs):
        """
        Retrieve the row(s) of a model, using Keyset Pagination (last_id).

        Kwargs:
            last_id (integer):
                The returned result will start from row
                with id == last_id (exclusive).

                Ignored if many=False.
        """
        # Using an param `many` to optimize Select queries for single row
        if many:
            data = await get_many(cls, last_id=last_id, limit=limit, **kwargs)
        else:
            data = await get_one(cls, **kwargs)

        serialized_data = serialize_to_dict(data, fields=fields)

        # Raise NotFound if no single user is found
        # Ignore if many=True, as returning an empty List is expected
        if not many and not serialized_data:
            message = "Unable to find {}".format(cls.__name__)
            if kwargs:
                message += " with " + ", ".join(
                    "{!s}={!r}".format(key, val) for (key, val) in kwargs.items()
                )
            raise NotFound(message)

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
        data = await update_one(payload, **update_kwargs)
        return serialize_to_dict(data)

    @classmethod
    async def remove(cls, **kwargs):
        model_id = kwargs.get("id")
        if not model_id:
            raise InvalidUsage("Missing field 'id' in query parameter")

        model = await get_one(cls, id=model_id)
        await model.delete()


class Quiz(BaseModel):
    __tablename__ = "quiz"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    title = db.Column(db.String)
    creator_id = db.Column(db.BigInteger, db.ForeignKey("user.id"), nullable=False)
    category_id = db.Column(db.SmallInteger)
    type_id = db.Column(db.SmallInteger)
    animation_id = db.Column(db.SmallInteger)
    questions_order = db.Column(ARRAY(db.SmallInteger), server_default="{}")
    created_at = db.Column(db.BigInteger, nullable=False, default=unix_time)
    updated_at = db.Column(db.BigInteger, onupdate=unix_time)

    # Index
    _idx_quiz_creator = db.Index("idx_quiz_creator", "creator_id")
    _idx_quiz_category_id = db.Index("idx_quiz_category_id", "category_id")

    @classmethod
    async def add(cls, creator_id=None, **kwargs):
        return await super(Quiz, cls).add(creator_id=creator_id, **kwargs)

    @classmethod
    async def remove(cls, **kwargs):
        # TO-DO: Explicitly remove the quiz questions/answers (if we want to)
        return await super(Quiz, cls).remove(**kwargs)


class QuizQuestion(BaseModel):
    __tablename__ = "quiz_question"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    quiz_id = db.Column(db.BigInteger, db.ForeignKey("quiz.id"), nullable=False)
    text = db.Column(db.String, nullable=False)
    options = db.Column(ARRAY(db.String), server_default="{}")
    correct_option = db.Column(db.SmallInteger, nullable=False, default=0)
    created_at = db.Column(db.BigInteger, nullable=False, default=unix_time)
    updated_at = db.Column(db.BigInteger, onupdate=unix_time)

    # Index
    _idx_quiz_question_quiz_id = db.Index("idx_quiz_question_quiz_id", "quiz_id")


class QuizAttempt(BaseModel):
    __tablename__ = "quiz_attempt"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    quiz_id = db.Column(db.BigInteger, db.ForeignKey("quiz.id"), nullable=False)
    user_id = db.Column(db.BigInteger, db.ForeignKey("user.id"), nullable=False)
    score = db.Column(db.BigInteger, nullable=False, default=0)
    created_at = db.Column(db.BigInteger, nullable=False, default=unix_time)
    updated_at = db.Column(db.BigInteger, onupdate=unix_time)

    # Index
    _idx_quiz_attempt_quiz_id_score = db.Index(
        "idx_quiz_attempt_quiz_id_score", "quiz_id", "score"
    )


class QuizAnswer(BaseModel):
    __tablename__ = "quiz_answer"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    quiz_id = db.Column(db.BigInteger, db.ForeignKey("quiz.id"), nullable=False)
    attempt_id = db.Column(
        db.BigInteger, db.ForeignKey("quiz_attempt.id"), nullable=False
    )
    user_id = db.Column(db.BigInteger, db.ForeignKey("user.id"), nullable=False)
    selected_option = db.Column(db.SmallInteger)
    created_at = db.Column(db.BigInteger, nullable=False, default=unix_time)
    updated_at = db.Column(db.BigInteger, onupdate=unix_time)

    # Index
    _idx_quiz_answer_quiz_attempt_user = db.Index(
        "idx_quiz_answer_quiz_attempt_user", "quiz_id", "attempt_id", "user_id"
    )


class User(BaseModel):
    __tablename__ = "user"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    full_name = db.Column(db.String, nullable=False)
    display_name = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    disabled = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.BigInteger, nullable=False, default=unix_time)
    updated_at = db.Column(db.BigInteger, onupdate=unix_time)

    # Index
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
        model_id = kwargs.get("id")
        if not model_id:
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
