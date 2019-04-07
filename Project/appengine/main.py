# [START all]
import os

import MySQLdb
import webapp2
import jinja2
import json
import random
import re
import math
import datetime
import xml.etree.ElementTree as ET
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

def finishOrNot(courseName, userID):
    db = connect_to_cloudsql()
    cursor = db.cursor()
    
    #part 1
    #extract all of levels of course from classTB 
    cursor.execute(
        """
        SELECT levels FROM classTB WHERE name='%s'
        """ % courseName
    )
    
    result = json.loads(cursor.fetchall()[0][0])
    # print(json.dumps(result,indent=4))
    taskList = {}
    keys = result.keys()
    for i in keys:
        taskList[i] = []
        sec = result[i].keys()
        for j in sec : 
            tasks = result[i][j].keys()
            for k in tasks:
                taskList[i].append(i + str(j) + '_' + str(k))
    print(json.dumps(taskList))

    # part 2
    # judge the task if it has been completed.

    taskScopeKeys = taskList.keys()

    taskSQLQuery = {}
    
    for i in taskScopeKeys:
        sqlInstruction = 'SELECT '
        col = ', '.join(taskList[i])
        sqlInstruction += col + ' FROM ' + i + " WHERE ID='%s';" % userID
        taskSQLQuery[i]= sqlInstruction
    print(json.dumps(taskList,indent=4))    
    print('\n\n\nSQLquery')
    print(taskSQLQuery)
    taskResult = {}
    for i in taskScopeKeys:
        cursor.execute(
            taskSQLQuery[i]
        )
        result = cursor.fetchall()[0]
        taskResult[i] = {}
        taskResult[i]['finish'] = []
        taskResult[i]['failed'] = []
        
        for j in range(len(taskList[i])) :
            # print(type(result[j])) 
            if(result[j] is not None):
                # print(len(result[j]))
                if (finishOrNotJsonProcess(json.loads(result[j])) == 1):
                    taskResult[i]['finish'].append(taskList[i][j])
                else:
                    taskResult[i]['failed'].append(taskList[i][j])
            # taskResult[i][taskList[i][j]] = json.loads(result[j])
            else : 
                taskResult[i]['failed'].append(taskList[i][j])
                # taskResult[i][taskList[i][j]] = 0
    # print(json.dumps(taskResult,indent=4))
    return taskResult


    # part 3 
    # sort the finish tasks and unfinish task
    
    pass

def finishOrNotJsonProcess(data):
    for i in data:
        try:
            # print(re.search(r'Success',i['action']))
            # print(i['action'])
            if(re.search(r'Success',i['action']) != None):
                # print('return 1')
                return 1
        except KeyError as e:
            pass
    
    return -1

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
        db = connect_to_cloudsql()
        cursor = db.cursor()
        a = """
{
    "Debugging": {
        "1": {
            "1": "Learn Move",
            "2": "Learn Grab and Drop",
            "3": "Evaluation"
        },
        "2": {
            "1": "Learn Goto",
            "2": "Learn List",
            "3": "Evaluation"
        },
        "3": {
            "1": "Learn List",
            "2": "Learn List",
            "3": "Evaluation"
        },
        "4": {
            "1": "Learn Function",
            "2": "Learn Function",
            "3": "Evaluation"
        },
        "5": {
            "1": "Learn If-Then",
            "2": "Learn If-Then-Else",
            "3": "Evaluation"
        },
        "6": {
            "1": "Learn For Loop",
            "2": "Learn While Loop",
            "3": "Evaluation"
        }
    }
}
"""
        a = json.loads(a)
        cursor.execute(
            """
            UPDATE classTB SET levels = '%s' WHERE name="Debugging"
            """
            % json.dumps(a)
        )
        # db.commit()
        # db.close()


        # finishOrNot('Debugging','321')
        # """Simple request handler that shows all of the MySQL variables."""
        # self.response.headers['Content-Type'] = 'text/plain'
        # db = connect_to_cloudsql()
        # cursor = db.cursor()
        # a = """
        #     {"Debugging": {"1": {"1": "Learn Move", "2": "Learn Grab and Drop"}, "2": {"1": "Learn Goto", "3": "Evaluation"}, "3": {"3": "Evaluation"}, "4": {"2": "Learn Function"}, "5": {"1": "Learn If-Then"}, "6": {"1": "Learn For Loop", "3": "Evaluation"}}}
        #     """
        # a = json.loads(a)

        # cursor.execute("""
        #     UPDATE classTB SET levels = '%s' WHERE name="Debugging"
        #     """ % json.dumps(a))
        # db.commit()
        # db.close()
        # for r in cursor.fetchall():
        #     self.response.write('{}\n'.format(r))
                
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

