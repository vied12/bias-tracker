from django_rq import job
from core.models import Text, SentimentReport
from nltk.sentiment.vader import SentimentIntensityAnalyzer

sid = SentimentIntensityAnalyzer()


@job
def sentiment(text_id):
    text = Text.objects.get(pk=text_id)
    if text.is_translated and not SentimentReport.objects.filter(text=text).exists():
        body = text.get_text()
        obj = SentimentReport(
            text=text,
            **sid.polarity_scores(body),
        )
        obj.save()
