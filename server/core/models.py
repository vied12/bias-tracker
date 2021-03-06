from django.db import models
import django.contrib.auth
from django.utils import timezone
from django_countries.fields import CountryField

LANGUAGES = (
    'de',
    'en',
    'es',
    'fr',
    'it',
)


class Source(models.Model):
    # meta
    added = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(django.contrib.auth.get_user_model(), models.CASCADE, blank=True, null=True)
    # data
    name = models.CharField(max_length=255, verbose_name='source name')
    country = CountryField(db_index=True)
    language = models.CharField(max_length=128, choices=((_, _) for _ in LANGUAGES), db_index=True)
    facebook_page_id = models.CharField(max_length=255)
    url = models.URLField('url of the media', null=True)
    is_enabled = models.BooleanField(
        'Show on the website',
        help_text='Enable the collect of the posts and display the source on the site',
        default=True
    )

    def __str__(self):
        return '{}'.format(self.name)


class Text(models.Model):
    # meta
    added = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    source = models.ForeignKey('Source', on_delete=models.CASCADE)
    created = models.DateTimeField()
    facebook_id = models.CharField(max_length=255, db_index=True)
    # tags
    tags = models.ManyToManyField('tags.Tag')
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

    class Meta:
        ordering = ('-created',)


class SentimentReport(models.Model):
    # meta
    added = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    # data
    text = models.OneToOneField('Text', models.CASCADE)
    compound = models.FloatField()
    neg = models.FloatField()
    neu = models.FloatField()
    pos = models.FloatField()

    class Meta:
        ordering = ('text__created',)

    def __str__(self):
        return '{}: {}'.format(self.text, self.compound)
