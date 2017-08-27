import os
from flask import Flask, render_template, request, redirect
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'test'
app.config['MONGO_URI'] = 'mongodb://shela:shela@ds161503.mlab.com:61503/hackthe6ix-project'

mongo = PyMongo(app)

@app.route('/test')
def test():
	user = mongo.db.users
	user.insert({'name':'Anthony', 'lastname':'Bob'})
	return 'Added User!'
	# name = request.json['name']
	# distance = request.json['distance']
	# star_id = testDB.insert({'name': name, 'distance': distance})
	# new_star = testDB.find_one({'_id': star_id })
	# output = {'name' : new_star['name'], 'distance' : new_star['distance']}
	# return jsonify({'result' : output})

def add_user():
	name = "Bob"
	auth = "sjfosjf098ewj0whf"
	users = mongo.db.users
	users.insert({'auth_token':auth})
	current_user = users.find(auth)
	current_user.insert({'name':name})
	return 'added user'


@app.route('/testprintjson', methods=['GET'])
def print_json():
  user = mongo.db.users
  output = []
  for s in user.find():
    output.append({'name' : s['name'], 'lastname' : s['lastname']})
  return jsonify({'result' : output})

# @app.route('/star/', methods=['GET'])
# def get_one_star(name):
  # star = mongo.db.stars
  # s = star.find_one({'name' : name})
  # if s:
    # output = {'name' : s['name'], 'distance' : s['distance']}
  # else:
    # output = "No such name"
  # return jsonify({'result' : output})

# @app.route('/star', methods=['POST'])
# def add_star():
  # star = mongo.db.stars
  # name = request.json['name']
  # distance = request.json['distance']
  # star_id = star.insert({'name': name, 'distance': distance})
  # new_star = star.find_one({'_id': star_id })
  # output = {'name' : new_star['name'], 'distance' : new_star['distance']}
  # return jsonify({'result' : output})


@app.route("/")
def hello():
    return render_template('index.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
