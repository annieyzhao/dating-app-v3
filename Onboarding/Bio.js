import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../Firebase";
import { Card, Form, Alert, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

export default function Bio() {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const nameRef = useRef();
  // const dateRef = useRef();
  const genderRef1 = useRef();
  const genderRef2 = useRef();
  const edRef = useRef();
  const workRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const legal = new Date();
  const now = new Date();
  legal.setFullYear(legal.getFullYear() - 18);
  const [setDate, setSelectedDate] = useState(legal);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      birthday: setDate,
      age: now.getFullYear() - legal.getFullYear(),
      gender: genderRef1.current.value + " " + genderRef2.current.value,
      education: edRef.current.value,
      work: workRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value
    };

    const email = currentUser.email;

    setError("");
    setLoading(true);
    await db
      .collection("users")
      .doc(email)
      .set(data)
      .then(() => {
        history.push("bioadd2");
      })
      .catch((error) => {
        setError("Failed to update bio");
      });
    setLoading(false);
  }

  return (
    <Card>
      <Card.Body>
        <div>
          <h1 className="title">YOUR BIO </h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="bioName">
              <Form.Label> First Name </Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form inline>
              <Form.Group id="bioGender">
                <Form.Label> Gender </Form.Label>
                <Form.Control
                  as="select"
                  mulitple
                  ref={genderRef1}
                  required
                  custom
                >
                  <option>Cis</option>
                  <option>Trans</option>
                </Form.Control>
                <Form.Control
                  as="select"
                  mulitple
                  ref={genderRef2}
                  required
                  custom
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Nonbinary</option>
                </Form.Control>
              </Form.Group>
            </Form>
            <Form.Group id="bioDOB">
              <Form.Label> Birthday </Form.Label>
              <DatePicker
                selected={setDate}
                onChange={(date) => setSelectedDate(date)}
                maxDate={legal}
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
              />
            </Form.Group>
            <Form.Group id="bioEd">
              <Form.Label> Education </Form.Label>
              <Form.Control type="text" ref={edRef} required />
            </Form.Group>
            <Form.Group id="bioWork">
              <Form.Label> Work </Form.Label>
              <Form.Control type="text" ref={workRef} required />
            </Form.Group>
            <Form inline>
              <Form.Group id="bioLoc">
                <Form.Label> Lives in... </Form.Label>
                <Form.Control
                  type="text"
                  ref={cityRef}
                  placeholder="City"
                  required
                />
                <Form.Control
                  type="text"
                  ref={stateRef}
                  placeholder="State"
                  required
                />
              </Form.Group>
            </Form>
            <Button
              // disabled={loading}
              className="btnn btnn-success"
              type="submit"
            >
              Next
            </Button>
          </Form>
          {/* <div className="w-100 text-center mt-2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div> */}
        </div>
      </Card.Body>
    </Card>
  );
}
