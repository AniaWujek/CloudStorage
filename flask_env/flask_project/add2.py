from flask import Flask
from flask import request
from flask import jsonify
from flask.ext.sqlalchemy import SQLAlchemy
from security import createmd5
import datetime
import time
import create
from lib import csred

def add_user():#username, md5):
	
	
	json = request.get_json(force=True)
	md5=createmd5(json["password"])
	user = create.User(json["username"],md5)#json["password"])

	create.db.session.add(user)
	try:
		create.db.session.commit()
		return jsonify({"Status":"OK"})
	except:
		print "ERROR:Cannot commit changes. Mayby user already exists?"
		return jsonify({"Status":"ERROR","ID":"-1"})





def list_users():
	list=create.User.query.all()
	return str(e.login for e in list)






def list_files():
	json = request.get_json(force=True)
	#SID checkout

	print csred.get_SID(json["username"])
	try:
		if str(json["SID"]) != str(csred.get_SID(json["username"])):
			print "Bad SID"
			return jsonify({"Status":"ERROR","ID":"-2"})
	except:
		print "R base error."
		return jsonify({"Status":"ERROR","ID":"-3"})
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
		else:
			names+=";"+str(row.name)
			sizes+=";"+str(row.size)
			edit_dates+=";"+str(row.edit_date)
			versions+=";"+str(row.version)
		i+=1
	print list
	return jsonify({"Status":"OK","names":names,"sizes":sizes,"edit_dates":edit_dates,"versions":versions})

	








def add_file():#filename, year, month, day, version, size, username):

	json = request.get_json(force=True)
	print json["username"] + " " + json["filename"] + " " + json["size"]  + " " +json["SID"]
#SID checkout

	print csred.get_SID(json["username"])
	try:
		if str(json["SID"]) != str(csred.get_SID(json["username"])):
			print "Bad SID"
			return jsonify({"Status":"ERROR","ID":"-2"})
	except:
		print "R base error."
		return jsonify({"Status":"ERROR","ID":"-3"})
#SID checkout positive
	user = create.User.query.filter_by(login=json["username"]).first()
	ver=1
	try:
		oldfile = create.File.query.filter_by(name=json["filename"]).all()
		for row in oldfile:
			if row.version>(ver-1):
				ver=row.version+1
		
	except:
		print "creating new file..."
	file = create.File(json["filename"], datetime.datetime.now(), ver, json["size"], user)

	create.db.session.add(file)
	try:
		create.db.session.commit()
		token = csred.token(json["username"],json["filename"])
		return jsonify({"Status":"OK","Token":token})
	except:
		print "ERROR:Cannot commit changes. Mayby file already exists?"
		return jsonify({"Status":"ERROR","ID":"-1"})





def delete_file():#filename, year, month, day, version, size, username):

	json = request.get_json(force=True)
	print json["username"] + " " + json["filename"] + " " + json["size"]  + " " +json["SID"]
#SID checkout

	print csred.get_SID(json["username"])
	try:
		if str(json["SID"]) != str(csred.get_SID(json["username"])):
			print "Bad SID"
			return jsonify({"Status":"ERROR","ID":"-2"})
	except:
		print "R base error."
		return jsonify({"Status":"ERROR","ID":"-3"})
#SID checkout positive
	user = create.User.query.filter_by(login=json["username"]).first()
	ver=1
	try:
		oldfile = create.User.query.filter_by(filename=json["filename"], username=json["username"]).first()
	except:
		print "No such file"
		return jsonify({"Status":"ERROR","ID":"-2"})

	create.db.session.delete(oldfile)
	try:
		create.db.session.commit()
		return jsonify({"Status":"OK"})
	except:
		print "ERROR:Cannot commit changes. Mayby file already exists?"
		return jsonify({"Status":"ERROR","ID":"-1"})
