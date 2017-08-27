import os
from flask import Flask, request, render_template, session, redirect, url_for, jsonify
from flask_pymongo import PyMongo
from flask_oauthlib.client import OAuth

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'hackthe6ix-project'
app.config['MONGO_URI'] = 'mongodb://nick:nick@ds161503.mlab.com:61503/hackthe6ix-project'
app.config['GOOGLE_ID'] = "476653142357-aqg5usequljmn6tsekd7k99f8q8mlj6f.apps.googleusercontent.com"
app.config['GOOGLE_SECRET'] = "pioO4ZBDDipdI38zVOGkJraa"
app.secret_key = 'development'
oauth = OAuth(app)

google = oauth.remote_app(
    'google',
    consumer_key=app.config.get('GOOGLE_ID'),
    consumer_secret=app.config.get('GOOGLE_SECRET'),
    request_token_params={
        'scope': 'email'
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
)

mongo = PyMongo(app)

@app.route('/')
def index():
	if 'google_token' in session:
		#me = google.get('userinfo')
        #return jsonify({"data":me.data})
        #current_user = users.find({"_id":session['id']})
        #print(current_user)
		return render_template('index.html')
    #session['id'] = 'testid'
	return redirect(url_for('login'))
	
@app.route('/login')
def login():
	return google.authorize(callback=url_for('authorized', _external=True))
	
@app.route('/logout')
def logout():
    session.pop('id', None)
    return redirect(url_for('index'))
	
@app.route('/oauth2callback')
def authorized():
    resp = google.authorized_response()
    if resp is None:
        return 'Access denied: reason=%s error=%s' % (
            request.args['error_reason'],
            request.args['error_description']
        )
    session['google_token'] = (resp['access_token'], '')
    me = google.get('userinfo')

    session['id'] = me.data['id'] # (me.data['id'], '') SHELAAAAAA
    
    users = mongo.db.usertest
    if users.find({'_id': me.data['id']}).count() == 0:
        users.insert({"_id":me.data['id'], "name": me.data['given_name'], "accountsPayable":[]})
    return redirect("/")


@google.tokengetter
def get_google_oauth_token():
    return session.get('google_token')

@app.route('/get')
def get():
    users = mongo.db.usertest
    tester = users.find_one({'_id':session['id']})
    return jsonify(tester)

@app.route('/post', methods=['GET', 'POST'])
def post():
    '''
    placeholder = {
        "name": "Anne",
        "amount": 300,
        "theyOweYou": true,
        "date": "02/14/2001",
        "reason": "potato"
    }
    '''
    placeholder = request.json
    amount = int(placeholder['amount'])
    if not placeholder['theyOweYou']:
        amount = -1*amount

    print(session['id'])

    users = mongo.db.usertest
    tester = users.find_one({'_id':session['id'], 'accountsPayable.name':placeholder['name']})
    if tester:
        total = amount
        for i in range(len(tester['accountsPayable'])):
            total += int(tester['accountsPayable'][i]['total'])

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
    users = mongo.db.usertest
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
