# Generated by Django 3.0.3 on 2020-06-20 16:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sns', '0012_auto_20200620_1751'),
    ]

    operations = [
        migrations.CreateModel(
            name='LikeButtonModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('slug', models.SlugField()),
                ('body', models.TextField()),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('thumb', models.ImageField(blank=True, default='default.png', upload_to='')),
                ('like', models.ManyToManyField(blank=True, related_name='likes', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
