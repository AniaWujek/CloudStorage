#!/bin/bash
apt-get install redis-server redis-tools 
apt-get install python-dev libffi-dev
apt-get install virtualenvwrapper

export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Devel
export PIP_RESPECT_VIRTUALENV=true

source /usr/share/virtualenvwrapper/virtualenvwrapper.sh

#mkvirtualenv CS
#pip install -r req.txt
