#import os
from flask import Flask, request, render_template
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'hackthe6ix-project'
app.config['MONGO_URI'] = 'mongodb://nick:nick@ds161503.mlab.com:61503/hackthe6ix-project'

mongo = PyMongo(app)



@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/get')
def get():
    users = mongo.db.usertest 
    tester = users.find_one({'_id':'testid'})
    return str(tester)

@app.route('/create')
def create():
    users = mongo.db.usertest
    users.insert({
        '_id': 'testid',
        'accountsPayable': {
            'name': 'Eason',
            'total': '-200',
            'transactions' : [
                {
                    'date': '01/01/2001',
                    'amount': '-900',
                    'reason': 'potato'
                },
                {
                    'date': '01/02/2001',
                    'amount': '600',
                    'reason': 'tomato'
                },
                {
                    'date': '01/03/2001',
                    'amount': '100',
                    'reason': 'lmao'
                },
            ]
        }
    });
    return 'nice'

if __name__ == "__main__":
    app.secret_key = 'secretkey'
    app.run(debug=True)