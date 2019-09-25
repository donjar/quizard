from urllib.parse import urlencode, urlparse, parse_qs


def generate_pagination_links(url, data_list):
    if not data_list:
        return {}
    url_components = urlparse(url)
    original_params = parse_qs(url_components.query)

    merged_params = {**original_params, "after_id": data_list[-1]["id"]}
    updated_query = urlencode(merged_params, doseq=True)
    return {"next": url_components._replace(query=updated_query).geturl()}
