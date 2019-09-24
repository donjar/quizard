from functools import partial, wraps

from quizard_backend.schemas import QUERY_PARAM_READ_SCHEMA


def req_args_to_dict(args: dict):
    if not args:
        return {}
    return {key: val[-1] for key, val in args.items()}


def unpack_request(func=None):
    if func is None:
        return partial(unpack_request)

    @wraps(func)
    async def inner(request, *args, **kwargs):
        req_args = (
            req_args_to_dict(request.get_args(keep_blank_values=True))
            if request.method != "POST"
            else {}
        )
        query_params = {
            key: req_args.pop(key)
            for key in list(req_args.keys())
            if key in QUERY_PARAM_READ_SCHEMA
        }

        req_body = request.json or {}
        return await func(
            request,
            req_args=req_args,
            req_body=req_body,
            query_params=query_params,
            *args,
            **kwargs
        )

    return inner
