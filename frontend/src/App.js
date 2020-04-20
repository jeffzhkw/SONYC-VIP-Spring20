import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    };
  }
  addStartButton = () =>{
    const startButton = <div id = "start" className = "start" onClick = {this.start}></div>;
    ReactDOM.render(startButton, document.getElementById('recordButton'))
  }

  addStopButton = () =>{
    const stopButton = <div id = "stop" className = "stop" onClick = {this.stop}></div>;
    ReactDOM.render(stopButton, document.getElementById('recordButton'))
  }


  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }

    this.addStopButton();

  
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        let wavFile = new FormData();
        wavFile.append('name', 'test.wav');
        wavFile.append('data', buffer);
        //@ToDo: Change this to proper domain name
        const API_URL = "http://127.0.0.1:5000/upload";
        fetch(API_URL, {
          method: 'POST',
            body: wavFile
        }).then(response => {
          console.log(response.json())
        })
        this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
      
      this.addStartButton();

  };

  componentDidMount() {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  
  }

  render(){
    return (
      <div className="app">
        <div className = "navBar">

          <div className = "loginButton">
            Login
          </div>
        </div>
        
          <div className = "record-wrapper">
            <div id = "recordButton">
              <div id = "start" className = "start" onClick = {this.start}></div>
            </div>
          </div>
        
        <header className="record-window">
          
          <audio src={this.state.blobURL} controls="controls" />
          <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
          <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
        </header>

        <div className = "loud-indicator">

        </div>
        
      </div>

      
    );
  }
}

export default App;
