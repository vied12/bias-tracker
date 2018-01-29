from django.db import models
import django.contrib.auth
from django.utils import timezone
from django_countries.fields import CountryField
from django.conf import settings
import requests


class Source(models.Model):
    # meta
    added = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(django.contrib.auth.get_user_model(), blank=True, null=True)
    # data
    name = models.CharField(max_length=255, verbose_name='source name')
    country = CountryField(db_index=True)
    language = models.CharField(max_length=128, choices=(('fr', 'fr'), ('en', 'en'), ('it', 'it')), db_index=True)
    facebook_page_id = models.CharField(max_length=255)

    def __str__(self):
        return '{}'.format(self.name)

    def collect_texts(self):
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
            .format(self.facebook_page_id, fields, access_token)

        def fetch_url(url, source, page_counter):
            req = requests.get(url).json()
            for post in req['data']:
                if not Text.objects.filter(facebook_id=post.get('id')):
                    text = Text(
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
                fetch_url(req['paging']['next'], source, page_counter - 1)

        fetch_url(first_url, self, settings.FB_PAGES_TO_FETCH)


class Text(models.Model):
    # meta
    added = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    source = models.ForeignKey('Source')
    # tags
    tags = models.ManyToManyField('tags.Tag')
    topics = models.ManyToManyField('tags.Topic')
    entities = models.ManyToManyField('tags.Entity')
    # data
    facebook_id = models.CharField(max_length=255, db_index=True)
    created = models.DateTimeField()
    message = models.TextField(null=True)
    link_description = models.TextField(null=True)
    link_name = models.TextField(null=True)
    link = models.URLField(max_length=500, null=True)

    def __str__(self):
        return '[{}] {}'.format(self.source, (self.message or '')[:50])

    def get_text(self):
        return ' '.join((_ for _ in (
            self.message,
            self.link_name,
            self.link_description,
        ) if _))


class SentimentReport(models.Model):
    # meta
    added = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    # data
    text = models.OneToOneField('Text')
    compound = models.FloatField()
    neg = models.FloatField()
    neu = models.FloatField()
    pos = models.FloatField()

    def __str__(self):
        return '{}: {}'.format(self.text, self.compound)
