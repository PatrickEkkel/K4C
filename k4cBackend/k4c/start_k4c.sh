#!/bin/bash
python3 manage.py migrate --noinput && python manage.py runserver 0.0.0.0:8000

