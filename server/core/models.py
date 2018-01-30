from django.db import models
import django.contrib.auth
from django.utils import timezone
from django_countries.fields import CountryField


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


class Text(models.Model):
    # meta
    added = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    source = models.ForeignKey('Source')
    created = models.DateTimeField()
    facebook_id = models.CharField(max_length=255, db_index=True)
    # tags
    tags = models.ManyToManyField('tags.Tag')
    topics = models.ManyToManyField('tags.Topic')
    entities = models.ManyToManyField('tags.Entity')
    # data
    message = models.TextField(null=True)
    link_description = models.TextField(null=True)
    link_name = models.TextField(null=True)
    original_message = models.TextField(null=True)
    original_link_description = models.TextField(null=True)
    original_link_name = models.TextField(null=True)
    link = models.URLField(max_length=500, null=True)
    is_translated = models.BooleanField(default=False)

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
