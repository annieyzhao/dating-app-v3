import React, { useState } from "react";
// import "./Profile.css";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { useAuth } from "./contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Button, Alert } from "react-bootstrap";
// import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from "./Firebase";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [name, setName] = useState("");
  const [edu, setEdu] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [pic, setPic] = useState("");
  const [music, setMusic] = useState("");
  const [work, setWork] = useState("");
  const [shower, setShower] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const history = useHistory();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch (error) {
      setError("Failed to logout");
    }
  }

  try {
    var docRef = db.collection("users").doc(currentUser.email);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        setName(doc.data().name);
        setEdu(doc.data().education);
        setHobbies(doc.data().hobbies);
        setPic(doc.data().pic1);
        setMusic(doc.data().music);
        setWork(doc.data().work);
        setShower(doc.data().shower);
        setAge(doc.data().age);
        setCity(doc.data().city);
        setState(doc.data().state);
      } else {
        console.log("No doc");
      }
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="profile">
      <Avatar
        className="profile__image"
        src={pic}
      />
      <div className="profile__logout">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      <div className="profile__details">
        <p className="profile__subtitle">NAME</p>
        <h2 className="profile__content">{name}</h2>
        <p className="profile__subtitle">EDUCATION</p>
        <h2 className="profile__content">{edu}</h2>
        <p className="profile__subtitle">HOBBIES</p>
        <h2 className="profile__content">{hobbies}</h2>
        <p className="profile__subtitle">MUSIC</p>
        <h2 className="profile__content">{music}</h2>
        <p className="profile__subtitle">WORK</p>
        <h2 className="profile__content">{work}</h2>
        <p className="profile__subtitle">SHOWER THOUGHTS:</p>
        <h2 className="profile__content">{shower}</h2>
        <p className="profile__subtitle">AGE</p>
        <h2 className="profile__content">{age}</h2>
        <p className="profile__subtitle">CITY</p>
        <h2 className="profile__content">{city}</h2>
        <p className="profile__subtitle">STATE</p>
        <h2 className="profile__content">{state}</h2>
      </div>
    </div>
  );
}
