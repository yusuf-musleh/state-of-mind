# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('som', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='node',
            name='doodle',
            field=models.URLField(max_length=10000, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='image',
            field=models.URLField(max_length=10000, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='text',
            field=models.CharField(max_length=10000, null=True),
        ),
    ]
