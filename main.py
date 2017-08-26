#import os
from flask import Flask, request, render_template
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'hackthe6ix-project'
app.config['MONGO_URI'] = 'mongodb://nick:nick@ds161503.mlab.com:61503/hackthe6ix-project'

mongo = PyMongo(app)

@app.route('/')
def hello():
    users = mongo.db.usertest
    users.insert({'name': 'test'})
    return render_template('index.html')
   

if __name__ == "__main__":
    app.secret_key = 'secretkey'
    app.run(debug=True)