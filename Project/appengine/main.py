# [START all]
import os

import MySQLdb
import webapp2
import jinja2
import json
import random
import re
from Crypto.Cipher import AES
from Crypto import Random
from Crypto.Util import Counter
from google.appengine.ext.webapp import template
from google.appengine.ext import db

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

__pool = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

def random_generate_key():
    # key_list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    key_list = 'This is key'
    key = ''
    # for i in key_list : 
    key = bytes(bytearray(key_list))
    print(''.join('{:02x}'.format(ord(i)) for i in key))
    iv = 'This is an IV456'
    print(iv)
    try:
        cipher = AES.new(key , AES.MODE_CBC , 'This is an IV456')
        print(iv)
        result = cipher.encrypt('AES ENCODING0000')
        # return result
        result = ''.join('{:02x}'.format(ord(i)) for i in result)
        return result
    except ValueError as e:
        return '\n' + str(e)  + 'key legth is ' + str(len(key))+ '\n' + str(key)


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

class Encryption():
    def __init__(self,key=None,iv=None,cipher=None):
        self.__pool__ = '0123456789abcdefghijklmnopqrstuvwxyz- \0'
        try:
            with open('./LangPkg/token.json','r') as f:
                self.__pkg = json.loads(f.read())
                f.close()
        except:  
            pool = random.sample(range(0,100),39)
            self.__pkg = {}
            k = 0
            for i in self.__pool__ : 
                self.__pkg[i] = pool[k]
                k += 1
            with open('./LangPkg/token.json','w') as f:
                json.dump(self.__pkg,f)
                f.close()
        self.__key = key
        self.__iv = self.__messageMultipleNProcess(iv)
        self.__cipher = cipher
        if self.__key is not None and self.__iv is not None and self.__cipher is None:
            self.__cipher = self.GenerateCipher(self.__key, self.__iv)

    def GenerateCipher(self,key,iv):
        """
        Generate a cipher
        parameter:
        key : an iterable object (only support list of integer or string)
        iv : an iterable object (only support list of integer or string)
        """
        if type(key) == type(str()):
            key = self.GenerateKeyList(self.__messageMultipleNProcess(key).lower())
        if type(iv) == type(str()):
            iv = self.GenerateKeyList(self.__messageMultipleNProcess(iv).lower())
        key = bytes(bytearray(key))
        iv = bytes(bytearray(iv))
        return AES.new(key, AES.MODE_CBC, iv)

    def Token(self):
        """
        Return the token which Encryption object generates.
        """
        return self.__pkg

    def GenerateKeyList(self,key_message):
        """
        Given an iterable object such as a list of integer or a string. 
        Return a list of numbers.

        Parameter: 
        key_message: an iterable object.
        """
        key_list = [] # The number exist in the key_list is select by self.__pkg
        for i in key_message:
            key_list.append(self.__pkg[str(i)])
        return key_list

    def __messageMultipleNProcess(self,message,n=16,absolute=False):
        """
        Retrun the message which len == 16 * n , n is a nature number
        """
        if  len(message) % n != 0:
            message += '\0' * (n - len(message) % n)
        if absolute:
            return message
        else:
            return message[:n]

    def ResetIV(self,iv):
        """
        Reset the Cipher's iv and the function will also reset the cipher
        """
        if(type(iv) == type(str())):
            iv = self.GenerateKeyList(self.__messageMultipleNProcess(iv).lower())
        self.__iv = iv
        if self.__key is not None:
            self.__cipher = self.GenerateCipher(self.__key , self.__iv)

    def Resetkey(self,key):
        """
        Reset the Cipher's key and the function will also reset the cipher
        """
        if(type(key) == type(str())):
            key = self.GenerateKeyList(self.__messageMultipleNProcess(key).lower())
        self.__key = key
        if self.__iv is not None:
            self.__cipher = self.GenerateCipher(self.__key , self.__iv)

    def Reset(self,key=None,iv=None):
        """
        Reset the Encryption's attributes if key and iv are both Specified or 
        the function will only reset the cipher object.

        Parameter:
        key : cipher's key
        iv : cipher's iv
        """
        if key is not None and iv is not None:
            self.__key = self.__messageMultipleNProcess(key,32)
            self.__iv = self.__messageMultipleNProcess(iv)
            self.__cipher = self.GenerateCipher(self.__key, self.__iv)
        else:
            self.__cipher = self.GenerateCipher(self.__key,self.__iv)

    def Encrypt(self,message,key=None,iv=None):
        """
        Given message, the message will be encrypted.
        If key and iv are both specified, the cipher will be reset.
        
        Parameter:
        message : a string object.
        key : a key which is selected to encrypt the message.
        iv : the initial vector of AES CBC algorithm.
        """
        if self.__cipher is None and (key is None or iv is None):
            raise Exception("The Encryption object lacks of key or iv. Please give enough parameters to encrypt message")
        elif key is not None and iv is not None:
            self.Reset(key,iv)
        message = self.__messageMultipleNProcess(message,absolute=True)
        result = self.__cipher.encrypt(message)
        self.Reset()
        return result
        
    def Decrypt(self,message,key=None,iv=None):
        """
        Given message, the message will be decrypted.
        If key and iv are both specified, the cipher will be reset.
        
        Parameter:
        message : a string object.
        key : a key which is selected to decrypt the message.
        iv : the initial vector of AES CBC algorithm.
        """
        if self.__cipher is None and (key is None or iv is None):
            raise Exception("The Encryption object lacks of key or iv. Please give enough parameters to encrypt message")
        elif key is not None and iv is not None:
            self.Reset(key,iv)
        result = self.__cipher.decrypt(message)
        self.Reset()
        return result.rstrip('\0')
        



