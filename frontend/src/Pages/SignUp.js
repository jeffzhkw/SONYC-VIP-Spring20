import React, {useState} from 'react';
import '../App.css';
import { signin, signup } from '../service/firebase';
import { Link } from 'react-router-dom';

/**
 * @ToDo: Add error handling
 *        Adding reroute for singin
 */
const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await signup(email, password)
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;