import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import './LoginPage.css';
import { signInWithGoogle } from '../utils/auth';

/**
 * Remove unecessary login, change to google for all
 */
const Login = () => {
    const [error, setError] = useState('');
    const history = useHistory()

    const googleSignIn = async() => {
        try {
            await signInWithGoogle();
        } catch(error) {
            setError(error.message)
        }
    }

    // return(
    //     <div>
    //         <form autoComplete = "off" onSubmit = {handleSubmit}>
    //             <h1>Login to <Link to= '/'> SONYC </Link></h1>
    //             <p> Fill in the form below to sign up for an account</p>
    //             <div>
    //                 <input 
    //                     placeholder = "Email"
    //                     name = "email"
    //                     type = "email"
    //                     onChange = {e => setEmail(e.target.value)}
    //                     value = {email}
    //                 />
    //             </div>
    //             <div>
    //                 <input 
    //                     placeholder = "Password"
    //                     name = "password"
    //                     type = "password"
    //                     onChange = {e => setPassword(e.target.value)}
    //                     value = {password}
    //                 />
    //             </div>
    //             <button type="submit">Login</button>
    //             <p>Or</p>
    //             <button onClick={googleSignIn} type="button">
    //                 Sign in with Google
    //             </button>
    //         </form>
    //     </div>
    // )

    return(
        <> 
            <div class= "signin-button">
            <button onClick = {googleSignIn}>
                <div class="left">
                <img alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                </div>
                    Login with Google
            </button>
        </div>
        <div class = "signup-link">
            <button onClick = {() => history.push('/signup')}> Get Started </button>
        </div>
        </>
    )
}

export default Login;