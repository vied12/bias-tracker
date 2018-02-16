# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-13 13:10
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('tags', '0003_auto_20180129_2224'),
    ]

    operations = [
        migrations.CreateModel(
            name='HighlightedEntity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0)),
                ('entity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tags.Entity')),
            ],
            options={
                'ordering': ['order'],
            },
        ),
    ]