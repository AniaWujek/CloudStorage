from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from add2 import add_file
from add2 import add_user
from add2 import list_users
from lib import csred

from create import db

app = Flask(__name__)
app.config['SERVER_NAME'] = '127.0.0.1:8080'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///CS.db'

app.route('/addfile',methods=["POST"])(add_file)
app.route('/adduser',methods=["POST"])(add_user)
app.route('/list_users')(list_users)

@app.before_first_request
def cokolwiek():
	db.create_all()

db.init_app(app)

if __name__=="__main__":
	app.run(debug=True)
