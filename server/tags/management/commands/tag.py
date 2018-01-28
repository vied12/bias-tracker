from django.core.management.base import BaseCommand
from core.models import Text
from tags.models import Entity, Topic, Tag
import requests
import time
from django.conf import settings

calais_url = 'https://api.thomsonreuters.com/permid/calais'


class Command(BaseCommand):
    help = 'Tag Texts'

    def handle(self, *args, **options):
        texts = Text.objects.all()
        for index, text in enumerate(texts):
            if text.tags.count() > 0 or text.entities.count() > 0 or text.topics.count() > 0:
                continue
            print('{}/{}'.format(index, texts.count()))
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
                self.stdout.write(self.style.ERROR(response.text))
                continue
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
            for model, array in [[Topic, topics], [Tag, tags], [Entity, entities]]:
                for item in array:
                    obj, created = model.objects.get_or_create(**item)
                    getattr(text, model.text_set.field.attname).add(obj)
            time.sleep(1)
        self.stdout.write(self.style.SUCCESS('done'))
