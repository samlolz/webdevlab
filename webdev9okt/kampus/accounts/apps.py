from django.apps import AppConfig


class Myproject1Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'

    def ready(self):
        from.import signals