import React, { useEffect, useState } from "react";
import { auth, db } from "../service/firebase";

const DashBoard = () => {
    const[audios, setAudio] = useState([])
    const size = 5 //keep it small

    //handling read from database
    const readFromDB = async () => {
        try {
            db.ref("audios").on("value",snapshots => {
                let tmpAudios = []
                for(i = 0; i < size; i++) {
                    tmpAudios.push(snapshots[i].val())
                }
                setAudio(tmpAudios)
            })
        } catch(error) {
            console.log(error.message)
        }
    }

    return(
        <div>
            {audios.forEach((audio) => {
                return <Audio name = {audio.name} blobURL = {audio.blobURL} audioFile = {audio.audioFile} />
            })}
            <button type = "button" onClick = {readFromDB}> Get data </button>
        </div>
    )

}

const Audio = (props) => {
    const name = props.name
    const blobURL = props.blobURL
    const audioFile = props.audioFile
    const [start, setStart] = useState(false)
    const [stop, setStop] = useState(false)

    const onClickStart = (event) => {
        event.preventDefault()
        if(stop == true) {
            setStop(false)
        }
        setStart(true)
        //play the audio here
    }

    const onClickStop = (event) => {
        event.preventDefault()
        if(start == true) {
            setStart(false)
        }
        setStop(true)
        //stop play the audio part here
    }

    return(
        <div>
            <div name = "title"> {name} </div>
            <audio src={blobURL} controls="controls" />
            <button onClick = {onClickStart}> Play </button>
            <button onClick = {onClickStop}> Stop </button>
        </div>
    )
}

export default DashBoard