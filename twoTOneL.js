import React,{ Component } from "react";
import "./twoTOneL.css";
import { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./Firebase";
import firebase from "firebase";
import ReactDOM from 'react-dom';
//import Button from "./Button";
import RadioButtonsGroup from "./questionBubble";
import { Link } from "react-router-dom";


export default function TwoTruths() {
  const color = "red";
  const image =
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/socialmedia/apple/271/panda_1f43c.png";
  const [input, setInput] = useState("");
  const [name, setUsername] = useState("");
  const [messages, setMessages] = useState([
    {
      message: "GAME STARTING...",
      name:"o"
    }
  ]);
  const [view, setView] = React.useState('list');

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  useEffect(() => {
    db.collection("twoTruths")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const handleSend = (e) => {
    e.preventDefault();

    db.collection("twoTruths").add({
      message: input,
      name: name,
      image: image,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput("");
  };
    
  return (
    
    <div>
      <div className="twoTruths">
        {messages.map((message) =>
          message.name === "me" ? (
            <div className="twoTruths__message">
              <Avatar
                className="twoTruths__image"
                alt={message.name}
                src={message.image}
              />
              <button className="twoTruths__text">{message.message}</button>
            </div>
          ) : ( message.name === "o" ? (
           <div className="twoTruths__message">
              <button className="twoTruths__remind" >{message.message}</button>
            </div>
         ) : ( message.name === "oo" ? (
          <div className="twoTruths__message">
            <div className="questions__textUser">
              <RadioButtonsGroup firstQ={message.message1} secondQ={message.message2} label="🐼 will choose one and answer:"/>
            </div>
          </div>
        ) : ( message.name === "ooo" ? (
          <div className="twoTruths__message">
            <div className="questions__text">
              <RadioButtonsGroup firstQ="What's your ideal date?" secondQ="Biggest pet peeve?" label="🐼 sent these questions! Choose one & answer:"/>
            </div>
           </div>
        ) : ( message.name === "oooo" ? (
          <div className="twoTruths__message">
            <Link to="/questions">
              <button className="twoTruths__next" >Click here for the next game!</button>
            </Link>
           </div>
        ) : ( message.name === "ooooo" ? (
          <div className="twoTruths__message">
            <Link to="/reveal">
              <button className="twoTruths__next" >CONGRATS! You finished the icebreaker. Click here to view 🐼's profile </button>
            </Link>
           </div>
        ) : (
            <div className="twoTruths__message">
              <button className="twoTruths__textUser" >{message.message}</button>
            </div>
         ))
       )))))}
      </div>

      <form className="twoTruths__input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="twoTruths__inputField"
          placeholder="Type here..."
          type="text"
        />
        <button onClick={handleSend} className="twoTruths__inputButton">
          {" "}
          SEND{" "}
        </button>
      </form>
    </div>
  );
}
