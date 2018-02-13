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
from graphql_relay.node.node import from_global_id
import core.models
import tags.models

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

desc = '''Monitora il ‘sentiment’ di una testata giornalistica riguardo
uno specifico argomento. Vengono presi in esame i post
pubblicati da una testata sulla propria pagina social in un
certo arco di tempo.'''


class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    @method_decorator(ensure_csrf_cookie)
    def get(self, request, **params):
        return get_template({
            '__OG_TITLE__': 'BiasTracker',
            '__OG_DESCRIPTION__': desc,
            '__OG_TYPE__': 'website',
            '__OG_URL__': request.build_absolute_uri(reverse('home')),
        })


class SourceView(FrontendAppView):
    @method_decorator(ensure_csrf_cookie)
    def get(self, request, **params):
        source = core.models.Source.objects.get(pk=from_global_id(params['id'])[1])
        return get_template({
            '__OG_TITLE__': '{} | BiasTracker'.format(source.name),
            '__OG_DESCRIPTION__': desc,
            '__OG_TYPE__': 'website',
            '__OG_URL__': request.build_absolute_uri(reverse('source', kwargs={'id': params['id']})),
        })


class EntityView(FrontendAppView):
    @method_decorator(ensure_csrf_cookie)
    def get(self, request, **params):
        entity = tags.models.Entity.objects.get(pk=from_global_id(params['id'])[1])
        return get_template({
            '__OG_TITLE__': '{} | BiasTracker'.format(entity.name),
            '__OG_DESCRIPTION__': desc,
            '__OG_TYPE__': 'website',
            '__OG_URL__': request.build_absolute_uri(reverse('entity', kwargs={'id': params['id']})),
        })


class TagView(FrontendAppView):
    @method_decorator(ensure_csrf_cookie)
    def get(self, request, **params):
        tag = tags.models.Tag.objects.get(pk=from_global_id(params['id'])[1])
        return get_template({
            '__OG_TITLE__': '{} | BiasTracker'.format(tag.name),
            '__OG_DESCRIPTION__': desc,
            '__OG_TYPE__': 'website',
            '__OG_URL__': request.build_absolute_uri(reverse('tag', kwargs={'id': params['id']})),
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
