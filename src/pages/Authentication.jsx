import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Authentication() {
  const [user, setUser] = useState(null);
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Mendapatkan Google Access Token
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // Mendapatkan user yang login
        const user = result.user;
        // Set user ke localStorage
        localStorage.setItem("userfb", JSON.stringify(user));
        localStorage.setItem("tokenfb", JSON.stringify(token)); // Set user ke state
        setUser(user);
      })
      .catch((error) => {
        // Errors
        const errorCode = error.code;
        const errorMessage = error.message;
        // Email yang digunakan
        const email = error.email;
        // Auth credential
        const credential = GoogleAuthProvider.credentialFromError(error);
        // Error
        alert("Error GAuth\n", errorCode, errorMessage, email, credential);
      });
  };
  useEffect(() => {
    const userLocalStorage = localStorage.getItem("userfb");
    if (userLocalStorage) {
      const userLocalStorageObject = JSON.parse(userLocalStorage);
      setUser(userLocalStorageObject);
    }
  }, []);
  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
    >
      <Row className="text-center text-light">
        <Col>
          <h1>Authentication</h1>
          <br />
          {user ? (
            <div>
              <img src={user.photoURL} alt={user.displayName} />
              <p>Selamat datang, {user.displayName}</p>
              <Link to="/groupchat">
                <Button variant="success">Group Chat</Button>
              </Link>
            </div>
          ) : (
            <div>
              <p>Anda belum login</p>
              <Button variant="primary" onClick={signInWithGoogle}>
                <FaGoogle /> Sign in with Google
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
