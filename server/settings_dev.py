from settings import *

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
MIDDLEWARE.append('middleware.dev_cors_middleware')
