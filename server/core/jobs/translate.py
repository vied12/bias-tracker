from django_rq import job
from core.models import Text
from google.cloud import translate
import os
import json
from google.oauth2 import service_account

KEY = json.loads(os.environ.get('GOOGLE_KEY'))
credentials = service_account.Credentials.from_service_account_info(KEY)
translate_client = translate.Client(credentials=credentials)

# The target language
target = 'en'

FIELDS = [
    'message',
    'link_name',
    'link_description',
]


@job
def translate(text_id):
    text = Text.objects.get(pk=text_id)
    if text.source.language != 'en' and not text.is_translated:
        translation = translate_client.translate(
            [
                (getattr(text, 'original_' + field) or '').encode('utf8')
                for field in FIELDS
            ],
            source_language=text.source.language,
            target_language=target)
        for index, field in enumerate(FIELDS):
            if getattr(text, 'original_' + field):
                setattr(text, field, translation[index]['translatedText'])
            text.is_translated = True
            text.save()