class dataEncryption(webapp2.RequestHandler):

    def __userAgentProcess(self):
        token = os.environ['HTTP_USER_AGENT']
        key = ''
        if len(token) < 16:
            return token + '-' * (16 - len(token) % 16)
        key = token_list = token.split('/')
        if len(token_list) >= 4 : 
            key = token_list[1].split(('('))[1].split(')')[0]
        newkey = ''
        for i in key:
            newkey += i
        if len(newkey) < 32 :
            newkey += '-' * (16 - len(key) % 16)
        return newkey[:32]

    def __userIPProcess(self):
        ip = self.request.remote_addr
        if re.search(':',ip) is not None:
            iplist = ip.split(':')
        else:
            iplist = ip.split('.')
        ip = ''
        for i in iplist:
            ip += i
        if len(ip) < 16:
            ip += '-'* (16 - len(ip) % 16)
        
        return ip[:16]

    def __generateKey(self,message):
        key = bytes(bytearray([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]))
        iv = bytes(bytearray([21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ]))
        print(str(key))
        result = self.__encrypt(key,message,iv)
        return result

    def __encrypt(self,key,message,iv):
        cipher = AES.new(key , AES.MODE_CBC, iv)
        result = cipher.encrypt(message)
        result = ''.join('{:02x}'.format(ord(i)) for i in result)
        return result

    def __decrypt(self,key, message,iv):
        cipher = AES.new(key, AES.MODE_CBC, iv)
        result = cipher.decrypt(message.decode('hex'))
        return result

    

    def get(self):
        try:
            # print(self.request.remote_addr)
            with open('./LangPkg/token.json','r') as f:
                self.pkg = json.loads(f.read())
                self.response.headers['Content-Type'] = 'application/json'
                return self.response.out.write(json.dumps(self.pkg))
        except :
            return self.response.set_status(404)
    
    def post(self):
        userkey = self.__generateKey(self.__userAgentProcess())
        useriv = self.__generateKey(self.__userIPProcess())
        return self.response.write(self.request.remote_addr)
        # return self.response.write('%s' % userkey)


