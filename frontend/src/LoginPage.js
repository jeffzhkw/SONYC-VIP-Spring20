import React, {useState} from 'react';
import './App.css';
import "./LoginPage.css";
import ReactDOM from 'react-dom';

const Login = () => {
    const [userName, setUsername] = useState('')
    const [password, setPwd] = useState('')

    const API_URL = "http://127.0.0.1:5000/login";
    const handleUser = (username) => {
        setUsername(username)
    }

    const handlePassword = (password) => {
        setPwd(password)
    } 

    const handleSubmit = (event) => {
        let user = new FormData();
        if(userName === '' || password === '') {
            console.log("Inputs are empty")
        }
        user.append('username', userName)
        user.append('password', password)
        event.preventDefault();
        // fetch(API_URL, {
        //     method: "POST",
        //     body: user,
        //   }).then((response) => {
        //     console.log(response.json());
        //   });
    }
    
    return(
        <div>
        <div className="navBar">

        </div>

        <div className = "loginElem">
            <form onSubmit={handleSubmit}>
            
            <label>
                <span>Username:</span>
                <input type="text" onChange={handleUser} />
            </label>

            <label>
                <span>Password:</span>
                <input type="text" onChange={handlePassword} />
            </label>
            
            
            <input type="submit" value="Login" />
            
            </form>

        </div>

        </div>
        
        
        
    )
}

export default Login;