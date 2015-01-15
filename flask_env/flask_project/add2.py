from flask import Flask
from flask import request
from flask import jsonify
from flask.ext.sqlalchemy import SQLAlchemy
import datetime
import time
import create

def add_user():#username, md5):
	
	#print request.json
	json=request.json
	
	user = create.User(json["username"],json["password"])

	create.db.session.add(user)
	try:
		create.db.session.commit()
		return jsonify({"Status":"OK"})
	except:
		print "ERROR:Cannot commit changes. Mayby user already exists?"
		return jsonify({"Status":"ERROR"})

def list_users():
	list=create.User.query.all()
	return str(e.login for e in list)

def add_file():#filename, year, month, day, version, size, username):

	
	json=request.json

	user = create.User.query.filter_by(login=json["username"]).first()
	file = create.File(json["filename"], datetime.datetime.now(), json["version"], json["size"], user)

	create.db.session.add(file)
	try:
		create.db.session.commit()
		return jsonify({"Status":"OK"})
	except:
		print "ERROR:Cannot commit changes. Mayby file already exists?"
		return jsonify({"Status":"ERROR"})
