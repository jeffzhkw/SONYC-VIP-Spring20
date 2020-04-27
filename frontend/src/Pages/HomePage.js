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
                <button onClick = {() => history.push('/login')}> Login </button>
                <button onClick = {() => history.push('/signup')}> Get Started </button>
            </div>
            <img src = {sonyc} class = "image"></img>
        </>
    )
}

export default HomePage;