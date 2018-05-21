MANAGE = ./server/manage.py

install:
	virtualenv env --python python3
	. env/bin/activate ; pip install -r requirements.txt
	yarn install

run: redis runserver

redis:
	docker run --rm -p 6379:6379 -d redis

runserver:
	$(MANAGE) runserver

makemigrations:
	$(MANAGE) makemigrations

shell:
	$(MANAGE) shell

worker:
	$(MANAGE) rqworker high default

migrate:
	$(MANAGE) migrate

graphql_schema:
	$(MANAGE) export_schema > ./client/src/utils/fragmentMatcher/data.json

backup_db:
	-cp server/db.sqlite3 server/db`date +'%y.%m.%d-%H:%M:%S'`.sqlite3

load_prod: backup_db
	-rm server/db.sqlite3
	heroku run $(MANAGE) dumpdata --natural-primary --natural-foreign -- > dump.json
	python server/manage.py migrate --noinput
	HAYSTACK_SIGNAL_PROCESSOR=haystack.signals.BaseSignalProcessor python server/manage.py loaddata dump.json
	rm dump.json
