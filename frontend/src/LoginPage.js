import React, {useState} from 'react';
import './App.css';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPwd] = useState("")

    const API_URL = "http://127.0.0.1:5000/login";

    // Add error handling later
    const handleSubmit = (event) => {
        let user = new FormData();
        user.append('username', username)
        user.append('password', password)
        event.preventDefault();
        fetch(API_URL, {
            method: "POST",
            body: user,
          }).then((response) => {
            console.log(response.json());
          });
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <div>
            <label>
                Username:
                <input type="text" onChange={e => setUsername(e.target.value)} />
            </label>
            </div>
            <div>
            <label>
                Password:
                <input type="text" onChange={e => setPwd(e.target.value)} />
            </label>
            </div>
            <div>
                <button type="submit" value="Submit">
                    Submit
                </button>
            </div>
        </form>
        </div>
    )
}

export default Login;