import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="",
    database="testdb"
)

mycursor = mydb.cursor()

# mycursor.execute("CREATE TABLE students (name VARCHAR(20),ID VARCHAR(20),password VARCHAR(50),email VARCHAR(100),school VARCHAR(50),birthday DATE)")

mycursor.execute("SHOW TABLES")
