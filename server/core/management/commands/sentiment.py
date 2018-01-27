from django.core.management.base import BaseCommand
from core import models
from nltk.sentiment.vader import SentimentIntensityAnalyzer

sid = SentimentIntensityAnalyzer()

fields = [
    'link',
    'description',
    'message',
    'name',
    'created_time',
]
nb_page = 50


class Command(BaseCommand):
    help = 'Collect Texts'

    def handle(self, *args, **options):
        texts = models.Text.objects.filter(sentimentreport=None)
        for index, text in enumerate(texts):
            print('{}/{}'.format(index, texts.count()))
            body = text.get_text()
            sentiment = models.SentimentReport(
                text=text,
                **sid.polarity_scores(body),
            )
            sentiment.save()
        self.stdout.write(self.style.SUCCESS('done'))
