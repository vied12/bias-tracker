# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-07 09:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_auto_20180130_1941'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='language',
            field=models.CharField(choices=[('en', 'en'), ('es', 'es'), ('fr', 'fr'), ('it', 'it')], db_index=True, max_length=128),
        ),
    ]
