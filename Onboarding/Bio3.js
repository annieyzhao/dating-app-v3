import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../Firebase";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Alert,
  Button
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

export default function Bio3() {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [file1, setFile1] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  );
  const [file2, setFile2] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  );
  const [file3, setFile3] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  );
  const [file4, setFile4] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  );

  const history = useHistory();

  function handlePreview1(e) {
    e.preventDefault();
    setImage1(e.target.files[0]);
    setFile1(URL.createObjectURL(e.target.files[0]));
  }
  function handlePreview2(e) {
    e.preventDefault();
    setImage2(e.target.files[0]);
    setFile2(URL.createObjectURL(e.target.files[0]));
  }
  function handlePreview3(e) {
    e.preventDefault();
    setImage3(e.target.files[0]);
    setFile3(URL.createObjectURL(e.target.files[0]));
  }
  function handlePreview4(e) {
    e.preventDefault();
    setImage4(e.target.files[0]);
    setFile4(URL.createObjectURL(e.target.files[0]));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const email = currentUser.email;
    if (image1) {
      if (image2) {
        const uploadTask = storage.ref(`images/${image2.name}`).put(image2);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image2.name)
              .getDownloadURL()
              .then((url) => {
                db.collection("users")
                  .doc(email)
                  .update({ pic2: url })
                  .then()
                  .catch((error) => {
                    setError("Failed to upload file");
                  });
              });
          }
        );
      }
      if (image3) {
        const uploadTask = storage.ref(`images/${image3.name}`).put(image3);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image3.name)
              .getDownloadURL()
              .then((url) => {
                db.collection("users")
                  .doc(email)
                  .update({ pic3: url })
                  .then()
                  .catch((error) => {
                    setError("Failed to upload file");
                  });
              });
          }
        );
      }
      if (image4) {
        const uploadTask = storage.ref(`images/${image4.name}`).put(image4);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image4.name)
              .getDownloadURL()
              .then((url) => {
                db.collection("users")
                  .doc(email)
                  .update({ pic4: url })
                  .then()
                  .catch((error) => {
                    setError("Failed to upload file");
                  });
              });
          }
        );
      }
      const uploadTask = storage.ref(`images/${image1.name}`).put(image1);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image1.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("users")
                .doc(email)
                .update({ pic1: url })
                .then(() => {
                  history.push("dealb");
                })
                .catch((error) => {
                  setError("Failed to upload file");
                });
            });
        }
      );
    }
  }

  return (
    <Container>
      <div>
        <h1 className="title"> PROFILE PICTURES </h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group id="pic1">
                <div class="row mb-4">
                  <div class="col-md-10">
                    <Image src={file1} fluid thumbnail />
                  </div>
                </div>
                <Form.File
                  id="custom-file"
                  label="Custom file input"
                  onChange={handlePreview1}
                  custom
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id="pic2">
                <div class="row mb-4">
                  <div class="col-md-10">
                    <Image src={file2} fluid thumbnail />
                  </div>
                </div>
                <Form.File
                  id="custom-file"
                  label="Custom file input"
                  onChange={handlePreview2}
                  custom
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group id="pic3">
                <div class="row mb-4">
                  <div class="col-md-10">
                    <Image src={file3} fluid thumbnail />
                  </div>
                </div>
                <Form.File
                  id="custom-file"
                  label="Custom file input"
                  onChange={handlePreview3}
                  custom
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id="pic4">
                <div class="row mb-4" width="100px">
                  <div class="col-md-10">
                    <Image src={file4} fluid thumbnail />
                  </div>
                </div>
                <Form.File
                  id="custom-file"
                  label="Custom file input"
                  onChange={handlePreview4}
                  custom
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                // disabled={loading}
                className="btnn btnn-success"
                href="\bioadd2"
              >
                Previous
              </Button>
            </Col>
            <Col>
              <Button
                // disabled={loading}
                className="btnn btnn-success"
                type="submit"
              >
                Next
              </Button>
            </Col>
          </Row>
        </Form>
        {/* <div className="w-100 text-center mt-2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div> */}
      </div>
    </Container>
  );
}
