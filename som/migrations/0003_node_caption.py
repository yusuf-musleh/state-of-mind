# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('som', '0002_auto_20160122_1634'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='caption',
            field=models.CharField(max_length=10000, null=True),
        ),
    ]
