import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="Iammy310075",
    database="testdb"
)

mycursor = mydb.cursor()

mycursor.execute(
"""
CREATE TABLE users (
    name VARCHAR(20),
    gameID VARCHAR(20),
    password VARCHAR(50),
    email VARCHAR(100),
    class INTEGER,
    identity INTEGER,
    birthday DATE
    )
"""
)

# mycursor.execute("SHOW TABLES")
