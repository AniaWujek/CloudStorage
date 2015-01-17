from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import UniqueConstraint

db = SQLAlchemy()

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	login = db.Column(db.String(80), unique=True)
	md5 = db.Column(db.String(120))

	def __init__(self, login, md5):
		self.login = login
		self.md5 = md5

	def __repr__(self):
		return '<Login %r>' % self.login

class File(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(80))
	edit_date = db.Column(db.DateTime)
	version = db.Column(db.Integer)
	size = db.Column(db.Integer)

	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	user = db.relationship('User',
		backref=db.backref('files', lazy='dynamic'))

	__table_args__ = (UniqueConstraint('name', 'user_id', 'version', name='_name_user_version_uc'),)

	def __init__(self, name, edit_date, version, size, user):
		self.name = name
		self.edit_date = edit_date
		self.version = version
		self.size = size
		self.user = user

	def __repr__(self):
		return '<Name %r>' % self.name


