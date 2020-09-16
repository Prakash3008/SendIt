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
                console.log(result);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/2019-01_BrandRefresh_Old-to-New-Final.gif"
                alt="" />
                <h1>Sign in to Slack</h1>
                <p>Slack.com</p>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login
