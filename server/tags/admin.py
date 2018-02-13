from django.contrib import admin
from . import models
from django.db.models import Count


class BaseTag(admin.ModelAdmin):
    search_fields = ('name',)

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

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


@admin.register(models.Entity)
class EntityAdmin(BaseTag):
    list_display = (
        'name',
        'entity_type',
        'text_count',
        'source_count',
    )
    readonly_fields = ('name', 'entity_type')
    list_filter = ('entity_type',)


@admin.register(models.Topic)
class TopicAdmin(BaseTag):
    readonly_fields = ('name',)


@admin.register(models.Tag)
class TagAdmin(BaseTag):
    readonly_fields = ('name',)
    list_display = (
        'name',
        'text_count',
        'source_count',
    )
