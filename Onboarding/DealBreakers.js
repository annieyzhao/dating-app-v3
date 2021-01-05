import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../Firebase";
import {
  ToggleButton,
  ToggleButtonGroup,
  Col,
  Row,
  Card,
  Form,
  Alert,
  Button
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

export default function Bio2() {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGen, setIsGen] = useState();
  const [maxAge, setMax] = useState(100);
  const [isMax, setIsMax] = useState();
  const [minAge, setMin] = useState(18);
  const [isMin, setIsMin] = useState();
  const [dist, setDist] = useState(0);
  const [isDist, setIsDist] = useState();

  const history = useHistory();

  const genderRef1 = useRef();
  const genderRef2 = useRef();

  function handleGen(val, e) {
    e.preventDefault();
    if (val[0]) {
      setIsGen(val);
    } else {
      setIsGen();
    }
  }

  function handleDist(val, e) {
    e.preventDefault();
    if (val[0]) {
      setIsDist(val);
    } else {
      setIsDist();
    }
  }

  function handleMax(val, e) {
    e.preventDefault();
    if (val[0]) {
      setIsMax(val);
    } else {
      setIsMax();
    }
  }
  function handleMin(val, e) {
    e.preventDefault();
    if (val[0]) {
      setIsMin(val);
    } else {
      setIsMin();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      preferences: {
        gender: genderRef1.current.value + " " + genderRef2.current.value,
        minAge: minAge,
        maxAge: maxAge,
        distance: dist
      }
    };

    if (!isGen) {
      delete data.preferences.gender;
    }
    if (!isMin) {
      delete data.preferences.minAge;
    }
    if (!isMax) {
      delete data.preferences.maxAge;
    }
    if (!setIsDist) {
      delete data.preferences.distance;
    }

    const email = currentUser.email;

    setError("");
    setLoading(true);
    await db
      .collection("users")
      .doc(email)
      .update(data)
      .then(() => {
        history.push("ttol");
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
          <h1 className="title"> YOUR PREFERENCES </h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} id="prefGender">
              <Col xs="3">
                <ToggleButtonGroup
                  type="checkbox"
                  value={isGen}
                  onChange={handleGen}
                >
                  <ToggleButton value={true}>Gender</ToggleButton>
                </ToggleButtonGroup>
              </Col>
              <Col xs="4">
                <Form.Control
                  as="select"
                  mulitple
                  ref={genderRef1}
                  disabled={!isGen}
                  custom
                >
                  <option>Cis</option>
                  <option>Trans</option>
                </Form.Control>
              </Col>
              <Col xs="4">
                <Form.Control
                  as="select"
                  mulitple
                  ref={genderRef2}
                  disabled={!isGen}
                  custom
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Nonbinary</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col xs="3">
                <ToggleButtonGroup
                  type="checkbox"
                  value={isMin}
                  onChange={handleMin}
                >
                  <ToggleButton value={true}>Min Age</ToggleButton>
                </ToggleButtonGroup>
              </Col>
              <Col xs="6">
                <RangeSlider
                  value={minAge}
                  onChange={(e) => setMin(e.target.value)}
                  min={18}
                  max={maxAge}
                  disabled={!isMin}
                />
              </Col>
              <Col xs="3">
                <Form.Control value={minAge} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col xs="3">
                <ToggleButtonGroup
                  type="checkbox"
                  value={isMax}
                  onChange={handleMax}
                >
                  <ToggleButton value={true}>Max Age</ToggleButton>
                </ToggleButtonGroup>
              </Col>
              <Col xs="6">
                <RangeSlider
                  value={maxAge}
                  onChange={(e) => setMax(e.target.value)}
                  min={minAge}
                  disabled={!isMax}
                />
              </Col>
              <Col xs="3">
                <Form.Control value={maxAge} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col xs="3">
                <ToggleButtonGroup
                  type="checkbox"
                  value={isDist}
                  onChange={handleDist}
                >
                  <ToggleButton value={true}>Distance</ToggleButton>
                </ToggleButtonGroup>
              </Col>
              <Col xs="6">
                <RangeSlider
                  value={dist}
                  onChange={(e) => setDist(e.target.value)}
                  disabled={!isDist}
                />
              </Col>
              <Col xs="3">
                <Form.Control value={dist} /> miles away
              </Col>
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
