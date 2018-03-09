# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-03-08 10:44
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('highlights', '0002_auto_20180216_0804'),
    ]

    operations = [
        migrations.CreateModel(
            name='HighlightedTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0)),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tags.Tag')),
            ],
            options={
                'ordering': ['order'],
                'verbose_name_plural': 'Highlighted Tags',
            },
        ),
    ]
