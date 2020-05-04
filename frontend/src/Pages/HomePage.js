import React, {useState} from 'react';
import './HomePage.css';
import logo from '../img/logo480.png'
import { Link, useHistory } from 'react-router-dom';
const HomePage = () => {
    const history = useHistory()
    return(
        <div>
            <div class="topnav">
                <div>
                    <img src = {logo} onClick = {() => history.push('/')}></img>
                </div>
                <div>
                    <div onClick = {() => history.push('/audio')}>Audio</div>
                    <div onClick = {() => history.push('/dashboard')}>Dashboard</div>
                    <div onClick = {() => history.push('/about')}>About Us</div>
                    <div onClick = {() => history.push('/login')}> Login </div>
                </div>
            
            </div>
            <div class = "heroImg">
                <div class = "overlay">
                    <div class = "text">
                        <h1>SONYC</h1>
                        <h2>Sounds of New York City</h2>
                        <div onClick = {() => history.push('/signup')}> Get Started </div>
                    </div>
                    
                    {/* <img src = {sonyc} class = "image"></img> */}
                </div>
            </div>
            
        </div>
    )
}

export default HomePage;