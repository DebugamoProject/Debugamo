import mysql.connector
import yaml
import json

config = yaml.load(open('../../../sql_config.yaml','r'))


mydb = mysql.connector.connect(
    host=config['mysqlhost'],
    user=config['mysqluser'],
    passwd=config['mysqlpasswd'],
    database=config['mysqldb']
)

mycursor = mydb.cursor()

a = """
{"Debugging": {"1": {"1": "Learn Move", "2": "Learn Grab and Drop"}, "2": {"1": "Learn Goto", "3": "Evaluation"}, "3": {"3": "Evaluation"}, "4": {"2": "Learn Function"}, "5": {"1": "Learn If-Then"}, "6": {"1": "Learn For Loop", "3": "Evaluation"}}}
"""

a = json.loads(a)


mycursor.execute(

    """
    UPDATE classTB SET levels = '%s' WHERE name="test"
    """ % json.dumps(a)
)

mydb.commit()
mydb.close()