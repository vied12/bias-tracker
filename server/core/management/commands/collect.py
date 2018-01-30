from django.core.management.base import BaseCommand
from core import models, jobs


class Command(BaseCommand):
    help = 'Collect Texts'

    def handle(self, *args, **options):
        for index, source in enumerate(models.Source.objects.all()):
            self.stdout.write('{}/{} {}'.format(index, models.Source.objects.all().count(), source))
            jobs.collect(source.id)
        self.stdout.write(self.style.SUCCESS('done'))
