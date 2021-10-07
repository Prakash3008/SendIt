import React, {useState} from 'react';
import './Header.css';
import {Avatar} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import { useStateValue } from './StateProvider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {auth} from "./firebase";
import { actionTypes } from './reducer';
import { useHistory } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import Message from './Message'

function Header() {
const [{user}] = useStateValue();
const history = useHistory();
const [input, setInput] = useState('');
const signOut = () => {
    auth
    .signOut().then(function() { 
        alert("You have successfully logged out")
        history.push("/")
        window.location.reload(false);

      }).catch(function(error) {
        alert(error.message);
      });
      console.log("signed out")
}


    return (
        <div className="header">
            <div className='header__left'>
                <Avatar className="header__avatar" alt={user?.displayName} src={user?.photoURL} />
                <h3 className="space ">Welcome {user?.displayName}</h3>
                <AccessTimeIcon />
            </div>
            <div className='header__search'>
                <SearchIcon />
                <input placeholder="Search here!!!" name="search" value={input}
                onChange={e => setInput(e.target.value)}
                />
            </div>
            <div className='header__right'>
                <Tooltip title="LogOut">
                <ExitToAppIcon onClick={signOut} className="logout" aria-label="Logout"/>
                </Tooltip>
            </div>
        </div>
    )
}

export default Header
