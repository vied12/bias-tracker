from django.core.management.base import BaseCommand
from core import models


class Command(BaseCommand):
    help = 'Collect Texts'

    def handle(self, *args, **options):
        for source in models.Source.objects.all():
            source.collect_texts()
        self.stdout.write(self.style.SUCCESS('done'))
