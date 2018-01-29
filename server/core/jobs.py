from django_rq import job
import requests
from core.models import Text, SentimentReport
from tags.models import Entity, Topic, Tag
from django.conf import settings
from nltk.sentiment.vader import SentimentIntensityAnalyzer

sid = SentimentIntensityAnalyzer()
calais_url = 'https://api.thomsonreuters.com/permid/calais'


@job
def collect_texts_for_source(source):
    source.collect_texts()


@job
def sentiment_for_text(text_id):
    text = Text.objects.get(pk=text_id)
    body = text.get_text()
    sentiment = SentimentReport(
        text=text,
        **sid.polarity_scores(body),
    )
    sentiment.save()


@job
def extract_entities_for_text(text_id):
    text = Text.objects.get(pk=text_id)
    if text.tags.count() > 0 or text.entities.count() > 0 or text.topics.count() > 0:
        return
    response = requests.post(
        calais_url,
        data=text.get_text().encode('utf-8'),
        headers={
            'X-AG-Access-Token': settings.OPEN_CALAIS_KEY,
            'Content-Type': 'text/raw',
            'outputformat': 'application/json'
        },
        timeout=80,
    )
    if response.status_code != 200:
        raise Exception(response.text)
    response = response.json()
    topics = [
        {
            'name': _['name'],
        }
        for _ in response.values() if _.get('_typeGroup') == 'topics'
        # and _['forenduserdisplay'] == 'true'
        and _['score'] > 0.8
    ]
    tags = [
        {
            'name': _['name'],
        }
        for _ in response.values() if _.get('_typeGroup') == 'socialTag'
        and _['forenduserdisplay'] == 'true'
        and _['importance'] == '1'
    ]
    entities = [
        {
            'name': _['name'],
            'entity_type': _['_type'],
        }
        for _ in response.values() if _.get('_typeGroup') == 'entities'
        and _['forenduserdisplay'] == 'true'
    ]
    for model, array in (
        (Topic, topics),
        (Tag, tags),
        (Entity, entities),
    ):
        for item in array:
            obj, created = model.objects.get_or_create(**item)
            getattr(text, model.text_set.field.attname).add(obj)
