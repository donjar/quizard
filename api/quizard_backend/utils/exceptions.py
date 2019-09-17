from sanic.exceptions import NotFound


def raise_not_found_exception(model, **kwargs):
    message = "Unable to find {}".format(model.__name__)
    if kwargs:
        message += " with " + ", ".join(
            "{!s}={!r}".format(key, val) for (key, val) in kwargs.items()
        )
    raise NotFound(message)
