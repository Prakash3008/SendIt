import React, {useState, useEffect, useRef} from 'react';

import "./Chat.css";
import "./App"
import {useParams} from "react-router-dom";
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import db from "./firebase";
import Message from './Message'; 
import ChatInput from './ChatInput';

function Chat() {
const {roomId}=useParams();
const [roomDetails, setRoomDetails] = useState(null);
const [roomMessages, setRoomMessages] = useState([]);

let divRef = useRef();

useEffect (() =>{
    divRef.scrollIntoView({behaviour:'smooth', block: "end", inline: "nearest"})

},[roomMessages])

const imageLoaded = () => {
    divRef.scrollIntoView({behaviour:'smooth', block: "end", inline: "nearest"})

}

useEffect(() =>{

    if(roomId){
        db.collection('rooms').doc(roomId)
        .onSnapshot((snapshot) => 
            setRoomDetails(snapshot.data())
        )
    }
    db.collection('rooms').doc(roomId)
    .collection('messages')
    .orderBy('timestamp','asc')
    .onSnapshot(snapshot =>
        setRoomMessages(
            snapshot.docs.map(doc => doc.data())
        )
    );
},[roomId]
);

console.log("inside CHAT.js")
    return (
    
        <div className="chat">
            <div className="chat__header">
                <div className="chat__headerLeft">
                    <h4 className="chat__channelName">
                    <strong># {roomDetails?.name}</strong>
                    <StarBorderOutlinedIcon /></h4>
                </div>

            </div>
            <div className="chat__messages">
                {roomMessages.map(({message,timestamp,user,userImage,image}) =>(
                    <Message
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                    image={image}
                    imageLoaded= {imageLoaded}/>
                ))}
                <div ref={currentEl => divRef = currentEl}></div>
            </div>
                
                <ChatInput channelName={roomDetails?.name} channelId={roomId}></ChatInput>

        </div>
    )
}

export default Chat
