from django.contrib import admin
from . import models
from adminsortable2.admin import SortableAdminMixin


@admin.register(models.HighlightedEntity)
class HighlightedEntityAdmin(SortableAdminMixin, admin.ModelAdmin):
    raw_id_fields = ('entity',)
