from flask import Flask
from flask import request
from flask import jsonify
from flask.ext.sqlalchemy import SQLAlchemy
from security import createmd5
import datetime
import time
import create
from security import login
from lib import csred

def add_user():#username, md5):
	
	
	json = request.get_json(force=True)
	md5=createmd5(json["password"])
	user = create.User(json["username"],md5)#json["password"])
	print "Adding user " + json["username"] + " " + json["password"]
	create.db.session.add(user)
	try:
		create.db.session.commit()
		#return login()
		return jsonify({"Status":"OK"})
	except:
		print "ERROR:Cannot commit changes. Mayby user already exists?"
		return jsonify({"Status":"ERROR","ID":"-1"}),409





##############################################################


def delete_user():#filename, year, month, day, version, size, username):

	json = request.get_json(force=True)
	print "Remove user " + json["username"] + " " + json["SID"]
#SID checkout

	print csred.get_SID(json["username"])
	try:
		if str(json["SID"]) != str(csred.get_SID(json["username"])):
			print "Bad SID"
			return jsonify({"Status":"ERROR","ID":"-2"}),401
	except:
		print "R base error."
		return jsonify({"Status":"ERROR","ID":"-3"}),500
#SID checkout positive
	csred.logout(json["username"],json["SID"])
	user = create.User.query.filter_by(login=json["username"]).first()
	try:
		oldfile = create.File.query.filter_by(user_id=user.id).all()
		for row in oldfile:
			create.db.session.delete(row)
			create.db.session.commit()
	except:
		print "Error choosing files."
	create.db.session.delete(user)
	try:
		create.db.session.commit()
		return jsonify({"Status":"OK"})
	except:
		print "ERROR:Cannot commit changes."
		return jsonify({"Status":"ERROR","ID":"-1"}),409


##############################################################



def list_users():
	list=create.User.query.all()
	return str(e.login for e in list)


##############################################################




def list_files():
	json = request.get_json(force=True)
	#SID checkout

	print "Listing files "# + str(csred.get_SID(json["username"]))
	try:
		if str(json["SID"]) != str(csred.get_SID(json["username"])):
			print "Bad SID"
			return jsonify({"Status":"ERROR","ID":"-2"}),401
	except:
		print "R base error."
		return jsonify({"Status":"ERROR","ID":"-3"}),500
#SID checkout positive

	user = create.User.query.filter_by(login=json["username"]).first().id
	files=create.File.query.filter_by(user_id=user).all()
	#print files
	i=1
	for row in files:
		if i==1:
			names=str(row.name)
			sizes=str(row.size)
			edit_dates=str(row.edit_date)
			versions=str(row.version)
			if row.upload==1:
				uploads="Ready"
			else:
				uploads="Uploading..."
		else:
			names+=";"+str(row.name)
			sizes+=";"+str(row.size)
			edit_dates+=";"+str(row.edit_date)
			versions+=";"+str(row.version)
			if row.upload==1:
				uploads+=";Ready"
			else:
				uploads+=";Uploading..."
		i+=1
	print list
	return jsonify({"Status":"OK","names":names,"sizes":sizes,"edit_dates":edit_dates,"versions":versions,"uploads":uploads})

##############################################################


def delete_uploaded(username):#filename, year, month, day, version, size, username):

	user = create.User.query.filter_by(login=json["username"]).first()
	try:
		oldfile = create.File.query.filter_by(user_id=user.id, upload=0).all()
		for row in oldfile:
			create.db.session.delete(row)
			create.db.session.commit()
	except:
		print "Error choosing files."
		return False
	return True
##############################################################


def add_token_download():
	json = request.get_json(force=True)
#SID checkout

	print csred.get_SID(json["username"])
	try:
		if str(json["SID"]) != str(csred.get_SID(json["username"])):
			print "Bad SID"
			return jsonify({"Status":"ERROR","ID":"-2"}),401
	except:
		print "R base error."
		return jsonify({"Status":"ERROR","ID":"-3"}),500
#SID checkout
	user = create.User.query.filter_by(login=json["username"]).first()
	try:
		oldfile = create.File.query.filter_by(name=json["filename"], status=0, user=user).first()
	except:
		print "Error processing file row!"
		return jsonify({"Status":"ERROR","ID":"-4"}),500
	token = csred.token(json["username"],json["filename"],json["version"])
		#print file.id
	#if token[0]==1
	#	return jsonify({"Status":"ERROR","ID":"-5"}),500
	return jsonify({"Status":"OK","Token":token[1],"Existed":token[0],"Version":ver,"ID":file.id})
	
##############################################################


def add_token_upload():

	json = request.get_json(force=True)
	try:
		print "Add file " + json["username"] + " " + json["filename"] + " " + json["size"]  + " " +json["SID"]
	except:
		print "Bad json data."
		return jsonify({"Status":"ERROR","ID":"-4"}),406
		
