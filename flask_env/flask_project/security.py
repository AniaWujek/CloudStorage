from flask import Flask
from flask import request
from flask import jsonify
from flask.ext.sqlalchemy import SQLAlchemy
import datetime
import time
import create
from lib import csred

def login():
	print "Login started"
	data = request.get_json(force=True)
	login = data["username"]
	print "Login " + login
	password = data["password"]
	print "Passwd: " + password
	user = create.User.query.filter_by(login=login).first()
	realpassword = user.md5
	print user.login
	print user.md5
	if str(password) == str(realpassword):
		print "POPRAWNE HASLO. LOGUJE"
		try:
			tk=csred.session_id(login)
			print "SID: " + str(tk)
			return jsonify({"Status":"OK","Session_id":tk})
		except:
			print "ERROR:Cannot create session id."
			return jsonify({"Status":"ERROR"})
	else:
		print "Bledne haslo."
		return jsonify({"Status":"AUTHENTICATION FAILED"})
