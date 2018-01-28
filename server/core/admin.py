from django.contrib import admin
from . import models


@admin.register(models.Source)
class SourceAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Text)
class TextAdmin(admin.ModelAdmin):
    readonly_fields = (
        'source',
        'added',
        'created',
        'message',
        'created_by',
        'link',
        'link_name',
        'link_description',
        'facebook_id',
    )
    list_display = (
        'source',
        'added',
        'created',
        'message',
        'link_name',
    )
    list_filter = (
        'source__name',
        # 'entities__name',
        'topics__name',
        # 'tags__name',

    )
    date_hierarchy = 'created'
    search_fields = (
        'source',
        'message',
        'link_name',
        'link_description',
    )

    class TagsInline(admin.TabularInline):
        raw_id_fields = ('tag', )
        model = models.Text.tags.through
        extra = 0

    class EntitiesInline(admin.TabularInline):
        raw_id_fields = ('entity', )
        model = models.Text.entities.through
        extra = 0

    class TopicsInline(admin.TabularInline):
        raw_id_fields = ('topic', )
        model = models.Text.topics.through
        extra = 0

    class SentimentInline(admin.TabularInline):
        readonly_fields = ('added', 'compound', 'pos', 'neu', 'neg')
        model = models.SentimentReport
        extra = 0

    inlines = (SentimentInline, EntitiesInline, TopicsInline, TagsInline)
    exclude = ('tags', 'topics', 'entities')


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
    list_filter = (
        'text__source__name',
        'text__entities__name',
    )
    search_fields = (
        'text__source__name',
        'text__message',
        'text__topics__name',
        'text__entities__name',
        'text__tags__name',
    )
