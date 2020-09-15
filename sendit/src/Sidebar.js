import React, {useState, useEffect } from 'react';
import "./Sidebar.css";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import SidebarOption from "./SidebarOption";
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessSharpIcon from '@material-ui/icons/ExpandLessSharp';
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import db from "./firebase";

function Slider() {

    const [channels, setChannels]=useState([])

    useEffect(() => {
        db.collection('rooms').onSnapshot((snapshot) => (
            setChannels(snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name
            })))
        ))
    },[])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">    
                <h2>Hello Everyone</h2>
                <h3><FiberManualRecordIcon />hi there</h3>
                </div>
                <CreateIcon />
            </div>
            <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
            <SidebarOption Icon={InboxIcon} title="Mentions & Reactions"/>
            <SidebarOption Icon={DraftsIcon} title="Saved names"/>
            <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser"/>
            <SidebarOption Icon={PeopleAltIcon} title="People & User groups"/>
            <SidebarOption Icon={AppsIcon} title="Apps"/>
            <SidebarOption Icon={FileCopyIcon} title="File browser"/>
            <SidebarOption Icon={ExpandLessSharpIcon} title="Show less"/>
            <hr />
            <SidebarOption Icon={ExpandMoreSharpIcon} title="Channels"/>
            <hr/>
            <SidebarOption Icon={AddSharpIcon} addChannelOption title="Add channel"/>
            
            {channels.map((channel) =>(
                <SidebarOption title={channel.name} id={channel.id}/>
            ))}
        </div>
    )
}

export default Slider
