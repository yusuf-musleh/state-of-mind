# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Node',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.CharField(max_length=10000)),
                ('image', models.URLField(max_length=10000)),
                ('doodle', models.URLField(max_length=10000)),
                ('parent', models.ForeignKey(related_name='node_parent', blank=True, to='som.Node', null=True)),
            ],
        ),
    ]
