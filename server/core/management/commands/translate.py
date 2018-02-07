from django.core.management.base import BaseCommand
from core import models, jobs


class Command(BaseCommand):
    help = 'Collect Texts'

    def handle(self, *args, **options):
        query = models.Text.objects.filter(is_translated=False)
        for index, text in enumerate(query):
            self.stdout.write('{}/{} {}'.format(index, query.count(), text))
            jobs.translate(text.id)
        self.stdout.write(self.style.SUCCESS('done'))
