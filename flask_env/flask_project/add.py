from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import datetime


import create


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///CS.db'
db = SQLAlchemy(app)

#user = create.User('Kasia','g587gy59rh8g54hgh9')
#file = create.File("Hell Is for Wimps",                  datetime.date(1990,07,31),1, 15050, user)

user = create.User('Ania','g4sare9646se4g68e4r6rgs4ght86sr')
file = create.File("Hell Is for Wimps",                  datetime.date(1990,07,31),1, 15050, user)

db.session.add(user)
db.session.add(file)
try:
	db.session.commit()
except:
	print "Cannot commit changes. Mayby user/file already exists?"
