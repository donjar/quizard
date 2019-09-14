from quizard_backend import app
from quizard_backend.config import SANIC_RUN_CONFIG

if __name__ == "__main__":

    # # Debugging routes
    # for handler, (rule, router) in app.router.routes_names.items():
    #     print(rule)
    app.run(**SANIC_RUN_CONFIG)
