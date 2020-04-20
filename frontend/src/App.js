import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MicRecorder from "mic-recorder-to-mp3";
import Login from './LoginPage';
import HomePage from './HomePage';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: "",
      isBlocked: false,
    };
  }
  addStartButton = () => {
    const startButton = (
      <div id="start" className="start" onClick={this.start}></div>
    );
    ReactDOM.render(startButton, document.getElementById("recordButton"));
  };

  addStopButton = () => {
    const stopButton = (
      <div id="stop" className="stop" onClick={this.stop}></div>
    );
    ReactDOM.render(stopButton, document.getElementById("recordButton"));
  };
  start = () => {
    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }

    this.addStopButton();
  };

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        let wavFile = new FormData();
        wavFile.append("name", "test.wav");
        wavFile.append("data", buffer);
        //@ToDo: Change this to proper domain name
        const API_URL = "http://127.0.0.1:5000/upload";
        fetch(API_URL, {
          method: "POST",
          body: wavFile,
        }).then((response) => {
          console.log(response.json());
        });
        this.setState({ blobURL, isRecording: false });
      })
      .catch((e) => console.log(e));

    this.addStartButton();
  };

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  }

  render() {
    return (
      <div className="app">
        <Router>
         <Switch>
           <Route path = "/" component = {HomePage} />
           <Route path = "/login" component = {Login} />
         </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
