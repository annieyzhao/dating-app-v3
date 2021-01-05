import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../Firebase";
import { Card, Form, Alert, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

export default function Bio2() {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const hobbiesRef = useRef();
  const musicRef = useRef();
  const showerRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      hobbies: hobbiesRef.current.value,
      music: musicRef.current.value,
      shower: showerRef.current.value
    };

    const email = currentUser.email;

    setError("");
    setLoading(true);
    await db
      .collection("users")
      .doc(email)
      .update(data)
      .then(() => {
        history.push("bioadd3");
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
          <h1 className="title"> YOUR BIO </h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="bioHobbies">
              <Form.Label> What are your hobbies? </Form.Label>
              <Form.Control type="text" ref={hobbiesRef} required />
            </Form.Group>
            <Form.Group id="bioMusic">
              <Form.Label> Favorite music? </Form.Label>
              <Form.Control type="text" ref={musicRef} required />
            </Form.Group>
            <Form.Group id="bioShower">
              <Form.Label> Shower thoughts? </Form.Label>
              <Form.Control type="text" ref={showerRef} required />
            </Form.Group>

            <Form.Group inline>
              <Button
                // disabled={loading}
                className="btnn btnn-success"
                href="\bioadd"
              >
                Previous
              </Button>
              <Button
                // disabled={loading}
                className="btnn btnn-success"
                type="submit"
              >
                Next
              </Button>
            </Form.Group>
          </Form>
          {/* <div className="w-100 text-center mt-2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div> */}
        </div>
      </Card.Body>
    </Card>
  );
}
