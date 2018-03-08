from django.db import models


class HighlightedTag(models.Model):
    tag = models.ForeignKey('tags.tag')
    order = models.PositiveIntegerField(default=0, blank=False, null=False)

    def __str__(self):
        return '{}'.format(self.tag)

    class Meta(object):
        ordering = ['order']
        verbose_name_plural = 'Highlighted Tags'
