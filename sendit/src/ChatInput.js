import React, { useState } from 'react'
import "./ChatInput.css"
import { useStateValue } from "./StateProvider"
import db, {storage} from './firebase';
import firebase from "firebase";
import uuidv4 from 'uuid/v4'
import mime from "mime-types";
import PublishIcon from '@material-ui/icons/Publish';
import ImageIcon from '@material-ui/icons/Image';

function ChatInput({channelName, channelId}) {

    const storageRef = firebase.storage().ref();
    const [input, setInput] = useState('');
    const [{user }] = useStateValue();
    const [fileState, setFileState] = useState('');

    const onFileAdded = (e) => {
        const file=e.target.files[0];
        if(file){
            setFileState(file);
            uploadImage(file);
            
        }
        if(!file){
            alert('Please select a file to upload');
            
        }
    }
    const uploadImage = (file) => {
        console.log("uloading image")
        const filePath =   `chat/images/${uuidv4()}.jpg`;
        storageRef.child(filePath).put(file)
        .then((data) => {data.ref.getDownloadURL()
            .then((url) => sendImage(url))
        })
        .catch((err) => console.log(err))
        setFileState(null);
    }

    const sendMessage = (e,url) => {
        if(input !== ""){
        e.preventDefault();


        if(channelId){
            db.collection('rooms').doc(channelId).collection('messages').add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL,
                image: url || ""
            })
            
        }
    
        setInput("");
    }
    }
    const sendImage = (url) => {
        if(channelId){
            db.collection('rooms').doc(channelId).collection('messages').add({
                message: input || "",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL,
                image: url || ""
            })
            
        }
    
        setInput("");

    }



    return (
        <div className='chatInput'>
            <form>
                {/* <input type="file" id="file_upload" 
                onChange={onFileAdded}></input>
                <button id="up" onClick={ uploadImage} type="button">Upload</button> */}
                <input 
                value={input}
                name="text"
                required
                onChange={e => setInput(e.target.value)}
                placeholder={`Message #${channelName?.toLowerCase()}`}
                id="text"></input>
                <button type="submit" onClick={sendMessage} className='send' id="send"></button>
                <input type="file" id="file_upload" 
                onChange={onFileAdded}></input>
                <button id="up" onClick={ uploadImage} type="button"><PublishIcon/></button>   
            </form>
            
        </div>
    )
}

export default ChatInput
