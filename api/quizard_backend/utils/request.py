def req_args_to_dict(args: dict):
    if not args:
        return {}
    return {key: val[-1] for key, val in args.items()}
