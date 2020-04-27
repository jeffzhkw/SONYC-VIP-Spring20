import React, { useEffect, useState } from "react";
import "../App.css";
import ReactDOM from "react-dom";
import MicRecorder from "mic-recorder-to-mp3";
import WaveSurfer from "wavesurfer.js";
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const Audio = () => {
  const [isRecording, setRecording] = useState(false);
  const [blobURL, setblobURL] = useState("");
  const [isBlocked, setBlocked] = useState(false);
  //const [user, setUser] = useState(auth().currentUser)
  const [Error, setError] = useState('')
  //may convert buffer to a file
  const [buffer, setBuffer] = useState([])
  const [name, setName] = useState('')
  const [id, setBlolbId] = useState("")


  const onSubmit = async(event) => {
    // event.preventDefault();
    // let uid = user.uid
    // try {
    //   await db.ref('users/' + uid + "/" + id).push({
    //       name : name,
    //       timestamp: Date.now()
    //   })
    //   await db.ref('audios/' + id).push({
    //     data : buffer
    //   })
    // } catch(error) {
    //   setError(error.message)
    //   console.log(Error);
    // }
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
    microphone.start();
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        const id = blobURL.split('http://localhost:3000/')[1]
        setBlolbId(id)
        //buffer here works but not blob
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



  var wavesurfer = WaveSurfer.create({
    container     : 'waveform',
    waveColor     : 'black',
    interact      : false,
    cursorWidth   : 0,
    plugins: [
      MicrophonePlugin.create()
    ]
  });
  
  wavesurfer.microphone.on('deviceReady', function(stream) {
      console.log('Device ready!', stream);
  });
  wavesurfer.microphone.on('deviceError', function(code) {
      console.warn('Device error: ' + code);
  });

  let microphone = wavesurfer.microphone;
  
  

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

            <div className="loud-indicator">
              <div id="waveform"></div>
            </div>
        
        </div>
    );
  }

export default Audio;
