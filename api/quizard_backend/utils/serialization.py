from cerberus import Validator

# from quizard_backend.utils.validation import schemas
from quizard_backend.schemas import schemas


def serialize_row(row, fields=None, allow_readonly=False):
    if not row:
        return {}

    model_name = row.__tablename__
    _dict = row.to_dict()
    _schema = schemas.get(model_name + "_read", {})
    if not fields:
        fields = set(_dict.keys())

    # Remove internal_id
    _dict.pop("internal_id", None)

    # Hide all properties with readonly=True
    return {
        key: val
        for key, val in _dict.items()
        if key in fields
        and (allow_readonly or not _schema.get(key, {}).get("readonly", False))
    }


def serialize_to_dict(payload, **kwargs):
    if isinstance(payload, list):
        return [serialize_row(item, **kwargs) for item in payload]
    return serialize_row(payload, **kwargs)
