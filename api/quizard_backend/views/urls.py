from sanic import Blueprint

root_blueprint = Blueprint("root")
user_blueprint = Blueprint("user", url_prefix="/users")
quiz_blueprint = Blueprint("quiz", url_prefix="/quizzes")


# Import the blueprints that have views added to it
from quizard_backend.views.root import blueprint as root
from quizard_backend.views.user import blueprint as user
from quizard_backend.views.quiz import blueprint as quiz


blueprints = Blueprint.group(root, user, quiz)
