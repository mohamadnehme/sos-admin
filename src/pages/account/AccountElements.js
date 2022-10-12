import styled from "styled-components";

export const AccountBackground = styled.div`
  background-color: #17191a;
  width: 100%;
  height: 100%;

`;
export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: absolute;
  top: 2%;
  left: 2%;
  cursor: pointer;
`;
export const AccountContainer = styled.div`
  background-color: black;
  width: 50%;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 10%;
  margin-bottom: 10%;
  @media screen and (max-width: 700px) {
    background-color: white;
    width: 90%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 20%;
  }
`;
export const LogoImage = styled.img`
  width: 50px;
  height: auto;
`;
export const LogoHeader = styled.h1`
  width: 100%;
  height: auto;
  font-size: 20px;
  color: white;
`;

export const AccountRightImage = styled.img`
  width: 100%;
  height: 100%;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  height: auto;
  padding-top: 5%;
  padding-bottom: 5%;
  border: 0;
  border-radius: 10px;
`;
