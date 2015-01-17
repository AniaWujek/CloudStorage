from flask import Flask, jsonify, render_template, request
from flask.ext.sqlalchemy import SQLAlchemy
from add2 import add_file
from add2 import add_user
from add2 import list_users
from add2 import list_files
from security import logout
from security import login
from lib import csred

from create import db

app = Flask(__name__)
#app.config['SERVER_NAME']='192.168.18.119:5000'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///CS.db'

app.route('/addfile',methods=["POST"])(add_file)
app.route('/adduser',methods=["POST"])(add_user)
app.route('/login',methods=["POST"])(login)
app.route('/list_users')(list_users)
app.route('/list_files',methods=["POST"])(list_files)
app.route('/logout',methods=["POST"])(logout)

###########################
@app.route('/')
def index():
    return 'lubie ciastka!'


@app.route('/data')
def names():
    data = {"names": ["Johnson", "Jacob", "Julie", "Jennifer"]}
    return jsonify(data)

@app.route('/haslo')
def hasla():
    data = {"hasla": ["1234", "qwerty", "haslo", "olsah"]}
    return jsonify(data)

@app.route('/about')
def about():
    return render_template('about.html')

#######################
@app.before_first_request
def cokolwiek():
	db.create_all()

db.init_app(app)

if __name__=="__main__":
	app.run(host='0.0.0.0', debug=True)
