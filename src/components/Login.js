import React from 'react';
import '../styles/login.css';
import { Button } from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        var auth = getAuth();
        var provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(res => {
            console.log(res);
            dispatch({
                type: actionTypes.SET_USER,
                user: res.user
            })
        }).catch(err => {
            console.log(err.message);
        })
    };

    return (
        <div className='login'>
            <div className='login__container'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' />
                <div className='login__text'>
                    <h1>Sign In To Whatsapp</h1>
                </div>
                <Button type='submit' onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login