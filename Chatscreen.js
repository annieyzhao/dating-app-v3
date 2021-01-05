import React from "react";
import { useState, useEffect } from "react";
import "./Chatscreen.css";
import Avatar from "@material-ui/core/Avatar";
import {db} from "./Firebase";
import firebase from "firebase";

export default function Chatscreen() {
  const image = "https://diy-magazine.s3.amazonaws.com/d/diy/Artists/G/Girl-In-red/_landscape/188378/Girl-in-Red_-by-Chris-Almeida-1.jpg";
  const [input, setInput] = useState('');
  const [name, setUsername]= useState('');
  const [messages, setMessages] = useState([
    {
      name: "Christina",
      image: image,
      message: "hey! nice to meet you :)"
    }
  ]);

  useEffect(()=>{
    db.collection('messages')
    .orderBy('timestamp','asc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc=> doc.data()))
    });
  }, [])

  useEffect(()=> {
    setUsername(prompt('Please enter your name'))
  },[])

  const handleSend = e => {
    e.preventDefault();

    db.collection('messages').add({
      message: input,
      name: name,
      image: image,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput("");
  }


  return (
    <div className="chatcreen">
      <p className="chatScreen__timestamp"> YOU MATCHED WITH CHRISTINA! </p>
      {messages.map((message) =>
        message.name ? (
          <div className="chatScreen__message">
            <Avatar
              className="chatScreen__image"
              alt={message.name}
              src={message.image}
            />
            <p className="chatScreen__text">{message.message}</p>
          </div>
        ) : (
          <div className="chatScreen__message">
            <p className="chatScreen__textUser">{message.message}</p>
          </div>
        )
      )}

      <form className="chatScreen__input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chatScreen__inputField"
          placeholder="Type here..."
          type="text"
        />
        <button onClick={handleSend} className="chatScreen__inputButton"> SEND </button>
      </form>
    </div>
  );

}
