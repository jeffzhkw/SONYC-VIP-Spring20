import _sqlite3
import logging

sql_create_user_table = '''
    CREATE TABLE IF NOT EXISTS USER(
        USERID INTEGER PRIMARY KEY AUTOINCREMENT, 
        USERNAME TEXT NOT NULL,
        PASSWORD TEXT NOT NULL
    )
'''
sql_create_audio_table = '''
    CREATE TABLE IF NOT EXISTS RECORDING (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME TEXT NOT NULL, 
    DATA TEXT NOT NULL,
    FOREIGN KEY(AUTHOR) REFERENCES USER(USERID))
'''

sql_insert_user = '''
    INSERT INTO USER(USERNAME, PASSWORD) VALUES (?,?)
'''

sql_insert_audio = '''
    INSERT INTO RECORDING(NAME, DATA, AUTHOR)
    VALUES (?, ?, ?) 
'''

sql_select_all = '''
    SELECT * FROM RECORDING
'''

sql_select_with_name = '''
    SELECT * FROM RECORDING WHERE NAME = ?
'''

sql_select_with_name_user = '''
    SELECT * FROM RECORDING WHERE USERNAME = ?
'''

def get_connection():
    try:
        conn = _sqlite3.connect("audio.db")
        return conn
    except:
        logging.error("Exception occurs in getting connection")

def create_table(table):
    try:
        connection = get_connection()
        if table is 'user':
            connection.execute(sql_create_user_table)
            logging.info("Creating user table successful")
        else:
            connection.execute(sql_create_audio_table)
            logging.info("Creating recording table successful")
        connection.close()
    except:
        logging.error("Exception occurs in creating table")
        print("Exception occurs in creating table")

# @Todo: Add condition to check if table exist
def insert_into_db(recording):
    try:
        create_table('recording')
        connection = get_connection()
        cursor = connection.cursor()
        dbRecording = (recording.name, recording.data)
        cursor.execute(sql_insert_audio, dbRecording)
        connection.commit()
        connection.close()
        logging.info("Inserting into recording table successful")
        return "success"
    except:
        print("Exception in inserting into the db")

def getting_audio(name):
    try:
        connection = get_connection()
        cursor = connection.cursor()
        if name is None:
            cursor.execute(sql_select_all)
            rows = cursor.fetchall()
            print(rows)
        else:
            cursor.execute(sql_select_with_name, [name])
            rows = cursor.fetchall()
            print(rows)
        connection.close()
    except:
        logging.error("Exception occurs in getting audio from db")
        print("Exception in getting audio from db")

def getting_password(username):
    try: 
        conn = get_connection()
        cursor = connection.cursor()
        rows = None
        if username is not None:
            cursor.execute(sql_select_with_name_user, username)
            rows = cursor.fetchall()
        conn.commit()
        conn.close()
        if rows is None:
            return None
        return rows[2]
    except:
        logging.error("Exception occurs in getting user password")
        print("Exception in user database")

def inserting_into_user(user):
    try: 
        conn = get_connection()
        cursor = connection.cursor()
        if username is not None:
            cursor.execute(sql_insert_user, user)
            logging.info("Successfully creating a new user")
            print(rows)
        conn.commit()
        conn.close()
    except:
        logging.error("Exception occurs in inserting into user database")
        print("Exception in inserting into user database")


