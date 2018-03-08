# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-03-07 17:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_source_is_enabled'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='text',
            options={'ordering': ('-created',)},
        ),
        migrations.AlterField(
            model_name='source',
            name='is_enabled',
            field=models.BooleanField(default=True, help_text='Enable the collect of the posts and display the source on the site', verbose_name='Show on the website'),
        ),
    ]
