from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'core'
    verbose_name = 'Bias Tracker'

    def ready(self):
        from . import signals  # noqa
