# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-01-29 16:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entity',
            name='name',
            field=models.CharField(db_index=True, max_length=255, verbose_name='entity'),
        ),
        migrations.AlterField(
            model_name='tag',
            name='name',
            field=models.CharField(db_index=True, max_length=255, verbose_name='tag'),
        ),
        migrations.AlterField(
            model_name='topic',
            name='name',
            field=models.CharField(db_index=True, max_length=255, verbose_name='topic'),
        ),
    ]