import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      
      history.push("home");
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="main_box--main--signUp">
        <h2 className="text-center mb-4">Log In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="signUpUsername">
            <Form.Label> Email </Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="signUpPassword1">
            <Form.Label> Password </Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Button
            disabled={loading}
            className="btnn btnn-success"
            type="submit"
          >
            Log In
          </Button>
        </Form>
        <div className="w-100 text-center mt-2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
