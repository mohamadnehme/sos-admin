import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/userSlice.js";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
  LoginTitle,
  LoginLabel,
  LoginField,
  LoginButton,
  LoginQuestion,
  Row,
} from "./LoginElements.js";

const { REACT_APP_API_ENDPOINT } = process.env;

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toApplyArtist = () => {
    if (email !== "" && password !== "") {
      setLoading(true);
      axios
        .post(
          `${REACT_APP_API_ENDPOINT}/authentication_token`,
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => {
          dispatch(
            login({
              loggedIn: true,
              token: data.data.token
            })
          );
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("email and password required");
    }
  };

  return (
    <Container
      style={{
        backgroundColor: "white",
        width: "100%",
        padding: "5%",
        borderRadius: "10px",
      }}
    >
      <Col>
        <Row>
          <LoginTitle>Log in</LoginTitle>
        </Row>
        <br />
        <LoginLabel>email</LoginLabel>
        <Row>
          <LoginField onChange={(e) => setemail(e.target.value)} />
        </Row>
        <br />
        <LoginLabel>Password</LoginLabel>
        <Row style={{ position: "relative" }}>
          <LoginField
            type={passwordType}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordType === "password" ? (
            <AiFillEyeInvisible
              style={{
                fontSize: "30px",
                position: "absolute",
                marginLeft: "90%",
                cursor: "pointer",
              }}
              onClick={togglePassword}
            />
          ) : (
            <AiFillEye
              style={{
                fontSize: "30px",
                position: "absolute",
                marginLeft: "90%",
                cursor: "pointer",
              }}
              onClick={togglePassword}
            />
          )}
        </Row>
        <br />
        <br />
        <Row>
          <LoginButton
            onClick={() => {
              toApplyArtist();
            }}
            disabled={loading}
          >
            LOG IN
          </LoginButton>
        </Row>
        <Row>
          <LoginQuestion>Forgot your password?</LoginQuestion>
        </Row>
      </Col>
    </Container>
  );
};

export default Login;
