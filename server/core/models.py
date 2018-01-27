from django.db import models
import django.contrib.auth
from django.utils import timezone
from django_countries.fields import CountryField


class Media(models.Model):
    # meta
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(django.contrib.auth.get_user_model(), blank=True, null=True)
    country = CountryField()
    language = models.CharField(max_length=128, choices=(('fr', 'fr'), ('en', 'en'), ('it', 'it')))
    # data
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Source(models.Model):
    # meta
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(django.contrib.auth.get_user_model(), blank=True, null=True)
    media = models.ForeignKey('Media')
    # data
    facebook_page_id = models.CharField(max_length=255)

    def __str__(self):
        return '{} {}'.format(self.media.name, self.facebook_page_id)


class Text(models.Model):
    # meta
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(django.contrib.auth.get_user_model(), blank=True, null=True)
    source = models.ForeignKey('Source')
    # data
    title = models.TextField()
    body = models.TextField()
    body_en = models.TextField()

    def __str__(self):
        return '{} {}'.format(self.source, self.title)
