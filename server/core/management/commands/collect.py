from django.core.management.base import BaseCommand
from core import models
from django.conf import settings
import requests

fields = [
    'link',
    'description',
    'message',
    'name',
    'created_time',
]
nb_page = 15  # one page = 100 items


class Command(BaseCommand):
    help = 'Collect Texts'

    def fetch_url(self, url, source, page_counter):
        print(source, page_counter)
        req = requests.get(url).json()
        for post in req['data']:
            if not models.Text.objects.filter(facebook_id=post.get('id')):
                text = models.Text(
                    source=source,
                    facebook_id=post.get('id'),
                    created=post.get('created_time'),
                    link_description=post.get('description'),
                    link_name=post.get('name'),
                    link=post.get('link'),
                    message=post.get('message'),
                )
                text.save()
            else:
                return
        if page_counter > 1:
            self.fetch_url(req['paging']['next'], source, page_counter - 1)

    def handle(self, *args, **options):
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
        for source in models.Source.objects.all():
            first_url = '''
                https://graph.facebook.com/v2.11/{}/feed
                ?pretty=0&fields={}&limit=100&access_token={}
            '''.replace(' ', '').replace('\n', '') \
                .format(source.facebook_page_id, fields, access_token)
            self.fetch_url(first_url, source, nb_page)
        self.stdout.write(self.style.SUCCESS('done'))
