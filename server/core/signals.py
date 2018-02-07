from django.db.models.signals import post_save
from django.dispatch import receiver
from . import models
from core import jobs
from utils import disable_for_loaddata


@receiver(post_save, sender=models.Source)
@disable_for_loaddata
def post_source_save(sender, instance, **kwargs):
    jobs.collect.delay(instance.pk)


@receiver(post_save, sender=models.Text)
@disable_for_loaddata
def post_text_save(sender, instance, **kwargs):
    if instance.is_translated:
        jobs.tag.delay(instance.pk)
        jobs.sentiment.delay(instance.pk)
    else:
        jobs.translate.delay(instance.pk)
