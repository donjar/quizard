from sanic import Blueprint

root_blueprint = Blueprint("root")
user_blueprint = Blueprint("user", url_prefix="/users")
quiz_blueprint = Blueprint("quiz", url_prefix="/quizzes")
quiz_question_blueprint = Blueprint("quiz_question", url_prefix="/questions")

# Import the blueprints that have views added to it
from quizard_backend.views.root import blueprint as root
from quizard_backend.views.user import blueprint as user
from quizard_backend.views.quiz import blueprint as quiz
from quizard_backend.views.quiz_question import blueprint as quiz_question

blueprints = Blueprint.group(root, user, quiz, quiz_question)
