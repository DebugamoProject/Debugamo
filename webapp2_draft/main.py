# [START all]
import os

import MySQLdb
import webapp2
import jinja2
import json
from google.appengine.ext.webapp import template

# These environment variables are configured in app.yaml.
CLOUDSQL_CONNECTION_NAME = os.environ.get('CLOUDSQL_CONNECTION_NAME')
CLOUDSQL_USER = os.environ.get('CLOUDSQL_USER')
CLOUDSQL_PASSWORD = os.environ.get('CLOUDSQL_PASSWORD')
CLOUDSQL_DATABASE = os.environ.get('CLOUDSQL_DATABASE')

# Jinja environment
JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


def connect_to_cloudsql():
    # When deployed to App Engine, the `SERVER_SOFTWARE` environment variable
    # will be set to 'Google App Engine/version'.
    if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
        # Connect using the unix socket located at
        # /cloudsql/cloudsql-connection-name.
        cloudsql_unix_socket = os.path.join(
            '/cloudsql', CLOUDSQL_CONNECTION_NAME)

        db = MySQLdb.connect(
            unix_socket=cloudsql_unix_socket,
            user=CLOUDSQL_USER,
            passwd=CLOUDSQL_PASSWORD,
            db=CLOUDSQL_DATABASE)

    # If the unix socket is unavailable, then try to connect using TCP. This
    # will work if you're running a local MySQL server or using the Cloud SQL
    # proxy, for example:
    #
    #   $ cloud_sql_proxy -instances=your-connection-name=tcp:3306
    #
    else:
        db = MySQLdb.connect(
            host='127.0.0.1', user=CLOUDSQL_USER, passwd=CLOUDSQL_PASSWORD, db=CLOUDSQL_DATABASE)
    return db


class TestPage(webapp2.RequestHandler):
    def get(self):
        """Simple request handler that shows all of the MySQL variables."""
        self.response.headers['Content-Type'] = 'text/plain'
        db = connect_to_cloudsql()
        cursor = db.cursor()
        # cursor.execute('SHOW DATABASES')
        cursor.execute('desc users')
        for r in cursor.fetchall():
            self.response.write('{}\n'.format(r))
                

class MainPage(webapp2.RequestHandler):

    def get(self):
        # template_values = ''
        # template = JINJA_ENVIRONMENT.get_template('templates/index/index.html')
        # return self.response.write(template.render(template_values))
        path = 'templates/index/index.html'
        template_values = ''
        return self.response.out.write(template.render(path, template_values))

class UrlTest(webapp2.RequestHandler):
    def get(self, a1, a2):
        print('in t')
        self.response.write('this is %s and %s' %(a1, a2))

class LangPage(webapp2.RequestHandler):
    def get(self, page, lang):
        try:
            with open('./LangPkg/{}/{}.json'.format(page, lang), 'r') as f:
                pkg = json.loads(f.read())
                self.response.headers['Content-Type'] = 'application/json'
                return self.response.out.write(json.dumps(pkg))
        except:
           return self.response.set_status(404)

class Login_Register(webapp2.RequestHandler):
    def get(self):
        if self.request.cookies.get('login'):
            return self.redirect('/user')
        else:
            path = 'templates/login/index.html'
            template_values = ''
            return self.response.out.write(template.render(path, template_values))
    def post(self):
        # cookie unfinish
        loginSQL = "SELECT * FROM users WHERE email = '{}' and password = '{}' "
        info = self.request.get()
        print(info)
        print('-' * 10)
        # userDetails = 
        # email = 

class UserPage(webapp2.RequestHandler):
    def get(self):
        if self.request.cookies.get('login') == 'TRUE':
            path = 'templates/user/users.html'
            template_values = ''
            return self.response.write(template.render(path, template_values))
        else:
            return self.redirect('/login-register')

class Email(webapp2.RequestHandler):
    def get(self, email):
        if self.request.cookies.get('login') == 'TRUE':
            db = connect_to_cloudsql()
            cursor = db.cursor()
            cursor.execute("SELECT * FROM users WHERE email = '{}'".format(email))
            sqlresult = cursor.fetchall()
            userdata = [i for i in sqlresult[0]]
            userdata[5] = '{}-{}-{}'.format(userdata[5].year,userdata[5].month,userdata[5].day)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(userdata))
            return self.response.set_status(200)
        else:
            self.response.write('You don\'t have permission')
            self.response.set_status(200)

class Email_Item(webapp2.RequestHandler):
    def put(self, email):
        if self.request.cookies.get('login') == 'TRUE':

            sql_instruction = "UPDATE users SET {} = '{}' where email = '{}'".format(item,formdata[item],request.cookies.get('user'))
            

class Register(webapp2.RequestHandler):
    def post(self):
        request = self.request
        name = request.get('name')
        ID = request.get('gameID')
        email = request.get('email')
        password = request.get('password')
        year = request.get('Year')
        month = request.get('Month')
        date = request.get('Date')
        identity = request.get('identity')
        
        db = connect_to_cloudsql()
        cursor = db.cursor()
        cursor.execute("""
        INSERT INTO users(name, gameID, password, email,identity,class,birthday,level) 
        VALUES(%s, %s, %s, %s,%s, %s ,%s,%s)"""
        ,(name,ID,password,email,identity ,0 , year+'-'+month+'-'+date,0)
        )
        db.commit()
        db.close()
        return self.response.write('successful')

class Login(webapp2.RequestHandler):
    def post(self):
        request = self.request
        email = request.get('login-email')
        password = request.get('login-password')
        loginSQL = "SELECT * FROM users WHERE email = '{}' and password = '{}'".format(email,password)
        
        db = connect_to_cloudsql()
        cursor = db.cursor()
        cursor.execute(loginSQL)
        result = cursor.fetchall()
        if len(result) == 1:
            return self.response.write('successful')
        else:
            return self.response.write('failed')

class RepeatCheck(webapp2.RequestHandler):
    def post(self):
        pass


LANGUAGE_API = '/language/'

app = webapp2.WSGIApplication([
    webapp2.Route(r'/', handler=MainPage, name='home'),
    webapp2.Route(r'/user', handler=UserPage, name='user'),
    webapp2.Route(r'/user/<email>', handler=Email, name='email'),
    webapp2.Route(r'/user/<email>/<item>', handler=Email_Item, name='email_item'),
    webapp2.Route(r'/test', handler=TestPage, name='test'),
    webapp2.Route(r'/language/<page>/<lang>', handler=LangPage, name='lang'),
    webapp2.Route(r'/login-register', handler=Login_Register, name='login_register'),
    webapp2.Route(r'/register', handler=Register, name='register'),
    webapp2.Route(r'/login', handler=Login, name='login'),
    webapp2.Route(r'/t/<a1>/<a2>', handler=UrlTest, name='t'),
    webapp2.Route(r'/record', handler=RepeatCheck, name='repeatcheck'),
], debug=True)

# [END all]