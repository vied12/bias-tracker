# Bias Tracker

_Jan 2018_

The Bias Tracker automatically detects sentiment related to an entity — a person, place or thing — and then tracks that. Then, using small bar charts called “sparklines”, we are able to show how sentiment develops in articles that include that entity over time. Users can click on the charts to view individual Facebook posts and see the items as well as their sentiment scores.

The Bias Tracker is live at https://www.biastracker.io.

We're using Google Translate to translate the Facebook posts into English, OpenCalais to extract entities, and cjhutto's excellent VADER sentiment analysis (https://github.com/cjhutto/vaderSentiment) for Python to evaluate the texts.

As of 2 March 2018, we have successfully ingested and analyzed more than 57,000 Facebook posts related to the Italian general elections.

There's more background on the project here: https://medium.com/@dougiegyro/bias-tracker-understanding-sentiment-in-the-runup-to-the-italian-elections-ad390ced5d19

## Install the Backend

```bash
# creates a virtual environment
$ virtualenv env --python python3.6
# and loads it
$ source env/bin/activate
# installs python dependencies
$ pip install -r requirements-base.txt
# download the VADER lexicon
$ python -c "import nltk ; nltk.download('vader_lexicon')"
# creates and prepare the database
$ ./server/manage.py migrate
# adds a super user who is able to login to the admin interface
$ ./server/manage.py createsuperuser
```

This application requires environment variables :
- `FACEBOOK_APP_ID` To fetch posts
- `FACEBOOK_APP_SECRET`
- `OPEN_CALAIS_KEY` To extract entities
- `GOOGLE_KEY` to translate into english

Now you can start the backend

```bash
$ make runserver
```

And run the **job runner** which is responsible of all the time consuming tasks.

```bash
$ make worker
```

You can now connect to http://localhost:8000/admin/ and add your first `Source` (http://localhost:8000/admin/core/source/)

## Install the Frontend

```bash
$ yarn install
```

And launch it

```bash
$ yarn start
```
