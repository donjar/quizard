from quizard_backend import app
from quizard_backend.config import MODE, SANIC_RUN_CONFIG

if __name__ == "__main__":

    # # Debugging routes
    # for handler, (rule, router) in app.router.routes_names.items():
    #     print(rule)

    if MODE == "production":
        import ssl

        context = ssl.create_default_context(purpose=ssl.Purpose.CLIENT_AUTH)
        context.load_cert_chain(
            "/etc/letsencrypt/live/rest.quizard.xyz/fullchain.pem",
            keyfile="/etc/letsencrypt/live/rest.quizard.xyz/privkey.pem",
        )
        SANIC_RUN_CONFIG.update({"ssl": context})

    app.run(**SANIC_RUN_CONFIG)
