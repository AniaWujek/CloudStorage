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
		return jsonify({"Status":"ERROR","ID":"-3"}),401
	print user.login
	print user.md5
	if check_password(str(password),str(realpassword)):#str(password) == str(realpassword):
		print "Password OK. Loggin in: " + user.login
		try:
			tk=csred.session_id(login)
			print "SID: " + str(tk)
			return jsonify({"Status":"OK","ID":str(tk)})
		except:
			print "-2: ERROR:Cannot create session id."
			return jsonify({"Status":"ERROR","ID":"-2"}),500
	else:
		print "-1: Bad password."
		return jsonify({"Status":"ERROR","ID":"-1"}),401
##############################################################


def createmd5(password):
	hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
	return hashed
##############################################################


	
def check_password(given,hashed):
	try: 
		positive = bcrypt.hashpw(given.encode("utf-8"), hashed)
	except:
		print("Cannot check salt.")
		return False
		
	if positive == hashed:
		print("Salted checkout positive.")
		return True
	else:
		print("Salted checkout negative.")
		return False
##############################################################

def check_sid():
	json = request.get_json(force=True)
	username = json["username"] 
	sid = json["SID"]
	print "checkin if SID is actual" + " " + username + " " + sid
	correct = csred.get_SID(username)
	if str(correct) == str(sid):
		return jsonify({"Status":"OK"})
	else:
		return jsonify({"Status":"ERROR"}),410
