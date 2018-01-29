from django.db import models


class Entity(models.Model):
    name = models.CharField(max_length=255, db_index=True, verbose_name='entity')
    entity_type = models.CharField(max_length=255, db_index=True)

    class Meta:
        verbose_name_plural = 'Entities'

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=255, db_index=True, verbose_name='tag')

    def __str__(self):
        return self.name


class Topic(models.Model):
    name = models.CharField(max_length=255, db_index=True, verbose_name='topic')

    def __str__(self):
        return self.name
