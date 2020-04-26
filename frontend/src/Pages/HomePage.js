import React, {useState} from 'react';
import './HomePage.css';
import sonyc from '../img/sonyc.jpeg'
import { Link, useHistory } from 'react-router-dom';
const HomePage = () => {
    const history = useHistory()
    return(
        <>
            <div class="topnav">
                <button onClick = {() => history.push('/')}>Home</button>
                <button onClick = {() => history.push('/audio')}>Audio</button>
                <button onClick = {() => history.push('/dashboard')}>Dashboard</button>
                <button onClick = {() => history.push('/about')}>About Us</button>
                <div class = "topnav-right">
                    <button onClick = {() => history.push('/login')} class = "loginButton"> Login </button>
                </div>
            </div>
            <img src = {sonyc} class = "image"></img>
        </>
    )
}

export default HomePage;