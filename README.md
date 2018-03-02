# Bias Tracker

_Jan 2018_

The Bias Tracker automatically detects sentiment related to an entity — a person, place or thing — and then tracks that. Then, using small bar charts called “sparklines,” we are able to show how sentiment develops in articles that include that entity over time. Users can click on the charts to view individual Facebook posts and see the items as well as their sentiment scores.

The Bias Tracker is live at http://www.biastracker.io.

We're using Google Translate to translate the Facebook posts into English, OpenCalais to extract entities, and cjhutto's excellent VADER sentiment analysis (https://github.com/cjhutto/vaderSentiment) for Python to evaluate the texts.

As of 2 March 2018, we have successfully ingested and analyzed more than 57,000 Facebook posts related to the Italian general elections.

There's more background on the project here: https://medium.com/@dougiegyro/bias-tracker-understanding-sentiment-in-the-runup-to-the-italian-elections-ad390ced5d19

## Install

```bash
$ make install
```

## Run

```bash
$ make runserver
$ yarn start
```
