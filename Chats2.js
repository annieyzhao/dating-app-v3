import React from "react";
import Chat from "./Chat";
import { useState, useEffect } from "react";
import { db } from "./Firebase";
import firebase from "firebase";

export default function Chats2() {
  const image =
    "https://diy-magazine.s3.amazonaws.com/d/diy/Artists/G/Girl-In-red/_landscape/188378/Girl-in-Red_-by-Chris-Almeida-1.jpg";
  const [messages, setMessages] = useState([
    {
      name: "Christina",
      image: image,
      message: "hey! nice to meet you :)"
    }
  ]);

  useEffect(() => {
    db.collection("chats")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className="chats">
      <Chat
        name="Christina"
        message="*New Connection*"
        timestamp="20 min ago"
        profilePic="https://diy-magazine.s3.amazonaws.com/d/diy/Artists/G/Girl-In-red/_landscape/188378/Girl-in-Red_-by-Chris-Almeida-1.jpg"
      />
    </div>
  );
}
