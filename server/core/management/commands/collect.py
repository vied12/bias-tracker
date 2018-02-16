from django.core.management.base import BaseCommand
from core import models, jobs


class Command(BaseCommand):
    help = 'Collect Texts'

    def add_arguments(self, parser):
        parser.add_argument('source_id', nargs='?', type=int)

    def handle(self, *args, **options):
        if options['source_id']:
            jobs.collect(options['source_id'], force=True)
        else:
            for index, source in enumerate(models.Source.objects.filter(is_enabled=True)):
                self.stdout.write('{}/{} {}'.format(index, models.Source.objects.all().count(), source))
                jobs.collect(source.id)
            self.stdout.write(self.style.SUCCESS('done'))
