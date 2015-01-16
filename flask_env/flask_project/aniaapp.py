from flask import Flask, jsonify, render_template, request, json



app = Flask(__name__)
app.config['SERVER_NAME']  = '127.0.0.1:8080'

@app.route('/')
def index():
    return 'lubie ciastka!'


@app.route('/data')
def names():
    data = {"names": ["John", "Jacob", "Julie", "Jennifer"]}
    return jsonify(data)

@app.route('/haslo')
def hasla():
    data = {"hasla": ["1234", "qwerty", "haslo", "olsah"]}
    return jsonify(data)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/login', methods=['POST'])
def login():
	data = request.get_json(force=True)
	login = data["username"]
	haslo = data["password"]

	print 'login '+login
	print 'haslo '+haslo
	return jsonify({"status": "OK"})
	
@app.route('/signup', methods=['POST'])
def signup():
	data = request.get_json(force=True)
	login = data["username"]
	haslo = data["password"]
	email = data["email"]

	print 'login '+login
	print 'haslo '+haslo
	print 'email '+email
	return jsonify({"status": "OK"})
	
@app.route('/list', methods=['POST'])
def list():
	data = request.get_json(force=True)
	login = data["username"]
	data = {"file1":"notporn.avi", "file2": "notporn2.jpg", "file3": "notporn3.bmp"}
	return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
    
    #192.168.18.119:5000
