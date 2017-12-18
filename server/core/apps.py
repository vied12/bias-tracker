from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'core'
    verbose_name = 'sphere'

    def ready(self):
        from . import signals  # noqa
