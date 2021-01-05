import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import MasqToggle from "./MasqToggle";
import Anonppl from "./Anonppl";
import { useAuth } from "./contexts/AuthContext";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";

export default function Home() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <h1 className="title"> MASQUED MATCHES </h1>
      <MasqToggle />
      {/* <Anonppl /> */}
      {/* <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div> */}
    </div>
  );
}
