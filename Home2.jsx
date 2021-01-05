import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import MasqToggle from "./MasqToggle";
// import MasqToggle2 from "./MasqToggle2";
import Anonppl from "./Anonppl";
import Anonppl2 from "./Anonppl2";
import { useAuth } from "./contexts/AuthContext";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import MasqToggle2 from "./MasqToggle2";

export default function Home2() {
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
      <MasqToggle2 />
      {/* <Anonppl2 /> */}
      {/* <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div> */}
    </div>
  );
}
