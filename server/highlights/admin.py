from django.contrib import admin
from . import models
from adminsortable2.admin import SortableAdminMixin


@admin.register(models.HighlightedTag)
class HighlightedTagAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('tag', )
    raw_id_fields = ('tag', )
