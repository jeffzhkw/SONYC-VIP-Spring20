import React, { useEffect, useState } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const HomePage = () => {
  const [isRecording, setRecording] = useState(false);
  const [blobURL, setblobURL] = useState("");
  const [isBlocked, setBlocked] = useState(false);
  const API_URL = "http://127.0.0.1:5000/upload";

  
  const addStartButton = () => {
    const startButton = (
      <div id="start" className="start" onClick={start}></div>
    );
    ReactDOM.render(startButton, document.getElementById("recordButton"));
  };

  const addStopButton = () => {
    const stopButton = (
      <div id="stop" className="stop" onClick={stop}></div>
    );
    ReactDOM.render(stopButton, document.getElementById("recordButton"));
  };

  const start = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setRecording(true);
        })
        .catch((e) => console.error(e));
    }

    addStopButton();
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        let wavFile = new FormData();
        wavFile.append("name", "test.wav");
        wavFile.append("data", buffer);
        //@ToDo: Change this to proper domain name
        fetch(API_URL, {
          method: "POST",
          body: wavFile,
        }).then((response) => {
          console.log(response.json());
        });
        setblobURL(blobURL)
        setRecording(false)
      })
      .catch((e) => console.log(e));

    addStartButton();
  };

  useEffect(() => {
    navigator.getUserMedia(
        {audio : true},
        () => {
            console.log("Permission Granted");
            setBlocked(false)
        },
        () => {
            console.log("Permission Denied");
            setBlocked(true);
        }
    );
  });

  const history = useHistory();

    return (
        <div className="app">
        <Router>
            <div className="navBar">
                <button className="loginButton" onClick = {() => history.push('/login')}> Login </button>
            </div>


            <div className="record-wrapper">
            <div id="recordButton">
                <div id="start" className="start" onClick={start}></div>
            </div>
            </div>

            <header className="record-window">
            <audio src={blobURL} controls="controls" />
            <button onClick={start} disabled={isRecording}>
                Record
            </button>
            <button onClick={stop} disabled={!isRecording}>
                Stop
            </button>
            </header>

            <div className="loud-indicator"></div>
        </Router>
        </div>
    );
  }

export default HomePage;
