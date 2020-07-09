# Generated by Django 3.0.3 on 2020-07-09 16:57

import accounts.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20200622_2326'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='icon_image',
            field=models.ImageField(blank=True, default='images/custom_user/icon_image/default_icon.png', null=True, upload_to=accounts.models.get_icon_image_path, verbose_name='アイコン画像'),
        ),
    ]
