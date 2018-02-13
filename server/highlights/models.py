from django.db import models


class HighlightedEntity(models.Model):
    entity = models.ForeignKey('tags.entity')
    order = models.PositiveIntegerField(default=0, blank=False, null=False)

    def __str__(self):
        return '{}'.format(self.entity)

    class Meta(object):
        ordering = ['order']
        verbose_name_plural = 'Highlighted Entities'
