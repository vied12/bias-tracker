from django.contrib import admin
from . import models
from django.db.models import Count


class BaseTag(admin.ModelAdmin):
    search_fields = ('name',)

    def get_ordering(self, request):
        return ('-text_count',)

    def get_queryset(self, request):
        qs = super(BaseTag, self).get_queryset(request)
        qs = qs.annotate(text_count=Count('text', distinct=True))
        qs = qs.annotate(source_count=Count('text__source', distinct=True))
        return qs

    def text_count(self, obj):
        return obj.text_count
    text_count.admin_order_field = 'text_count'

    def source_count(self, obj):
        return obj.source_count
    source_count.admin_order_field = 'source_count'


@admin.register(models.Tag)
class TagAdmin(BaseTag):
    list_display = (
        'name',
        'tag_type',
        'entity_type',
        'text_count',
        'source_count',
        'hide',
    )
    list_filter = (
        'tag_type',
        'hide',
    )
