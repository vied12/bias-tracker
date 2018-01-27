from django.contrib import admin
from . import models


@admin.register(models.Source)
class SourceAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Text)
class TextAdmin(admin.ModelAdmin):
    list_display = (
        'source',
        'added',
        'created',
        'message',
        'link_name',
    )
    list_filter = ('source__name',)
    date_hierarchy = 'created'
    search_fields = (
        'source',
        'message',
        'link_name',
        'link_description',
    )


@admin.register(models.SentimentReport)
class SentimentReportAdmin(admin.ModelAdmin):
    raw_id_fields = ('text', )
    list_display = (
        'text',
        'compound',
        'pos',
        'neu',
        'neg',
    )
    list_filter = ('text__source__name',)
    search_fields = (
        'text__source__name',
        'text',
    )
