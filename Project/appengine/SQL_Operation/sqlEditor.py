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


#Step 1.
"""
I forgot to set default value of exp column.
If you are doing SQL operation, you could set default value = 0.

add new column to record exp
"""
# mycursor.execute(
#     """
#     ALTER TABLE users
#     ADD COLUMN exp INT AFTER level;
#     """
# )


#Step 2. (option if you don't set the default value as doing STEP 1)
"""
Set exp default value
"""
# mycursor.execute(
#     """
#     ALTER TABLE users
#     ALTER exp SET DEFAULT 0;
#     """
# )


# Step 3.
"""
Set level default value
"""
# mycursor.execute(
#     """
#     ALTER TABLE users
#     ALTER level SET DEFAULT 0;
#     """
# )

#Step 4.
"""
Add type of course(official/custom/.../whatever)
"""
# mycursor.execute(
#     """
#     ALTER TABLE classTB
#     ADD COLUMN type CHAR(11) AFTER description;
#     """
# )

#Step 5.
"""
Add exp of course which students get after finish course
"""
# mycursor.execute(
#     """
#     ALTER TABLE classTB
#     ADD COLUMN exp INT AFTER description;
#     """
# )

#Step 6.
"""
set the default value of exp of course
"""
# mycursor.execute(
#     """
#     ALTER TABLE classTB
#     ALTER exp SET DEFAULT 0;
#     """
# )


# Step 7.
"""
add exp and type for mission debugging
Warnning!!! You need to setup the chinese text encoding,
otherwise, the browser will diplay ? to replace chinese text.
"""
# mycursor.execute(
#     """
#     UPDATE classTB
#     SET exp="200" , type="official", description="修復Demo機器人的程式晶片，並完成任務解救所有被困住的小動物們"WHERE name="Debugging";
#     """
# )

# Step 8.
"""
add special task col for users;
"""
# mycursor.execute(
#     """
#     ALTER TABLE users
#     ADD COLUMN specialTask JSON AFTER courses;
#     """
# )

# Step 9.
"""
add notice column for users;
"""
# mycursor.execute(
#     """
#     ALTER TABLE users
#     ADD COLUMN notice JSON AFTER specialTask;
#     """
# )


# mycursor.execute(
   
#     """
#     UPDATE users SET notice = JSON_ARRAY_APPEND(notice, '$', '[3,2,2]') WHERE name='321';
#     """
# )




# result = mycursor.fetchall()
# print(result)

mydb.commit()
