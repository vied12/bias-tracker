from django.db.models.signals import post_save
from django.dispatch import receiver
from . import models
from core import jobs


@receiver(post_save, sender=models.Source)
def post_source_save(sender, instance, **kwargs):
    jobs.collect_texts_for_source.delay(instance)


@receiver(post_save, sender=models.Text)
def post_text_save(sender, instance, **kwargs):
    jobs.extract_entities_for_text.delay(instance.pk)
    jobs.sentiment_for_text.delay(instance.pk)
