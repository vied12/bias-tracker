from django_rq import job
from core.models import Source, Text
from django.conf import settings
import requests


@job
def collect(source_id, force=False):
    source = Source.objects.get(pk=source_id)

    fields = [
        'link',
        'description',
        'message',
        'name',
        'created_time',
    ]
    req = requests.get('''
        https://graph.facebook.com/v2.11/oauth/access_token
        ?client_id={}
        &client_secret={}
        &grant_type=client_credentials
    '''.replace(' ', '')
        .replace('\n', '')
        .format(
            settings.FACEBOOK_APP_ID,
            settings.FACEBOOK_APP_SECRET
        )
    )
    assert req.status_code is 200, req.content
    access_token = req.json()['access_token']
    first_url = '''
        https://graph.facebook.com/v2.11/{}/feed
        ?pretty=0&fields={}&limit=100&access_token={}
    '''.replace(' ', '').replace('\n', '') \
        .format(source.facebook_page_id, fields, access_token)

    def fetch_url(url, source, page_counter):
        req = requests.get(url).json()
        for post in req['data']:
            if not Text.objects.filter(facebook_id=post.get('id')):
                if source.language == 'en':
                    content = dict(
                        link_description=post.get('description'),
                        link_name=post.get('name'),
                        message=post.get('message'),
                        is_translated=True,
                    )
                else:
                    content = dict(
                        original_link_description=post.get('description'),
                        original_link_name=post.get('name'),
                        original_message=post.get('message'),
                    )
                text = Text(
                    source=source,
                    facebook_id=post.get('id'),
                    created=post.get('created_time'),
                    link=post.get('link'),
                    **content,
                )
                text.save()
            else:
                if not force:
                    return
        if page_counter > 1:
            fetch_url(req['paging']['next'], source, page_counter - 1)

    fetch_url(first_url, source, settings.FB_PAGES_TO_FETCH)
