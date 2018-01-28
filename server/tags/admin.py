from django.contrib import admin
from . import models


class BaseTag(admin.ModelAdmin):
    search_fields = ('name',)

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(models.Entity)
class EntityAdmin(BaseTag):
    readonly_fields = ('name', 'entity_type')


@admin.register(models.Topic)
class TopicAdmin(BaseTag):
    readonly_fields = ('name',)


@admin.register(models.Tag)
class TagAdmin(BaseTag):
    readonly_fields = ('name',)
