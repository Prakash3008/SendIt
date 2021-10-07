import { Button } from '@material-ui/core';
import React from 'react';
import "./Login.css";
import {auth, provider} from "./firebase";
import {useStateValue} from "./StateProvider";
import { actionTypes } from './reducer';


function Login() {
const [state, dispatch] = useStateValue();

    const signIn = () =>{
        auth 
            .signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    console.log("logged in")
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://firebasestorage.googleapis.com/v0/b/sendit-d1680.appspot.com/o/sendit_logo.png?alt=media&token=56497609-3725-4cea-8499-b14826623b83"
                alt="" />
                <h1>Sign in to SendIt</h1>
                <p>SendIt - A messaging platform</p>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login
