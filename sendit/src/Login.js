import { Button } from '@material-ui/core';
import React from 'react';
import "./Login.css";
import {button} from "@material-ui/core";
import {auth, provider} from "./firebase";

function Login() {

    const signIn = () =>{
        auth 
            .signInWithPopup(provider)
            .then(result => {
                console.log(result);
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
