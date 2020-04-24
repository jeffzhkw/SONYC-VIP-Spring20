import React, {useState} from 'react';
import { BrowserRouter as Link} from "react-router-dom";
import '../App.css';
import { signin } from '../service/firebase';
import { signInWithGoogle } from '../utils/auth';

/**
 * Remove unecessary login, change to google for all
 */
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await signin(email, password)
        } catch(error) {
            setError(error.message)
        }
    }

    const googleSignIn = async() => {
        try {
            await signInWithGoogle();
        } catch(error) {
            setError(error.message)
        }
    }

    return(
        <div>
            <form autoComplete = "off" onSubmit = {handleSubmit}>
                <h1>Login to <Link to= '/'> SONYC </Link></h1>
                <p> Fill in the form below to sign up for an account</p>
                <div>
                    <input 
                        placeholder = "Email"
                        name = "email"
                        type = "email"
                        onChange = {e => setEmail(e.target.value)}
                        value = {email}
                    />
                </div>
                <div>
                    <input 
                        placeholder = "Password"
                        name = "password"
                        type = "password"
                        onChange = {e => setPassword(e.target.value)}
                        value = {password}
                    />
                </div>
                <button type="submit">Login</button>
                <p>Or</p>
                <button onClick={googleSignIn} type="button">
                    Sign in with Google
                </button>
            </form>
        </div>
    )
}

export default Login;