import React from 'react';
import "./SidebarVoice.css";
import { useHistory } from "react-router-dom";
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import db from './firebase';

function SidebarVoice({Icon , title, vid, addVoiceOption}) {

    const history = useHistory();
    

const CreateRoom = () => {
    if(vid){
            history.push(`/vroom/${vid}`);
    }
    else{
        history.push(title);
    }
    }

    const addVoice = () => {
        const vchannelName = prompt('Please enter the voice channel name');
        if(vchannelName){
            db.collection('vrooms').add({
                vname: vchannelName,
            })
        }
    };
    

    return (
        <div className="SidebarVoice" onClick={addVoiceOption ? addVoice :CreateRoom }>
            {Icon && <Icon className="SidebarVoice__icon"/>}
            {Icon ? <h3>{title}</h3> : (<h3 >
            <VolumeDownIcon className="SidebarVoice__icon"></VolumeDownIcon>{title}
            </h3>)}
        </div>
    )
}

export default SidebarVoice