class Log(db.Model):
    access_time = db.DateTimeProperty(auto_now_add=True)
    ip_address = db.StringProperty()

class IPtest(webapp2.RequestHandler):
    def get(self):
        # obtain ip address
        ip = self.request.remote_addr

        # create a new Log record
        log = Log()

        # assign ip address to the ip_address field
        log.ip_address = ip

        # no need to set access_time because 
        # of the auto_now_add=True setting defined in the Log model

        # save to the datastore
        log.put()

        # output 
        # self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Logged your visit from ip address %s\n result  is ' % (ip))

class LogPage(webapp2.RequestHandler):
    def get(self):
        logs = Log.all()

        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Ip addresses: ')
        for log in logs:
            self.response.out.write(log.ip_address + ',')

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
        # print("IP = ",self.request.environ.get('HTTP_X_REAL_IP',self.request.remote_addr))
        # raise "not exactly correct IP address"
        # print(json.dumps(self.request.environ.__repr__(),indent=4))
        path = 'templates/index/index.html'
        template_values = ''
        return self.response.out.write(template.render(path, template_values))

class UrlTest(webapp2.RequestHandler):
    def get(self, a1, a2):
        print('in test')
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
        if self.request.cookies.get('login') == 'TRUE': # bug is hear 
            return self.redirect('/user')
        else:
            path = 'templates/login/index.html'
            template_values = ''
            return self.response.out.write(template.render(path, template_values))
            
class UserPage(webapp2.RequestHandler):
    def get(self):
        if self.request.cookies.get('login') == 'TRUE':
            path = 'templates/user/users.html'
            template_values = ''
            return self.response.write(template.render(path, template_values))
        else:
            return webapp2.redirect('/login-register')

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
    def put(self, email, item):
        if self.request.cookies.get('login') == 'TRUE':
            request = self.request
            sql_instruction = "UPDATE users SET {} = '{}' where email = '{}'".format(item, request.get(item), request.cookies.get('user'))
            
            db = connect_to_cloudsql()
            cursor = db.cursor()
            cursor.execute(sql_instruction)
            db.commit()
            db.close()
            return self.response.write('successful')

class Register(webapp2.RequestHandler):
    def post(self):
        request = self.request
        name = request.get('name').encode('utf-8')
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
        INSERT INTO users(name, gameID, password, email,identity,birthday,level) 
        VALUES(%s, %s, %s, %s,%s, %s ,%s)"""
        ,(name,ID,password,email,identity , year+'-'+month+'-'+date,0)
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
        request = self.request
        '''
        # get request body (format: 'item=content')
        item = request.body.split('=')[0] # specify which item to check
        content = request.get(item)
        repeatCheckfomula = "SELECT * FROM users WHERE {} = '{}'".format(item, content)
        '''
        arguments = request.arguments()
        repeatCheckfomula = "SELECT * FROM users WHERE {} = '{}'".format(arguments[0],request.get(arguments[0]))
        db = connect_to_cloudsql()
        cursor = db.cursor()
        cursor.execute(repeatCheckfomula)
        result = cursor.fetchall()
        '''
        if len(result) == 0: # no repeat
            return self.response.write('True') # means this email is available
        else:
            return self.response.write('False') # means this email is not available
        '''
        if len(result) == 0:
            return self.response.write('{}'.format(True))
        else:
            return self.response.write('{}'.format(False))



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
    webapp2.Route(r'/ip', handler=IPtest, name='iptest'),
    webapp2.Route(r'/log', handler=LogPage, name='log'),
    webapp2.Route(r'/token',handler=dataEncryption,name='encryptopn')
    # webapp2.Route(r'/debugging/public', handler=DebugPublic, name='debuuging_punlic'),
    # webapp2.Route(r'/debugging/js', handler=LogPage, name='log'),

], debug=True)

# [END all]