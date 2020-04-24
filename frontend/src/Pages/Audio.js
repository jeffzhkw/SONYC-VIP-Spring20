import React, { useEffect, useState } from "react";
import "../App.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import MicRecorder from "mic-recorder-to-mp3";
import { auth, db } from '../service/firebase';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const HomePage = () => {
  const [isRecording, setRecording] = useState(false);
  const [blobURL, setblobURL] = useState("");
  const [isBlocked, setBlocked] = useState(false);
  const [user, setUser] = useState(auth().currentUser)
  const [Error, setError] = useState('')
  //may convert buffer to a file
  const [buffer, setBuffer] = useState([])

  const onSubmit = async(event) => {
    event.preventDefault();
    try {
      await db.ref('audios').push({
        uid: user,
        timestamp: Date.now(),
        url : blobURL,  
        audio : buffer
      })
    } catch(error) {
      setError(error.message)
      console.log(Error);
      
    }
  }
  
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
        setBuffer(buffer)
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

    return (
        <div className="app">
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
            <button onClick={onSubmit}>
                Submit
            </button>
            </header>

            <div className="loud-indicator"></div>
        </div>
    );
  }

export default HomePage;
