from django.core.management.base import BaseCommand
from core import models, jobs


class Command(BaseCommand):
    help = 'Analyse sentiments for all texts'

    def handle(self, *args, **options):
        texts = models.Text.objects.filter(sentimentreport=None)
        for index, text in enumerate(texts):
            print('{}/{}'.format(index, texts.count()))
            jobs.sentiment(text.id)
        self.stdout.write(self.style.SUCCESS('done'))
