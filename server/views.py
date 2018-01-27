import logging

from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
import os
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
import re
from django.urls import reverse
import django.utils.html

keys = [
    '__OG_TITLE__',
    '__OG_TYPE__',
    '__OG_DESCRIPTION__',
    '__OG_IMAGE__',
    '__OG_IMAGE_WIDTH__',
    '__OG_IMAGE_HEIGHT__',
    '__OG_URL__',
]
initial = {key: '' for key in keys}


class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    @method_decorator(ensure_csrf_cookie)
    def get(self, request, **params):
        return get_template({
            '__OG_TITLE__': 'TITLE',
            '__OG_TYPE__': 'website',
            '__OG_URL__': request.build_absolute_uri(reverse('home')),
        })


def replace(text, strings):
    def clean(value):
        return django.utils.html.escape(value)
    strings = {**initial, **dict((re.escape(k), clean(v or '')) for k, v in strings.items())}
    pattern = re.compile('|'.join(strings.keys()))
    return pattern.sub(lambda m: strings[re.escape(m.group(0))], text)


def get_template(meta={}):
    try:
        with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
            if meta:
                template = replace(f.read(), meta)
            else:
                template = f.read()
            return HttpResponse(template)
    except OSError:
        logging.exception('Production build of app not found')
        return HttpResponse(
            """
            This URL is only used when you have built the production
            version of the app. Visit http://localhost:3000/ instead, or
            run `yarn run build` to test the production version.
            """,
            status=501,
        )
