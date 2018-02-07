from django.core.management.base import BaseCommand
from core.models import Text
from core import jobs


class Command(BaseCommand):
    help = 'Tag Texts'

    def handle(self, *args, **options):
        texts = Text.objects.filter(is_translated=True, tags=None, entities=None, topics=None)
        for index, text in enumerate(texts):
            print('{}/{}'.format(index, texts.count()))
            jobs.tag(text.id)
        self.stdout.write(self.style.SUCCESS('done'))
