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
        self.__pool__ = '0123456789abcdefghijklmnopqrstuvwxyz-:. \0'
        try:
            with open('./LangPkg/token.json','r') as f:
                self.__pkg = json.loads(f.read())
                f.close()
        except:  
            pool = random.sample(range(0,100),41)
            self.__pkg = {}
            k = 0
            for i in self.__pool__ : 
                self.__pkg[i] = pool[k]
                k += 1
            with open('./LangPkg/token.json','w') as f:
                f.write(json.dumps(self.__pkg,indent=4))
                f.close()
        self.__key = key
        self.__iv = iv
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
    def get(self):
        ip = self.request.remote_addr
        userAgent = os.environ['HTTP_USER_AGENT']
        userAgent = userAgent.split('/')
        encrypter = Encryption(key=ip,iv=userAgent[1])
        result = encrypter.Encrypt(ip)
        result = ''.join('{:02x}'.format(ord(i)) for i in result)
        return self.response.write(result)

    def post(self):
        encrypter = Encryption()
        self.response.headers['Content-Type'] = 'application/json'
        return self.response.out.write(json.dumps(encrypter.Token()))

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
        if self.request.cookies.get('login') == 'TRUE':
            return self.redirect('/user')
        else:
            path = 'templates/login/index.html'
            template_values = ''
            return self.response.out.write(template.render(path, template_values))
            
class UserPage(webapp2.RequestHandler):
    def get(self):
        if self.request.cookies.get('login') == 'TRUE':
            
            path = 'templates/user/{}.html'
            if(self.request.cookies.get('identity') == 'teacher'):
                path = path.format('teacher')
            else:
                path = path.format('users')
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
            sql_instruction = "UPDATE users SET {} = '{}' where email = '{}'".format(item, request.get(item).encode('utf'), request.cookies.get('user'))
            
            db = connect_to_cloudsql()
            cursor = db.cursor()
            cursor.execute(sql_instruction)
            db.commit()
            db.close()
            return self.response.write('successful')

class Register(webapp2.RequestHandler):
    def post(self):
        request = self.request
        name = request.get('name').encode('utf')
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
        print(result)
        # if(result[4] == 'teacher'):
        
        self.response.set_cookie('identity',result[0][4])

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

class GameData(webapp2.RequestHandler):
    def get(self,user):
        
        return self.response.out.write('user is %s' % user)

    def post(self):
        request = self.request

        arguments = request.arguments()
        print(arguments)

class Class(webapp2.RequestHandler):

    def __getLevelContent(self,gamesData):
        keys = gamesData.keys()
        sqlinstruction = []
        for i in keys:
            sqlinstruction.append("name = '{}'".format(i))
        sqlinstruction = 'or'.join(sqlinstruction)
        sqlinstruction = "SELECT levels FROM classTB WHERE " + sqlinstruction
        db = connect_to_cloudsql()
        cursor = db.cursor()
        cursor.execute(sqlinstruction)
        levelsResult = cursor.fetchall()
        
        

        newGameData = {}
        for i in levelsResult[0]:
            
            game = json.loads(i.encode('utf')) # type dict
            # print(json.dumps(game,indent=4))
            keys = game.keys()
            for j in keys:
                newGameData[j] = {}
                selectedGameChapter = gamesData[j].keys() 
                selectedGameChapter = [int(sgc) for sgc in selectedGameChapter]
                for k in selectedGameChapter:
                    newGameData[j][k] = {}
                    try:
                        newGameData[j]
                        selectedGameLevels = gamesData[j][k]
                        for l in selectedGameLevels:
                            newGameData[j][k][l] = game[j][unicode(k)][unicode(l)]
                    except:
                        raise UnicodeError("""
                        Congratulation!!! You meet the unicode Error.
                        Please Check The Cloud SQL Encoding!!!
                        I have ever been exhausted to find out the exact problem of this bug.
                        The "level" data is stored in sql in JSON type.
                        The data you fetch all above may be unicode encoding or other type encoding
                        based on the setting while you created the db.
                        So, Please Check Cloud SQL Encoding and Change the Code Above.
                        """)

        return newGameData
    
    def __ClassProcess(self,data):
        games = data["games"].split(',')
        games = [i for i in games if len(i) > 0 ]
        newGames = {}
        for i in games:
            token = data[i].split(',')
            token = [j for j in token if len(j) > 0]
            newGames[i.encode('utf-8')] = {}
            for j in token:
                level = j.split('-')
                level = [int(k) for k in level]
                if level[0] not in newGames[i].keys():
                    newGames[i][level[0]] = []
                newGames[i][level[0]].append(level[1])
        return newGames
    
    def post(self):
        request = self.request
        arguments = request.arguments()
        data = {}
        for i in arguments:
            data[i] = request.get(i)
        
        # print(json.dumps(data,ensure_ascii=False,indent=4))
        gamesData = self.__ClassProcess(data)
        chapterLevelData = self.__getLevelContent(gamesData)

        print('chapterLevelData',json.dumps(chapterLevelData))
        print('post data is',data)

        db = connect_to_cloudsql()
        cursor = db.cursor()
        cursor.execute(
            """INSERT INTO classTB(name, levels, developer, description, public) 
            VALUES(%s, %s, %s, %s, %s)
            """,(data[u'name'],json.dumps(chapterLevelData),self.request.cookies.get('user'),data[u'description'],data[u'mode'])
        )
        db.commit()
        db.close()
        
    def get(self):
        db = connect_to_cloudsql()
        cursor = db.cursor()
        cursor.execute("""
        SELECT *  FROM classTB WHERE public=1;
        """)
        result = cursor.fetchall()
        print(result)
        self.response.headers['Content-Type'] = 'application/json'
        return self.response.out.write(json.dumps(result,indent=4))

class GameHandler(webapp2.RequestHandler):
    def get(self):
        # try:
        #     return self.response.out.write(template.render('debugging/public/debugging.html', ''))
        # except Exception() as e:
        #     print(e)
        #     print(os.listdir('./static'))

        return self.response.set_status(404)


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
    webapp2.Route(r'/token',handler=dataEncryption,name='encryptopn'),
    webapp2.Route(r'/GameRecord',handler=GameData,name='gameRecord'),
    webapp2.Route(r'/GameRecord/<user>',handler=GameData,name='gameRecord'),
    webapp2.Route(r'/debugging',handler=GameHandler,name='Game'),
    webapp2.Route(r'/class',handler=Class,name='Class')
    # webapp2.Route(r'/debugging/public', handler=DebugPublic, name='debuuging_punlic'),
    # webapp2.Route(r'/debugging/js', handler=LogPage, name='log'),

], debug=True)

# [END all]