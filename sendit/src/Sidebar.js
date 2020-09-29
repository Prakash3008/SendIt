import React, {useState, useEffect } from 'react';
import "./Sidebar.css";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SidebarOption from "./SidebarOption";
import AddSharpIcon from '@material-ui/icons/AddSharp';
import db from "./firebase";
import { useStateValue } from './StateProvider';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import SidebarVoice from './SidebarVoice';
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';

function Sidebar() {

    const [channels, setChannels]=useState([]);
    const [{user}] = useStateValue();

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name
                
            })))
        ));
    }, [])

    return (
        
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">    
                <h2>{user?.email}</h2>
    <h3><FiberManualRecordIcon />{user?.displayName}</h3>
                </div>
            </div>
            
            <SidebarVoice Icon={VolumeUpIcon} title="Voice Channel"/>
            <hr/>
            <SidebarOption Icon={AddSharpIcon} addChannelOption title="Add Text Channels"/>

            <SidebarOption title="Text Channels" Icon={ExpandMoreSharpIcon}/>
            
            {channels.map(channel =>(
                <SidebarOption title={channel.name} id={channel.id}/>
            ))}
            <hr/>
        </div>
    )
}

export default Sidebar
