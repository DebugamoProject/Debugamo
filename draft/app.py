import flask
import yaml
import json
from flask import Flask,render_template,request,redirect,url_for
from flask_mysqldb import MySQL

import school

app = Flask(__name__)
db = yaml.load(open('yuchundb.yaml'))

app.config['JSON_AS_ASCII'] = False
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']


mysql = MySQL(app)

schools = school.School('./school/')

REPEAT_CHECK_API = '/record'
SCHOOL_API = '/school/'
LANGUAGE_API = '/language/'

@app.route('/',methods=['GET'])
def index():
    return render_template('./index/index.html')

@app.route('/register',methods=["POST"])
def register():
    userDetails = request.form
    name = userDetails['name']
    ID = userDetails['gameID']
    email = userDetails['email']
    password = userDetails['password']
    year = userDetails['Year']
    month = userDetails['Month']
    date = userDetails['Date']
    identity = userDetails['identity']
    cursor = mysql.connection.cursor()
    cursor.execute("""
    INSERT INTO users(name, gameID, password, email,identity,birthday) 
    VALUES(%s, %s, %s, %s,%s,%s)"""
    ,(name,ID,password,email,identity,year+'-'+month+'-'+date)
    )
    mysql.connection.commit()
    cursor.close()
    return 'successful'

@app.route('/login',methods=['POST'])
def test2():
    loginSQL = "SELECT * FROM users WHERE email = '{}' and password = '{}'"
    userDetails = request.form
    email = userDetails['login-email']
    password = userDetails['login-password']
    cursor = mysql.connection.cursor()
    cursor.execute(loginSQL.format(email,password))
    result = cursor.fetchall()
    if len(result) == 1:
        return 'successful'
    else:
        return 'failed'

@app.route('/login-register',methods=['GET','POST'])
def test():
    if request.method == 'POST':
        loginSQL = "SELECT * FROM users WHERE email = '{}' and password = '{}'"
        userDetails = request.form
        email = userDetails['login-email']
        password = userDetails['login-password']
        cursor = mysql.connection.cursor()
        cursor.execute(loginSQL.format(email,password))
        result = cursor.fetchall()
        if len(result) == 1:
            return 'successful'
        else:
            return 'failed'
    return render_template('./login/index.html')

@app.route('/user',methods=['GET'])
def userpage():
    if request.cookies.get('login') == 'TRUE' : 
        return render_template('./user/users.html')
    else:
        return redirect('/login-register')

@app.route('/user/<email>',methods=['GET'])
def userData(email):
    mycursor = mysql.connection.cursor()
    mycursor.execute("SELECT * FROM users WHERE email = '{}'".format(email))
    myresult = mycursor.fetchall()

    return flask.jsonify(myresult),200

@app.route(REPEAT_CHECK_API,methods = ['POST','GET'])
def repeatCheck():
    data = request.form
    keys = [i for i in data]
    repeatCheckfomula = "SELECT * FROM users WHERE {} = '{}'"
    cursor = mysql.connection.cursor()
    cursor.execute(repeatCheckfomula.format(keys[0],data[keys[0]]))
    result = cursor.fetchall()
    if len(result) == 0:
        return '{}'.format(True) # means this email is available
    else:
        return '{}'.format(False) # means this email isn't available

@app.route(SCHOOL_API+'<grade>',methods = ['GET'])
def School(grade):
    if grade in schools.keys():
        return flask.jsonify(schools.Schools(grade)),200
    else:
        return 'Connot found {}'.format(grade),404


@app.route(LANGUAGE_API+'<page>/<lang>',methods=['GET'])
def Lang(page,lang):
    try:
        with open('./LangPkg/{}/{}.json'.format(page,lang),'r') as file:
            pkg = json.loads(file.read())
            return flask.jsonify(pkg),200
    
    except:
        return 'Connot find this language package',404


if __name__ == '__main__':
    app.run(debug=True)