import React, { useState } from "react";
import "./Questions.css";
import { useAuth } from "./contexts/AuthContext";
import { db } from "./Firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase";


export default function Questions(props) {
  const [first, setFirst] = useState("");
  const [first_id, setFirstId] = useState("");
  const [second, setSecond] = useState("");
  const [second_id, setSecondId] = useState("");
  const { currentUser } = useAuth();
  const history = useHistory();

  const onChange = (event) => {
    if (first_id === "question5") {
      if (first === "") {
        setFirstId("");
      } else {
        setFirst(event.target.value);
      }
    } else if (second_id === "question5") {
      if (second === "") {
        setSecondId("");
      } else {
        setSecond(event.target.value);
      }
    } else {
      if (first === "") {
        setFirst(event.target.value);
        setFirstId(event.target.id);
      } else if (second === "") {
        setSecond(event.target.value);
        setSecondId(event.target.id);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      if (first === "" || second === "") {
        console.log("Choose two questions");
      } else {
        db.collection("twoTruths").add({
          message1: first,
          message2: second,
          name: "oo",
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        db.collection("users")
          .doc(currentUser.email)
          .update({
            questions: {
              first: first,
              second: second
            }
          }).then(function () {
            history.push("2T1L");
          });}
    } catch (error) {
      // incase the user isn't logged in or the something is wrong with the db
      console.error(error.name);
      console.error(error.message);
    }
  };

  const onClick = (event) => {
    const button_color = document.getElementById(event.target.id).style
      .backgroundColor;

    // if button is grey, so not clicked yet
    if (button_color === "rgb(243, 243, 243)") {
      if (first === "") {
        setFirst(event.target.innerText);
        setFirstId(event.target.id);

        // change button color
        document.getElementById(event.target.id).style.backgroundColor =
          "rgb(136, 0, 122)";
        document.getElementById(event.target.id).style.color = "white";
      } else if (second === "") {
        setSecond(event.target.innerText);
        setSecondId(event.target.id);
        document.getElementById(event.target.id).style.backgroundColor =
          "rgb(136, 0, 122)";
        document.getElementById(event.target.id).style.color = "white";
      }
    } else {
      // else the button is purple and it's already been selected
      if (first_id === event.target.id) {
        setFirst("");
        setFirstId("");
        document.getElementById(event.target.id).style.backgroundColor =
          "rgb(243, 243, 243)";
        document.getElementById(event.target.id).style.color = "black";
      } else if (second_id === event.target.id) {
        setSecond("");
        setSecondId("");
        document.getElementById(event.target.id).style.backgroundColor =
          "rgb(243, 243, 243)";
        document.getElementById(event.target.id).style.color = "black";
      }
    }
  };

  return (
    <div>
      <p> Pick Two Questions... </p>
      <form className="questions-form" onSubmit={handleSubmit}>
        <button
          id="question1"
          className="question-button"
          type="button"
          style={{ backgroundColor: "#f3f3f3" }}
          onClick={onClick}
        >
          {" "}
          What is your ideal first date be like ?
        </button>
        <button
          id="question2"
          className="question-button"
          type="button"
          style={{ backgroundColor: "#f3f3f3" }}
          onClick={onClick}
        >
          {" "}
          If you could meet someone dead or alive, who would it be ?
        </button>
        <button
          id="question3"
          className="question-button"
          type="button"
          style={{ backgroundColor: "#f3f3f3" }}
          onClick={onClick}
        >
          {" "}
          What are some misconceptions people have about you ?
        </button>
        <button
          id="question4"
          className="question-button"
          type="button"
          style={{ backgroundColor: "#f3f3f3" }}
          onClick={onClick}
        >
          {" "}
          What is your ideal place to live and why ?{" "}
        </button>
        <label>
          Or make your own question...
          <input
            id="question5"
            className="question-text"
            type="text"
            style={{ backgroundColor: "#f3f3f3" }}
            onChange={onChange}
          />
        </label>
        <input className="send-button" type="submit" value="Send" />
      </form>
    </div>
  );
}
