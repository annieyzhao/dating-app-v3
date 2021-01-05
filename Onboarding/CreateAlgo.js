import React, { Component } from "react";
import LoginControl from "./LoginControl";
import { Link } from "react-router-dom";
import "./CreateAlgo.css";

class CreateAlgo extends Component {
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
            <h2>I'm Looking For...</h2>

            {/* age */}
            <h5>Age</h5>
            <input
              type="number"
              id="UserAge"
              className="form-control"
              placeholder="Min"
            ></input>
            <input
              type="number"
              id="UserAge"
              className="form-control"
              placeholder="Max"
            ></input>

            {/* gender */}
            <h5>Gender</h5>
            <input
              type="checkbox"
              id="UserGender-M"
              className="form-control"
              placeholder="Gender"
            ></input>
            <label for="UserGender">Male</label>

            <input
              type="checkbox"
              id="UserGender-F"
              className="form-control"
              placeholder="Gender"
            ></input>
            <label for="UserGender">Female</label>

            <input
              type="checkbox"
              id="UserGender-NB"
              className="form-control"
              placeholder="Gender"
            ></input>
            <label for="UserGender-NB">Non-Binary</label>

            <input
              type="checkbox"
              id="UserGender-Other"
              className="form-control"
              placeholder="Gender"
            ></input>
            <label for="UserGender-Other">Other</label>

            {/* height */}
            <h5>Height</h5>
            <input
              type="checkbox"
              id="Height-Taller"
              className="form-control"
              placeholder="Taller Than Me"
            ></input>
            <label for="UserGender">Taller Than Me</label>

            <input
              type="checkbox"
              id="Height-Shorter"
              className="form-control"
              placeholder="Shorter Than Me"
            ></input>
            <label for="UserGender">Shorter Than Me</label>

            {/* location */}
            <h5>Location Radius</h5>
            <input
              type="number"
              id="UserAge"
              className="form-control"
              placeholder="Maximum"
            ></input>

            {/* education */}
            <h5>Education</h5>
            <input
              type="checkbox"
              id="Education-GED"
              className="form-control"
              placeholder="GED"
            ></input>
            <label for="Education-GED">GED</label>

            <input
              type="checkbox"
              id="Education-Undergraduate"
              className="form-control"
              placeholder="Undergraduate Degree"
            ></input>
            <label for="Education-Undergraduate">Undergraduate Degree</label>

            <input
              type="checkbox"
              id="Education-Graduate"
              className="form-control"
              placeholder="Graduate Degree"
            ></input>
            <label for="Education-Undergraduate">Graduate Degree</label>

            {/* employment */}
            <h5>Employment Status</h5>
            <input
              type="checkbox"
              id="Employment-Unemployed"
              className="form-control"
              placeholder="Unemployed"
            ></input>
            <label for="Employment-Unemployed">Unemployed</label>

            <input
              type="checkbox"
              id="Employment-Full-Time"
              className="form-control"
              placeholder="Full-Time"
            ></input>
            <label for="Employment-Full-Time">Full-Time</label>

            <input
              type="checkbox"
              id="Employment-Part-Time"
              className="form-control"
              placeholder="Part-Time"
            ></input>
            <label for="Employment-Part-Time">Part-Time</label>

            <input
              type="checkbox"
              id="Employment-Student"
              className="form-control"
              placeholder="Student"
            ></input>
            <label for="Employment-Part-Time">Student</label>

            {/* commitment-level */}
            <h5>Commitment Level</h5>
            <input
              type="checkbox"
              id="Commitment-Long-Term-Relationship"
              className="form-control"
              placeholder="Long-term Relationship"
            ></input>
            <label for="Commitment-Long-Term-Relationship">
              Long-term Relationship
            </label>

            <input
              type="checkbox"
              id="Commitment-Casual-Dating"
              className="form-control"
              placeholder="Casual Dating"
            ></input>
            <label for="Commitment-Casual-Dating">Casual Dating</label>

            <input
              type="checkbox"
              id="Commitment-Friendship"
              className="form-control"
              placeholder="Friendship"
            ></input>
            <label for="Commitment-Friendship">Friendship</label>

            {/* button */}
            <Link to="/profile">
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

export default CreateAlgo;
