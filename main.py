import os
from flask import Flask, request, render_template, session, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'hackthe6ix-project'
app.config['MONGO_URI'] = 'mongodb://nick:nick@ds161503.mlab.com:61503/hackthe6ix-project'

mongo = PyMongo(app)

@app.route('/')
def hello():
    # session['id'] = 'testid'
    return render_template('index.html')

@app.route('/get')
def get():
    users = mongo.db.usertest2 
    tester = users.find_one({'_id':session['id']})
    return jsonify(tester)

@app.route('/post')
def post():
    '''
    placeholder = {
        "name": "Anne",
        "amount": 300,
        "theyOweYou": True,
        "date": "02/14/2001",
        "reason": "potato"
    }
    '''
    placeholder = request.form
    amount = placeholder['amount']
    if not placeholder['theyOweYou']:
        amount = -1*amount
    
    users = mongo.db.usertest2
    tester = users.find_one({'_id':session['id'], 'accountsPayable.name':placeholder['name']})

    if tester:
        total = amount
        for i in range(len(tester['accountsPayable'])):
            total += tester['accountsPayable'][i]['total']
        
        users.update({'_id':session['id'], "accountsPayable.name":placeholder['name']}, {'$push':{"accountsPayable.$.transactions":{'date':placeholder['date'], 'amount':placeholder['amount'], 'reason':placeholder['reason']}}} )
        users.update({
            '_id':session['id'], 
            "accountsPayable":{"$elemMatch" : {"name" : placeholder['name']}}}, 
            {'$set':{'accountsPayable.$.total': total }})  
    else:
        users.update({'_id':session['id']}, {'$push':{'accountsPayable': {'name':placeholder['name'], 'total': placeholder['amount'], 'transactions':[] } }})
        users.update({'_id':session['id'], "accountsPayable.name":placeholder['name']}, {'$push':{"accountsPayable.$.transactions":{'date':placeholder['date'], 'amount':placeholder['amount'], 'reason':placeholder['reason']}}} )
    tester = users.find_one({'_id':session['id'], 'accountsPayable.name':placeholder['name']})
    
    return jsonify(tester)    

@app.route('/create')
def create():
    users = mongo.db.usertest2
    users.insert({
        '_id': 'testid',
        'accountsPayable': [
            {
                'name': 'Eason',
                'total': -300,
                'transactions' : [
                    {
                        'date': '01/01/2001',
                        'amount': -900,
                        'reason': 'potato'
                    },
                    {
                        'date': '01/02/2001',
                        'amount': 600,
                        'reason': 'tomato'
                    }
                ]
            },
            {
                'name': 'Shela',
                'total': 100,
                'transactions' : [
                    {
                        'date': '03/03/2003',
                        'amount': 200,
                        'reason': 'potato3'
                    },
                    {
                        'date': '04/04/2004',
                        'amount': -100,
                        'reason': 'tomato4'
                    }
                ]
            }
        ]
    });
    return 'nice'

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.secret_key = 'secretkey'
    app.run(host='0.0.0.0', port=port, debug=True)
