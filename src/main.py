from flask import Flask, request
from src import store

app = Flask(__name__)


@app.route('/')
def hello_world():
    store.record()
    return 'Hello, World!'

@app.route('/audio', methods = ['POST'])
def upload():
    if(request.methods == 'POST'):
        return "" #handler for audio processing here

counter = 0
@app.route('/record', methods = ['POST'])
def record():
    global counter #turn counter to global variable
    filename = "Audio" + counter + '.wav';
    store.record(filename)
    store.playback(filename)
    counter += 1

app.run()