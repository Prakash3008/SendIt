import React from 'react';
import "./SidebarVoice.css";
import { useHistory } from "react-router-dom";
import { v1 as uuid } from "uuid";

function SidebarVoice({Icon , title}) {

    const history = useHistory();
    

const CreateRoom = () => {
        const vid = uuid();
            history.push(`/vroom/${vid}`);
    }
    

    return (
        <div className="SidebarVoice" onClick={CreateRoom}>
            {Icon && <Icon className="SidebarVoice__icon"/>}
            {Icon && <h3>{title}</h3>}
        </div>
    )
}

export default SidebarVoice
