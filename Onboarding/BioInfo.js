import React, { Component } from "react";
import LoginControl from "./LoginControl";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUp: false,
      newUser: null
    };
  }

  NewUser = () => {
    var name = document.getElementById("UserName").value;
    var age = document.getElementById("UserAge").value;
    var gender = document.getElementById("UserGender").value;
    var education = document.getElementById("UserEducation").value;

    if (name !== "") {
      this.setState({
        isSignUp: true,
        newUser: { name: name, age: age, gender: gender, education: education }
      });
    } else {
      alert("User name cannot be blank.");
    }
  };

  render() {
    return (
      <div>
        {this.state.isSignUp ? (
          <LoginControl newUser={this.state.newUser} />
        ) : (
          <div className="main_box--main--signUp">
            <h2>Your Bio</h2>
            <p>Name</p>
            <input
              type="text"
              id="UserName"
              className="form-control"
              placeholder="Full Name"
              autoComplete="false"
            ></input>

            <p>Age</p>
            <input
              type="text"
              id="UserAge"
              className="form-control"
              placeholder="Age"
            ></input>

            <p>Gender</p>
            <input
              type="text"
              id="UserGender"
              className="form-control"
              placeholder="Gender"
            ></input>

            <p>Education</p>
            <input
              type="text"
              id="UserEducation"
              className="form-control"
              placeholder="Education"
            ></input>

            <p>Hobbies</p>
            <input
              type="text"
              id="Hobbies"
              className="form-control"
              placeholder="Hobbies"
            ></input>

            <Link to="/createalgo">
              <button className="btnn btnn-success" onClick={this.NewUser}>
                CONTINUE
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Signup;
