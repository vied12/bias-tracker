release: python server/manage.py migrate
web: gunicorn wsgi --chdir server/ --log-file -
