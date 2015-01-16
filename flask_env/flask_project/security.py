from flask import Flask
from flask import request
from flask import jsonify
from flask.ext.sqlalchemy import SQLAlchemy
import datetime
import time
import create
import bcrypt
from lib import csred

def login():
	#print "Login started"
	data = request.get_json(force=True)
	login = data["username"]
	print "Login " + login
	password = data["password"]
	print "Passwd: " + password
	user = create.User.query.filter_by(login=login).first()
	try:
		realpassword = user.md5
	except:
		print "-3: Bad login."
		return jsonify({"Status":"ERROR","ID":"-3"})
	print user.login
	print user.md5
	if check_password(str(password),str(realpassword)):#str(password) == str(realpassword):
		print "Password OK. Loggin in: " + user.login
		try:
			tk=csred.session_id(login)
			print "SID: " + str(tk)
			return jsonify({"Status":"OK","ID":tk})
		except:
			print "-2: ERROR:Cannot create session id."
			return jsonify({"Status":"ERROR","ID":"-2"})
	else:
		print "-1: Bad password."
		return jsonify({"Status":"ERROR","Info":"-1"})





def createmd5(password):
	hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
	return hashed


	
def check_password(given,hashed):
	if bcrypt.hashpw(given.encode("utf-8"), hashed) == hashed:
		print("Salted checkout positive.")
		return True
	else:
		print("Salted checkout negarive.")
		return False

