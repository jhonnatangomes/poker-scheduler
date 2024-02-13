#!/bin/sh

if [ "$1" = "cron" ]; then
  supercronic worker/crontab
else 
  npm run start
fi
