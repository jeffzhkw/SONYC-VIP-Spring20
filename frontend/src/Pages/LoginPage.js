import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import './LoginPage.css';
import { signInWithGoogle, signOutWithGoogle } from '../utils/auth';

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

    const googleSignOut = async() => {
        try {
            await signOutWithGoogle()
        } catch(error) {
            setError(error.message)
        }
    }

    return(
        <> 
            <div class= "col s12 m6 offset-m3 center-align">
                <button onClick = {signInWithGoogle} class="oauth-container btn darken-4 white black-text">
                <div class="left">
                <img alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                </div>
                    Login with Google
                </button>
        </div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
        </>
    )
}

export default Login;