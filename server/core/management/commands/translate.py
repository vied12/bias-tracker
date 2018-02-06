from django.core.management.base import BaseCommand
from core import models, jobs


class Command(BaseCommand):
    help = 'Collect Texts'

    def handle(self, *args, **options):
        for index, text in enumerate(models.Text.objects.filter(is_translated=False)):
            self.stdout.write('{}/{} {}'.format(index, models.Text.objects.all().count(), text))
            jobs.translate(text.id)
        self.stdout.write(self.style.SUCCESS('done'))
