import os
from flask import Flask, render_template, request, redirect
from flask import jsonify
from flask import request
#from pymongo import PyMongo
# from pymongo import MongoClient

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'heroku_pn5551p6'
app.config['MONGO_URI'] = 'mongodb://heroku_pn5551p6:i9pr6otkkl6935096r47vkhndd@ds159493.mlab.com:59493/heroku_pn5551p6'

#mongo = PyMongo(app)
uri = 'mongodb://heroku_pn5551p6:i9pr6otkkl6935096r47vkhndd@ds159493.mlab.com:59493/heroku_pn5551p6'

@app.route('/test', methods=['GET'])
def test():
	client = MongoClient(uri)
	db = client['test']

	db.test_collection.insert({'some_key': 'some_value'})

	for col in db.test_collection.find():
		print(col)

	return db.test_collection.find()

# @app.route('/star', methods=['GET'])
# def get_all_stars():
  # star = mongo.db.stars
  # output = []
  # for s in star.find():
    # output.append({'name' : s['name'], 'distance' : s['distance']})
  # return jsonify({'result' : output})

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
