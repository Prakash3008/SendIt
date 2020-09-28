import React from 'react';
import "./Message.css";

function Message({ message, timestamp, user, userImage,image, imageLoaded}) {
    return (
        <div className="message">
            <img src={userImage} alt="" />
            <div className="message__info">
                <h4>{user} { '  '}
                <span className="message__timestamp">{new Date(timestamp?.toDate()).toUTCString()}
                </span></h4>
                {image ? <img src={image}
                width="50%"
                height="50%"
                onLoad={imageLoaded}
                /> : 
                <p>{message}</p>}

            </div>
        </div>
    )
}

export default Message
