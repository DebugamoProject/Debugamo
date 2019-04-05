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


mycursor.execute(

    """
    UPDATE classTB SET levels = '%s' WHERE name="test"
    """ % json.dumps(a)
)

mydb.commit()
mydb.close()