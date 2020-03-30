import _sqlite3

sql_create_audio_table = '''
    CREATE TABLE IF NOT EXISTS recording (
    id integer Primary Key autoincrement, 
    name text NOT NULL, 
    length float NOT NULL,
    data text NOT NULL
'''

sql_insert_audio = '''
    INSERT INTO recording(name, length, data)
    VALUES (?, ?, ?) 
'''

def get_connection():
    conn = _sqlite3.connect("audio.db")
    return conn

def create_table(conn):
    conn.execute(sql_create_audio_table)

def insert_into_db(conn, recording):
    conn.execute(sql_insert_audio, recording)
    conn.commit()

def close_db(conn):
    return conn.close()