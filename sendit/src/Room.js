import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import './Room.css';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic'
import VideocamIcon from '@material-ui/icons/Videocam'

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, [props.peer]);


    return (       
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};
let vstream = '';
let vvstream = '';
let vidStream = true;
let audStream = true;
const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const {vroomID}=useParams();
    //creating a stream foe p-p comms
    useEffect(() => {
        console.log("chat room created")
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", vroomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push({
                        peerID : userID,
                        peer,
                    });
                })
                vstream = stream.getAudioTracks();
                vvstream = stream.getVideoTracks();
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })
                
                const peerObj = {
                    peer,
                    peerID : payload.callerID
                }

                setPeers(users => [...users, peerObj]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            socketRef.current.on("user left", id => {
                const peerObj = peersRef.current.find(p => p.peerID === id);
                if (peerObj){
                    peerObj.peer.destroy();
                }
                const peers = peersRef.current.filter(p => p.peerID !== id);
                peersRef.current = peers;
                setPeers(peers);
            })
        })
    }, [vroomID]);
    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })
        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })
        peer.signal(incomingSignal);
        return peer;
    }

//for muting the audio    
const MuteAudio = () => {
    audStream = !audStream;
    vstream[0].enabled = audStream;
}
//for disabling the video
const MuteVideo = () => {
    vidStream = !vidStream;
    vvstream[0].enabled = vidStream;   
    
}


return (
    <div className="video_container">  
            <div className="button">  
            
<button type="button" onClick={MuteAudio} value="Mute Voice" id="but">{(audStream === true) ? <MicIcon /> : <MicOffIcon />}</button>
                <button type="button" onClick={MuteVideo} value="Stop Video" id="but">{(vidStream === true) ? <VideocamIcon /> : <VideocamOffIcon />}</button>
            </div>
            <div className="video">    
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer) => {
                return (
                    <Video key={peer.peerID} peer={peer.peer} />
                );
            })}
            </div>
        </div>
);
};

export default Room;