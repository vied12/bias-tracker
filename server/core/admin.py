from django.contrib import admin
from . import models


@admin.register(models.Media)
class MediaAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Source)
class SourceAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Text)
class TextAdmin(admin.ModelAdmin):
    pass
