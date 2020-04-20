from flask import Flask, request
from recording import Recording
import setting_up as sql

app = Flask(__name__)

def make_recording(name, data):
    return Recording(name, data)

@app.route('/')
def main():
    return 'Hello, World!'

# @ToDo: Handling errors
@app.route('/upload', methods = ['POST'])
def upload():
    if request.method == 'POST':
        print(request.form)
        name = request.form['name']
        print(name)
        data = request.form['data']
        print(data)
        recording = make_recording(name, data)
        sql.insert_into_db(recording)
        return {"status": "200"}

# @ToDo Handling finding by name
@app.route('/retrieve', methods = ['GET'])
def retrieve():
    if request.method == 'GET':
        name = request.form['name']
        sql.getting_audio(name)
        return ""

app.run()