class UserPage(webapp2.RequestHandler):
    def get(self):
        if self.request.cookies.get('login') == 'TRUE':
            
            path = 'templates/user/{}.html'
            db = connect_to_cloudsql()
            cursor = db.cursor()
            cursor.execute(
                """
                SELECT identity FROM users WHERE email='%s'
                """ % self.request.cookies.get('user')
            )
            try:
                result = cursor.fetchall()[0][0]
                print('\n\n---\n\n')
                print(result)
            except IndexError as e:
                print('IN THE EXCEPTION HANDLER')
                cookies = self.request.cookies
                for i in cookies:
                    self.response.delete_cookie(i)
                    self.response.location = '/'
                return self.response
            
            path = path.format(result)
            # return webapp2.redirect('/')
            template_values = ''
            return self.response.write(template.render(path, template_values))
        else:
            return webapp2.redirect('/')

class Email(webapp2.RequestHandler):
    def get(self, email):
        if self.request.cookies.get('login') == 'TRUE':
            db = connect_to_cloudsql()
            cursor = db.cursor()
            cursor.execute("SELECT name, gameID, email, birthday, level, exp FROM users WHERE email = '{}'".format(email))
            sqlresult = cursor.fetchall()[0]
            
            userdata = {}
            userdata['name'] = sqlresult[0]
            userdata['id'] = sqlresult[1]
            userdata['email'] = sqlresult[2]
            userdata['birthday'] = '{}-{}-{}'.format(sqlresult[3].year,sqlresult[3].month,sqlresult[3].day)
            userdata['level'] = sqlresult[4]
            userdata['exp'] = sqlresult[5]
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
        INSERT INTO users(name, gameID, password, email,identity,birthday,level, courses) 
        VALUES(%s, %s, %s, %s,%s, %s ,%s, %s)"""
        ,(name,ID,password,email,identity , year+'-'+month+'-'+date,0,json.dumps([]))
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
        
        if len(result) == 1:
            self.response.set_cookie('identity',result[0][4])
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

    def __getCurrentLevel(self,result):
        """

        """
        print('\n\n\nself.__getCurrntLevel\n\n')
        start = 0
        for i in result:
            if i != None:
                data = json.loads(i)
                for j in data:
                    try:
                        if (j['action'] == 'checkLevelSuccess'):
                            start += 1
                    except:
                        pass
            # if i != None:
            #     a = json.loads(i)
            #     print(json.dumps(a,indent=4))
            # else:
            #     print(i)
            # print('\n\n')
        return start

    def levelInfo(self,userLevelData):
        """
        You need to finish this method after you decide which value you'd like to store in the db 

        This method need to return which level user should start and 
        which levels user has been completed.

        Also, determine if user is a new player of this task or not
        """
        startedLevel = 1 # need to be a integer
        userDoneLevel = [] # need to be list
        newUser = 1 # if user is a new player newUser is 1 , if not newUser = 0
        return startedLevel, userDoneLevel , newUser

    def get(self,user):
        
        return self.response.out.write('user is %s' % user)

    def post(self):
        """

        """
        request = self.request
        data = json.loads(request.body)
        db = connect_to_cloudsql()
        cursor = db.cursor()
        cursor.execute(
            """
            SELECT levels FROM classTB WHERE name='%s'
            """ % (data['task'])
        )
        # data['task'] if url isn't specified which task here will raise exception!!
        # use try-except to handle and redirect to the correct page.
        result = cursor.fetchall()
        try:
            task = json.loads(result[0][0])
        except Exception as e:
            task = []
            
        print(json.dumps(task,indent=4))
        games = task.keys()
        selectedLevels = []
        for i in games:
            chapters = task[i].keys()
            for j in chapters:
                gamesLevel = task[i][j].keys()
                for level in gamesLevel:
                    selectedLevels.append((int(j) - 1) * 3 + int(level))

        selectedLevels = sorted(selectedLevels)
        # in NAMESPACE BlocklyInterface.nextLevel, functon will switch to next level based on this data 

        nextLevelDict = {}
        for i in range(len(selectedLevels) - 1):
            nextLevelDict[selectedLevels[i]] = selectedLevels[i + 1]
        
        cursor.execute(
            """
            SELECT * FROM %s WHERE ID='%s'
            """ % (data['task'],data['user'])
        )  
        try:
            result = list(cursor.fetchall()[0])
            del result[0]
        except:
            pass
        # print('\n\n\n------')
        # print(result)
        newUser = 1
        for i in result:
            print(i)
            if i != None:
                newUser = 0
                break
        startLevel = self.__getCurrentLevel(result)
        
        print('newUser is %s ' % newUser)
        print('startLevle is %d ' % startLevel)
        
        self.response.headers['Content-Type'] = 'application/json' 
        return self.response.out.write(json.dumps({
    "nextLevel":nextLevelDict,
    "startLevel":selectedLevels[0],
    "selectedLevel":selectedLevels,
    "newPlayer" : newUser
    }))

class Class(webapp2.RequestHandler):

    def __getLevelContent(self,gamesData):
        keys = gamesData.keys()
        sqlinstruction = []
        for i in keys:
            sqlinstruction.append("name = '{}'".format(i))
        sqlinstruction = ' or '.join(sqlinstruction)
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
        return newGames,games

    def __newTableProcess(self,data,games):
        print(json.dumps(data,indent=4))
        tableColumns = """CREATE TABLE %s (ID CHARACTER(30) , """ % (re.sub(r' ','_',data['name']))
        for game in games:
            token = data[game].split(',')
            token = [game + re.sub(r' - ',r'_',i) + ' JSON ' for i in token if len(i) > 0]
            token = ' , '.join(token)
            tableColumns += token
        tableColumns += ')'
        print(tableColumns)
        
        
        return tableColumns

    def __getUserTaskData(self, coursesList):
        userTask = []
        for i in coursesList:
            db = connect_to_cloudsql()
            cursor = db.cursor()
            cursor.execute(
                """
                SELECT * FROM classTB WHERE name="%s"
                """ % (i)
            )
            result = cursor.fetchall()

            result = {
                "name" : result[0][0],
                "game" : result[0][1],
                "developer" : result[0][2],
                "target" : result[0][3],
                "exp" : result[0][4],
                "type" : result[0][5],
                "public" : result[0][6]
            }
            userTask.append(result)
        return userTask

    def __searchCourse(self):
        db = connect_to_cloudsql()
        cursor = db.cursor()
        cursor.execute(
            """
            SELECT name FROM classTB;
            """
        )
        result = cursor.fetchall()
        courses = []
        for i in result:
           courses.append(i[0]) 
        return courses

    def __CourseToJSON(self, data):
        JSONdata = []
        for i in data:
            course = {}
            course['name'] = i[0]
            course['tasks'] = i[1]
            course['developers'] = i[2]
            course['description'] = i[3]
            course['exp'] = i[4]
            course['type'] = i[5]
            JSONdata.append(course)
        return JSONdata

    def __creatCourse(self, courseData) : 
        # part 1 get the level content
        db = connect_to_cloudsql()
        cursor = db.cursor()

        scopes = courseData['levels'].keys()
        courseData['tableLevels'] = []
        for i in scopes:
            cursor.execute(
                """
                SELECT levels FROM classTB WHERE name='%s'
                """ % i
            )
            result = json.loads(cursor.fetchall()[0][0])
            print(json.dumps(result,indent=4))

            selectedLevel = courseData['levels'][i]
            courseData['levels'][i] = {}

            
            for j in selectedLevel:
                courseData['tableLevels'].append(i+j)
                if courseData['levels'][i].has_key(j[0]):
                    courseData['levels'][i][j[0]][j[2]] = result[i][j[0]][j[2]]
                else : 
                    courseData['levels'][i][j[0]] = {}
                    courseData['levels'][i][j[0]][j[2]] = result[i][j[0]][j[2]]
        
        # part 2 insert level into classTB
        pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        # a = json.dumps(courseData['levels'])
        
        # print('randomChoice')
        # print(random.sample(pool,5))
    
        ################# HERE occure BUG!
        print(json.dumps(courseData,indent=4))
    
        cursor.execute(
            """  
            INSERT INTO classTB(name, levels ,description, exp, type, public, NO, developer)
            VALUES('%s', '%s','%s', %s, '%s', %s, '%s', '%s')
            """ % (courseData['name'], json.dumps(courseData['levels']),courseData['description'], '0', 'custom', '0' , ''.join(random.sample(pool, 5)), courseData['developer'])

        )

        # db.commit()

        # part 3 create course table

        tableInstruction = []

        for i in courseData['tableLevels']:
            tableInstruction.append(i + ' JSON')
        tableInstruction = ' , '.join(tableInstruction) 

        cursor.execute("""create table %s(%s);""" % (courseData['name'],tableInstruction))


        db.commit()
        db.close()


    def post(self,**kwargs):
        request = self.request
        arguments = request.arguments()
        db = connect_to_cloudsql()
        cursor = db.cursor()

        if len(kwargs) == 1 : 
            print("request.get('user')",request.get('user'))
            cursor.execute(
                """
                SELECT courses,gameID FROM users WHERE email='%s'
                """ % request.get('user')
            )
            data = cursor.fetchall()
            GameID = data[0][1]
            result = list(json.loads(data[0][0]))
            result.append(request.get('course'))
            print(result)
            cursor.execute(
                """
                UPDATE users SET courses='%s' WHERE email='%s'
                """ % (json.dumps(result),request.get('user'))
            )
            
            cursor.execute(
                """
                INSERT INTO %s(ID) VALUES('%s')
                """
                % (request.get('course'), GameID)
            )
            # db.commit()
            db.close()
            return self.response.out.write('successful')
        elif len(kwargs) == 2 : 
            print(json.dumps(kwargs, indent=4))
            courseData = json.loads(self.request.body)
            courseData['developer'] = kwargs['user']
            print(json.dumps(courseData, indent=4))
            self.__creatCourse(courseData)
    def get(self,**kwargs):
        # print('\n\n---\n\n')
        # print(kwargs)
        db = connect_to_cloudsql()
        cursor = db.cursor()
        if(len(kwargs.keys()) == 0):
            """
            if kwargs has no keys, the request is send query to server for public course
            """
            cursor.execute("""
            SELECT *  FROM classTB WHERE type='official';
            """)
            result = cursor.fetchall()
            result = self.__CourseToJSON(result)
            self.response.headers['Content-Type'] = 'application/json'
            return self.response.out.write(json.dumps(result,indent=4))

        else:
            user = kwargs['user']
            cursor.execute(
                """
                SELECT courses,gameID FROM users WHERE email='%s'
                """ % user
            )
            result = cursor.fetchall()
            # print('\n\n---\n\n')
            # print(result[0][0])
            # print('\n\n')
            userCourse = json.loads(result[0][0])
            userCourse = self.__getUserTaskData(userCourse)
            # print(userCourse)
            # userCourse = result[0][0]
            userID = result[0][1]
            
            # return self.response.out.write('%s' % result)
            if kwargs['request'] == 'search':
                """
                means that searching the course user didn't participate in
                """
                cursor.execute(
                    """
                    SELECT courses FROM users WHERE email='%s';
                    """ % (user)
                )
                
                result = json.loads(cursor.fetchall()[0][0])
                result = set(result)
                coursesList = set(self.__searchCourse())
                coursesList = list(coursesList.difference(result))
                
                
                
                returnData = self.__getUserTaskData(coursesList)
                # for i in Courseresult:
                #     if not i[0] in userCourse:
                #         returnData.append({
                #             "name": i[0],
                #             "description":i[1]
                #         })
                # print(json.dumps(returnData,indent=4))
                self.response.headers['Content-Type'] = 'application/json'
                return self.response.out.write(json.dumps(returnData,indent=4))

            elif kwargs['request'] == 'userTask':
                courseData = []
                print('\n\n\nuserCourse')
                print(json.dumps(userCourse,indent=4))
                print('\n\n\n')
                for i in userCourse:
                    finish = 0
                    failed = 0
                    result = finishOrNot(i['name'],userID)
                    gameKeys = result.keys()
                    for j in gameKeys:
                        finish += len(result[j]['finish'])
                        failed += len(result[j]['failed'])
                    i["url"] = "&user=%s&task=%s" %(str(userID),i["name"])
                    i["rate"] = round((float(finish) / float(failed + finish)), 3)
                self.response.headers['Content-Type'] = 'application/json'
                self.response.out.write(json.dumps(userCourse,indent=4))
                pass
                
class GameBackendHandler(webapp2.RequestHandler):

    def checkFinishTask(self, task, user, actionList, level):
        """
        if time allow, it should using sql JSON function to update value
        """
        db = connect_to_cloudsql()
        cursor = db.cursor()
        cursor.execute(
            """
            SELECT finished FROM %s WHERE ID='%s';
            """
            % (task, user)
        )
    
        result = json.loads(cursor.fetchall()[0][0])
        finishedTask = set(result.keys())
        
        sortedList = sorted(actionList, key=lambda x : x['time'],)
        
        endOfTaskAction = 0
        for i in range(len(sortedList)):
            if(re.search(r'Success',sortedList[i]['action']) != None):
                endOfTaskAction = i
        
        if(not endOfTaskAction):
            return

        deltaTime = actionList[endOfTaskAction]['time'] - actionList[0]['time']
        print(deltaTime)
        
        if(level in finishedTask):
            if result[level] < deltaTime:
                result[level] = deltaTime
                cursor.execute(
                    """
                    UPDATE %s SET finished='%s' WHERE ID='%s';
                    """
                    % (task, json.dumps(result), user)
                )
                db.commit()
                return True
        else:
            result[level] = deltaTime
            cursor.execute(
            """
            UPDATE %s SET finished='%s' WHERE ID='%s';
            """
            % (task, json.dumps(result), user)
            )
            db.commit()
            return True

        
        
        return False
        

    def extractXML(self,xmlStr):
        pattern = r'\sxmlns=\\?"http://www.w3.org/1999/xhtml\\?"'
        xmlStr = re.sub(pattern,'',xmlStr)
        # print("*"*50 + 'extractXML' + '*' * 50)
        # print(xmlStr)
        root = ET.XML(xmlStr)
        # xml = ET.tostring(root, encoding='unicode',method='xml')
        return self.extract(root)

    def extract(self,element):
        data = dict()
        data["t"] = element.tag
        data["a"] = element.attrib
        if element.text is not None:
            data["tx"] = element.text
        else:
            data["tx"] = ""
        if(len(element) == 0):
            data["c"] = []
            return data
        else:
            data["c"] = []
            for child in element:
                data["c"].append(self.extract(child))
            return data

    def get(self,**kwargs):
        """
        /backend/<user>/<request>
        Needs login check!!!!
        """
        print(self.request.cookies)
        if self.request.cookies.get('login') == 'TRUE':
            db = connect_to_cloudsql()
            cursor = db.cursor()
            user = kwargs['user']
            sql = """
            SELECT identity FROM users WHERE email='%s'
            """ % (user)
            try:
                cursor.execute(sql)
            except:
                raise TypeError(sql)
            result = cursor.fetchall()

            if(len(result) > 0 and result[0][0] == 'teacher'):
                print('I am a teacher')
            else:
                return self.response.set_status(404)

            if kwargs.has_key('request') and kwargs['request'] == 'courses':
                cursor.execute("""
                SELECT * FROM classTB WHERE developer = "%s"
                """ % (kwargs['user']))
                result = cursor.fetchall()
                self.response.headers['Content-Type'] = 'application/json'
                return self.response.out.write(json.dumps(result,indent=4))
            for key,item in kwargs.iteritems():
                print('key is %s item is %s' % (key,item))

            if kwargs.has_key('request') and kwargs['request'] == 'members':
                cursor.execute("""
                SELECT ID FROM %s
                """ % (kwargs['course_id']))
                result = cursor.fetchall()
                self.response.headers['Content-Type'] = 'application/json'
                return self.response.out.write(json.dumps(result, indent=4))
            else:
                db.commit()
                db.close()

                return self.response.out.write(template.render('templates/backend/teacher1.html',''))
        else:
            return webapp2.redirect('/')

    def post(self,**kwargs):

        if(kwargs.has_key('task')):
            request = self.request
            task = kwargs['task']
            user = kwargs['user']
            
            gamedata = json.loads(request.body)
            # print(json.dumps(gamedata,indent=4,encoding='utf'))
            # print('-'*50)
            # print('*' * 30 + 'Action' + '*'*30)
            action = json.loads(gamedata["rows"][0]["json"]["action"])
            
            # print(action)
            # print(json.dumps(action,indent=4))
            # print('-'*50)
            # print('*' * 30 + 'Action' + '*'*30)
            code = json.loads(gamedata["rows"][0]["json"]["blockVersion"])
            # print(json.dumps(code,indent=4))
            level = int(gamedata["rows"][0]["json"]["level"])
            # here fix the level bug
            level = (str(int(math.ceil(float(level) / 3))) + '_' + str(int(float(level) - math.ceil(float(level) / 3) * 3 + 3 )))
            update = self.checkFinishTask(task, user, action, 'Debugging%s' % level)

            # level = (str(level // 3 + 1) + '_' + str(level - (level//3 * 3)))
            # print('level is ',level)
            print('update is ', update)
            if update:
                db = connect_to_cloudsql()
                ######################################################
                # Please Do Not fix this conflict while you merge or pull the git repo
                # Here is to store the blockly code of user 
                for i in code:
                    i['xml'] = self.extractXML(i['xml']) # transfer xml to json
                    action.append(i)
                ######################################################
                cursor = db.cursor()
                cursor.execute(
                    """
                    UPDATE %s SET Debugging%s = '%s' WHERE ID='%s'
                    """
                    % (task,level,json.dumps(action),user)
                )
                db.commit()
            
        if(kwargs.has_key('user_name')):
            db = connect_to_cloudsql()
            cursor = db.cursor()
            course_id = kwargs['course_id']
            user_name = kwargs['user_name']
            try:                

                # update user's course data
                cursor.execute(
                    """
                    SELECT courses from users where name='%s';
                    """
                    % (user_name)
                )
                result = cursor.fetchall()
                print(result)
                print(type(result[0][0]))
                print(result[0][0])
                result = result[0][0].split(']')[0] + ', "' + course_id + '"]'
                print(result)
                cursor.execute(
                    """
                    UPDATE users SET courses='%s' where name='%s'; 
                    """
                    % (result, user_name)
                )


                # update class table
                print('\n')
                print(course_id + user_name)
                cursor.execute(
                    """
                    INSERT INTO %s(ID) values('%s');
                    """
                    % (course_id, user_name)
                )
                print('after ')
            except:
                print('none')
            db.commit()

class StatisticHandler(webapp2.RequestHandler):
    def get(self, **kwargs):
        pass
        
class backTrack(webapp2.RequestHandler):

    def fillXML(self,xmlJson):
        """
        fill xml type blockly code

        parameter : 
            xmlJson : store or obtain in SQL
        """

        xmldata = self.fill(xmlJson)
        pattern = r'<xml>'
        xmldata = re.sub(pattern,'<xml xmlns="http://www.w3.org/1999/xhtml" >',xmldata)
        return xmldata

    def fill(self,data):
        """
        fill the xml 
        """
        xml = '<' + data["t"]
        atrkey = data['a'].keys()
        for i in atrkey:
            xml += ' '+ str(i) + '="%s"' % data['a'][i]
        xml += '>'
        xml += data['tx']
        for i in data['c']:
            xml += self.fill(i)
        xml += '</%s>' % data['t']
        return xml
    
    def get(self,**kwargs):
        level = int(kwargs['level'])
        # if here occure conflict, do not fix!
        level = (str(int(math.ceil(float(level) / 3))) + '_' + str(int(float(level) - math.ceil(float(level) / 3) * 3 + 3 ))) # fix the level bug
        print('level is ' + level)
        task = kwargs['task']
        user = kwargs['user']
        
        db = connect_to_cloudsql()
        cursor = db.cursor()
    
        cursor.execute(
            """
            SELECT Debugging%s FROM %s WHERE ID='%s'
            """ %(level,task,user)
        )
        result = cursor.fetchall()
        try:
            result = json.loads(result[0][0])
            result = sorted(result,key=lambda x : x["time"]) # sort the action
        except:
            result = []
        # result = [i["action"] for i in result]
        print('\n\n\n' + '*'*50 + 'result' + '*'*50)
        print(json.dumps(result,indent=4))
        action = []
        blockVer = []
        pattern = r'_\w{0,}' #to match showFailText
        for i in result:
            try:
                string = i['action']
                if(re.search(pattern,string) != None):
                    string = re.sub(pattern, '', string)
                action.append(string)
            except KeyError as e:
                blockVer.append(self.fillXML(i['xml']))

        result = []
        blockPos = 0
        try:
            for i in action:
                if i == 'editBlock':
                    result.append({
                        i : blockVer[blockPos]
                    })
                    blockPos += 1
                else:
                    result.append({
                        i : ''
                    })
        except Exception as e:
            print('block pos ', blockPos)
            print(blockVer)
        print('-'*30 + 'result' + '-'*30)
        print(result)
        self.response.headers['Content-Type'] = 'application/json'
        return self.response.out.write(json.dumps(result,indent=4))
        
    def post(self):
        pass

class Notice(webapp2.RequestHandler):
    def get(self,**kwargs):
        """
        GET the user's notice
        """
        # if self.request.cookies.get('login') == 'TRUE':

        pass

    def post(self,**kwargs):
        print(kwargs)
        if(kwargs['mode'] == 'invite'):
            # print(datetime.datetime.now().date())
            requestData = json.loads(self.request.body)
            requestData['date'] = str(datetime.datetime.now().date())
            requestData['show'] = 'false'
            print(json.dumps(requestData,indent=4))
            db = connect_to_cloudsql()
            cursor = db.cursor()
            cursor.execute(
                """
                UPDATE users SET notice=JSON_ARRAY_APPEND(notice, '$', '%s');
                """
                % json.dumps(requestData)
            )
            db.commit()
        pass



LANGUAGE_API = '/language/'

app = webapp2.WSGIApplication([
    webapp2.Route(r'/', handler=MainPage, name='home'),
    webapp2.Route(r'/user', handler=UserPage, name='user'),
    webapp2.Route(r'/user/<email>', handler=Email, name='email'),
    webapp2.Route(r'/user/<email>/<item>', handler=Email_Item, name='email_item'),
    webapp2.Route(r'/test', handler=TestPage, name='test'),
    webapp2.Route(r'/language/<page>/<lang>', handler=LangPage, name='lang'),
    webapp2.Route(r'/register', handler=Register, name='register'),
    webapp2.Route(r'/login', handler=Login, name='login'),
    webapp2.Route(r'/t/<a1>/<a2>', handler=UrlTest, name='t'),
    webapp2.Route(r'/record', handler=RepeatCheck, name='repeatcheck'),
    webapp2.Route(r'/ip', handler=IPtest, name='iptest'),
    webapp2.Route(r'/log', handler=LogPage, name='log'),
    webapp2.Route(r'/token',handler=dataEncryption,name='encryptopn'),
    webapp2.Route(r'/GameRecord',handler=GameData,name='gameRecord'),
    webapp2.Route(r'/GameRecord/<user>',handler=GameData,name='gameRecord'),
    webapp2.Route(r'/backend/statistic/<user>',handler=StatisticHandler,name='statistic'),
    webapp2.Route(r'/backend/<user>',handler=GameBackendHandler,name='Game'),
    webapp2.Route(r'/backend/<user>/<request>',handler=GameBackendHandler,name='GameCourses'),
    webapp2.Route(r'/backend/<user>/<request>/<course_id>',handler=GameBackendHandler,name='MemberHandler'),
    webapp2.Route(r'/backend/<user>/<request>/<course_id>/<user_name>',handler=GameBackendHandler,name='AddMemberHandler'),
    webapp2.Route(r'/class',handler=Class,name='Class'),
    webapp2.Route(r'/class/<user>',handler=Class,name='ParticipateCourse'),
    webapp2.Route(r'/class/<user>/<request>',handler=Class,name='CourseRequest'),
    webapp2.Route(r'/userGameData/<user>/<task>',handler=GameBackendHandler,name='userGameData'),
    webapp2.Route(r'/backTrack/<user>/<task>/<level>',handler=backTrack,name="backTrackData"),
    webapp2.Route(r'/notice/<mode>/<user>',handler=Notice,name="notice"),
    # webapp2.Route(r'/debugging/public', handler=DebugPublic, name='debuuging_punlic'),
    # webapp2.Route(r'/debugging/js', handler=LogPage, name='log'),

], debug=True)

# [END all]