from flask import Flask,render_template,request
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)

db = yaml.load(open('db.yaml'))

app.config['MYSQL_HOST'] = db['mysql_host']


app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)

@app.route('/',methods=['GET','POST'])
def index():
    if request.method == 'POST':
        userDetails = request.form
        name = userDetails['name']
        ID = userDetails['ID']
        email = userDetails['email']
        password = userDetails['password']
        year = userDetails['Year']
        month = userDetails['Month']
        date = userDetails['Date']
        city = userDetails['City']
        state = userDetails['State']
        school = userDetails['School']

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM students WHERE email = '{}'".format(email))
        email = cursor.checkout()
        cursor.execute('INSERT INTO students(name, ID, password, email, school, birthday) VALUES(%s, %s, %s, %s, %s, %s)',(name,ID,password,email,city+state+school,year+'-'+month+'-'+date))
        mysql.connection.commit()
        cursor.close()
        return 'successful'
    return render_template('./index.html')

@app.route('/user',methods=['GET','POST'])
def test():
    if request.method == 'POST':
        loginSQL = "SELECT * FROM students WHERE email = '{}' and password = '{}'"
        userDetails = request.form
        email = userDetails['email']
        password = userDetails['password']
        cursor = mysql.connection.cursor()
        cursor.execute(loginSQL.format(email,password))
        result = cursor.fetchall()
        if len(result) == 1:
            return 'successful'
        else:
            return 'failed'
    return render_template('./users.html')



if __name__ == '__main__':
    app.run(debug=True)
    