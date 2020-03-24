import _sqlite3

sql_create_audio_table = '''
    CREATE TABLE IF NOT EXISTS recording (
    id integer Primary Key, 
    name text NOT NULL, 
    length float NOT NULL
'''

sql_insert_audio = '''
    INSERT INTO recording(id, name, length)
    VALUES (?, ?, ?) 
'''

conn = _sqlite3.connect("audio.db")
def get_connection():
    return conn

def create_table():
    conn.execute(sql_create_audio_table)

def insert_into_db(recording):
    conn.execute(sql_insert_audio, recording)
    conn.commit()

def close_db():
    return conn.close()