import flask
import yaml
import json
from flask import Flask,render_template,request,redirect,url_for
from flask_mysqldb import MySQL
import mysql

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
    INSERT INTO users(name, gameID, password, email,identity,class,birthday,level) 
    VALUES(%s, %s, %s, %s,%s, %s ,%s,%s)"""
    ,(name,ID,password,email,identity ,0 , year+'-'+month+'-'+date,0)
    )
    mysql.connection.commit()
    cursor.close()
    return 'successful'

@app.route('/login',methods=['POST'])
def test2():
    userDetails = request.form
    email = userDetails['login-email']
    password = userDetails['login-password']
    loginSQL = "SELECT * FROM users WHERE email = '{}' and password = '{}'".format(email,password)
    cursor = mysql.connection.cursor()
    cursor.execute(loginSQL)
    result = cursor.fetchall()
    if len(result) == 1:
        return 'successful'
    else:
        return 'failed'

@app.route('/login-register',methods=['GET','POST'])
def test():
    if request.cookies.get('login') == 'TRUE':
        return redirect('/user')
    else:
        if request.method == 'POST':
            loginSQL = "SELECT * FROM users WHERE email = '{}' and password = '{}' "
            userDetails = request.form
            email = userDetails['login-email']
            password = userDetails['login-password']
            cursor = mysql.connection.cursor()
            try:
                cursor.execute(loginSQL.format(email,password))
            except:
                print(loginSQL)
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
    if request.cookies.get('login') == 'TRUE' : 
        mycursor = mysql.connection.cursor()
        mycursor.execute("SELECT * FROM users WHERE email = '{}'".format(email))
        sqlresult = mycursor.fetchall()
        userdata = [i for i in sqlresult[0]]
        userdata[6] = '{}-{}-{}'.format(userdata[6].year,userdata[6].month,userdata[6].day)
        return flask.jsonify(userdata),200
    else :
        return 'You Don\'t have permission',200

@app.route('/user/<email>/<item>',methods=['PUT'])
def edit(email,item):
    if request.cookies.get('login') == 'TRUE' :
        formdata = request.form
        # keys = [i for i in formdata]
        sql_instruction = "UPDATE users SET {} = '{}' where email = '{}'".format(item,formdata[item],request.cookies.get('user'))
        print(sql_instruction)
        mycursor = mysql.connection.cursor()
        mycursor.execute(sql_instruction)
        mysql.connection.commit()
        mycursor.close()
    return 'successful',200


@app.route(REPEAT_CHECK_API,methods = ['POST','GET'])
def repeatCheck():
    data = request.form
    keys = [i for i in data]
    repeatCheckfomula = "SELECT * FROM users WHERE {} = '{}'".format(keys[0],data[keys[0]])
    print(repeatCheckfomula)
    cursor = mysql.connection.cursor()
    cursor.execute(repeatCheckfomula)
    result = cursor.fetchall()
    if len(result) == 0: # no repeat
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