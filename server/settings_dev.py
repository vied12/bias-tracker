from settings import *
import os

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
MIDDLEWARE.append('middleware.dev_cors_middleware')

if os.environ.get('POSTGRES', False):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'bias',
            'USER': 'postgres',
            'PASSWORD': 'mysecretpassword',
            'HOST': '127.0.0.1',
            'PORT': '5432',
        }
    }


CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }
}
