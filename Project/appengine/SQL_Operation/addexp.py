import mysql.connector
import yaml
import json

config = yaml.load(open('./sql_config.yaml'))

mydb = mysql.connector.connect(
    host=config['mysqlhost'],
    user=config['mysqluser'],
    passwd=config['mysqlpasswd'],
    database=config['mysqldb']
)

mycursor = mydb.cursor()


"""
add new column to record exp
"""
# mycursor.execute(
#     """
#     ALTER TABLE users
#     ADD COLUMN exp INT AFTER level;
#     """
# )

mydb.commit()