#SID checkout

	print csred.get_SID(json["username"])
	try:
		if str(json["SID"]) != str(csred.get_SID(json["username"])):
			print "Bad SID"
			return jsonify({"Status":"ERROR","ID":"-2"}),401
	except:
		print "R base error."
		return jsonify({"Status":"ERROR","ID":"-3"}),500
#SID checkout positive
	user = create.User.query.filter_by(login=json["username"]).first()
	ver=1
	try:
		oldfile = create.File.query.filter_by(name=json["filename"], user=user).all()
		for row in oldfile:
			if row.version>(ver-1):
				ver=row.version+1
		
	except:
		print "creating new file..."
	file = create.File(json["filename"], datetime.datetime.now(), ver, json["size"],0, user)

	create.db.session.add(file)
	try:
		create.db.session.commit()
		print "FILE_TOKEN UNDER: " + str(json["username"]) + ":" + str(json["filename"]) + ":" + str(ver)
		token = csred.token(json["username"],json["filename"],ver)
		#print file.id
		return jsonify({"Status":"OK","Token":token[1],"Existed":token[0],"Version":ver,"ID":file.id})
	except:
		print "ERROR:Cannot commit changes. Mayby file already exists?"
		return jsonify({"Status":"ERROR","ID":"-1"}),409


##############################################################

def add_file():#filename, year, month, day, version, size, username):

	json = request.get_json(force=True)
	try:
		print "Add file " + json["username"] + " " + json["filename"] + " " + json["size"] + " " + json["version"]  + " " +json["SID"]
	except:
		print "Bad json data."
		return jsonify({"Status":"ERROR","ID":"-4"}),406
		
#SID checkout

	print csred.get_SID(json["username"])
	try:
		if str(json["SID"]) != str(csred.get_SID(json["username"])):
			print "Bad SID"
			return jsonify({"Status":"ERROR","ID":"-2"}),401
	except:
		print "R base error."
		return jsonify({"Status":"ERROR","ID":"-3"}),500
#SID checkout positive
	user = create.User.query.filter_by(login=json["username"]).first()
	print "User checked." + str(user.login)
	try:
		oldfile = create.File.query.filter_by(name=json["filename"], upload=0, version=json["version"], user=user).update(dict(upload=1))
		#oldfile.upload=1
		
	except:
		print "Error processing file row!"
		return jsonify({"Status":"ERROR","ID":"-5"}),409
	

	try:
		create.db.session.commit()
		print "FILE_TOKEN UNDER: " + str(json["username"]) + ":" + str(json["filename"]) + ":" + str(json["version"])
		token = csred.rmtoken(json["username"],json["filename"],json["version"])
		#print file.id
		return jsonify({"Status":"OK"})
	except:
		print "ERROR:Cannot commit changes. Mayby file already exists?"
		return jsonify({"Status":"ERROR","ID":"-1"}),409

##############################################################



def delete_file():#filename, year, month, day, version, size, username):

	json = request.get_json(force=True)
	print "Remove file " + json["username"] + " " + json["filename"] + " " +json["SID"] + " " + json["version"] 
#SID checkout

	print csred.get_SID(json["username"])
	try:
		if str(json["SID"]) != str(csred.get_SID(json["username"])):
			print "Bad SID"
			return jsonify({"Status":"ERROR","ID":"-2"}),401
	except:
		print "R base error."
		return jsonify({"Status":"ERROR","ID":"-3"}),500
#SID checkout positive
	user = create.User.query.filter_by(login=json["username"]).first()
	try:
		oldfile = create.File.query.filter_by(name=json["filename"],version=json["version"],user=user).first()
	except:
		print "No such file"
		return jsonify({"Status":"ERROR","ID":"-2"}),410

	create.db.session.delete(oldfile)
	try:
		create.db.session.commit()
		return jsonify({"Status":"OK"})
	except:
		print "ERROR:Cannot commit changes. Mayby file doesn't exist any more?"
		return jsonify({"Status":"ERROR","ID":"-1"}),409
##############################################################



def logout():
	json = request.get_json(force=True)
	print "Logout " + json["username"] + " " + json["SID"]
	print str(csred.get_SID(json["username"]))
#SID checkout

	print csred.get_SID(json["username"])
	try:
		if str(json["SID"]) != str(csred.get_SID(json["username"])):
			print "Bad SID"
			return jsonify({"Status":"ERROR","ID":"-2"}),401
	except:
		print "R base error."
		return jsonify({"Status":"ERROR","ID":"-3"}),500
#SID checkout positive
	delete_uploaded(json["username"])
	if csred.logout(json["username"],json["SID"]):
		return jsonify({"Status":"OK"})
	else:
		return jsonify({"Status":"ERROR","ID":"-1"}),410
