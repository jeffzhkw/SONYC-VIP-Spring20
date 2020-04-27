import React, { useEffect, useState } from "react";
import { auth, db } from "../service/firebase";

const DashBoard = () => {
    const[audios, setAudio] = useState([])
    const [user, setUser] = useState(auth().currentUser)
    let i = 0
    //handling read from database
    const readFromDB = async () => {
        try {
            // db.ref("audios").remove()
            //this price of code needs major rework. but it works for now so I'll keep
            db.ref("users/" + user.uid).on("value",snapshots => {
                let dbAudios = []
                snapshots.forEach((snap) => {
                    let key = snap.key
                    let uniqueKey = Object.keys(snap.val())[0] //work around
                    db.ref(`users/${user.uid}/${key}/${uniqueKey}`).on("value", snapshots => {
                        let meta = snapshots.val()
                        meta.uid = key
                        db.ref(`audios/${key}`).on("value", snapshots => {
                            console.log(key)
                            console.log(snapshots)
                            let uniqueKey = Object.keys(snapshots.val())[0] //work around
                            db.ref(`audios/${key}/${uniqueKey}`).on("value", snapshots => {
                                let fullData = {...meta, ...snapshots.val()}
                                dbAudios = dbAudios.concat(fullData)
                                setAudio(dbAudios)
                            })
                        })

                    })
                })

            })
        } catch(error) {
            console.log(error.message)
        }
    }

    return(
        <div>
            <button type = "button" onClick = {readFromDB}> Get data </button>
            <table>
                <tr>
                    <th> Audio </th>
                    <th> Name </th>
                </tr>
                {audios.map((audio) => 
                        (<Audio key = {audio.uid} name = {audio.name} 
                            blobURL = {audio.uid} data = {audio.data}
                        />)
                    )}
            </table>
        </div>
    )

}

const Audio = (props) => {
    const name = props.name
    const blobURL = props.blobURL
    const data = props.data
    const [start, setStart] = useState(false)
    const [stop, setStop] = useState(false)
    const newUrl = URL.createObjectURL(new Blob([data], { type: "audio/wav" }));
    // const test = newUrl.split('blob:')[1]
    // console.log(test)

    const onClickStart = (event) => {
        event.preventDefault()
        if(stop == true) {
            setStop(false)
        }
        setStart(true)
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
        <tr>   
            <td>
                <audio src = {`${newUrl}`} controls = "constrols" type = "audio/mp3" />
            </td>
            <td> {name} </td>
        </tr>
    )
}

export default DashBoard