# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-07 09:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_auto_20180207_0915'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='language',
            field=models.CharField(choices=[('de', 'de'), ('en', 'en'), ('es', 'es'), ('fr', 'fr'), ('it', 'it')], db_index=True, max_length=128),
        ),
    ]
