import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  AccountBackground,
  LogoContainer,
  LogoHeader,
  AccountContainer,
} from "./AccountElements.js";
import Login from "../../components/Login/index.js";

const Account = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.user);

  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const toLanding = () => {
    navigate("/");
    // window.location.reload(true);
  };

  return (
    <AccountBackground
      style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <LogoContainer
        onClick={() => {
          toLanding();
        }}
      >
        <LogoHeader>SOS BackOffice</LogoHeader>
      </LogoContainer>

      <AccountContainer>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-evenly",
            alignItems: "center",
            alignContent: "stretch",
          }}
        >
          <Col>
            <Row>
              <Login />
            </Row>
          </Col>
        </Row>
      </AccountContainer>
    </AccountBackground>
  );
};

export default Account;
