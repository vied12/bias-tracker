from django.contrib import admin
from . import models


@admin.register(models.Source)
class SourceAdmin(admin.ModelAdmin):
    readonly_fields = (
        'added',
        'created_by',
    )
    list_display = (
        'name',
        'country',
        'language',
        'created_by',
        'text_count',
        'oldest_post',
        'is_enabled',
    )
    list_filter = (
        'is_enabled',
        'language',
    )

    def save_model(self, request, obj, form, change):
        user = request.user
        if not change or not obj.created_by:
            obj.created_by = user
        super(SourceAdmin, self).save_model(request, obj, form, change)

    def text_count(self, obj):
        return obj.text_set.count()

    def oldest_post(self, obj):
        try:
            return obj.text_set.all().order_by('created')[0].created
        except IndexError:
            return None


@admin.register(models.Text)
class TextAdmin(admin.ModelAdmin):
    readonly_fields = (
        'source',
        'added',
        'created',
        'message',
        'link',
        'link_name',
        'link_description',
        'is_translated',
        'original_message',
        'original_link_name',
        'original_link_description',
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

    )
    date_hierarchy = 'created'
    search_fields = (
        'id',
        'source__name',
        'message',
        'link_name',
        'link_description',
    )

    class TagsInline(admin.TabularInline):
        raw_id_fields = ('tag', )
        model = models.Text.tags.through
        extra = 0

    class SentimentInline(admin.TabularInline):
        readonly_fields = ('added', 'compound', 'pos', 'neu', 'neg')
        model = models.SentimentReport
        extra = 0

    inlines = (SentimentInline, TagsInline)
    exclude = ('tags',)


@admin.register(models.SentimentReport)
class SentimentReportAdmin(admin.ModelAdmin):
    readonly_fields = ('added',)
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
        'text__tags__name',
    )
    search_fields = (
        'text__source__name',
        'text__message',
        'text__tags__name',
    )
