# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-01-29 17:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_remove_text_created_by'),
    ]

    operations = [
        migrations.AlterField(
            model_name='text',
            name='link',
            field=models.URLField(max_length=500, null=True),
        ),
    ]
