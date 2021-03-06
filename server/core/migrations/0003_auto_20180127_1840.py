# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-01-27 18:40
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
import django_countries.fields


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20180127_1750'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='media',
            name='created_by',
        ),
        migrations.RenameField(
            model_name='source',
            old_name='created',
            new_name='added',
        ),
        migrations.RemoveField(
            model_name='source',
            name='media',
        ),
        migrations.RemoveField(
            model_name='text',
            name='body',
        ),
        migrations.RemoveField(
            model_name='text',
            name='body_en',
        ),
        migrations.RemoveField(
            model_name='text',
            name='title',
        ),
        migrations.AddField(
            model_name='source',
            name='country',
            field=django_countries.fields.CountryField(default='', max_length=2),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='source',
            name='language',
            field=models.CharField(choices=[('fr', 'fr'), ('en', 'en'), ('it', 'it')], default='', max_length=128),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='source',
            name='name',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='text',
            name='added',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='text',
            name='facebook_id',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='text',
            name='link',
            field=models.URLField(null=True),
        ),
        migrations.AddField(
            model_name='text',
            name='link_description',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='text',
            name='link_name',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='text',
            name='message',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='text',
            name='created',
            field=models.DateTimeField(),
        ),
        migrations.DeleteModel(
            name='Media',
        ),
    ]
