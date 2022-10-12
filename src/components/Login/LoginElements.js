import styled from "styled-components";

export const LoginBackground = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
`;
export const LoginTitle = styled.h1`
  font-size: 250%;
  color: black;
  z-index: 2;
  white-space: nowrap;
  font-weight: 600;
  margin-bottom: 5%;
  @media screen and (max-width: 699px) {
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  width: 100%;
`;

export const LoginLabel = styled.p`
  background-color: white;
  width: 100%;
  height: auto;
`;

export const LoginField = styled.input`
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid black;
  padding: 1%;
`;

export const LoginButton = styled.button`
  background-color: #17191a;
  color: white;
  width: 100%;
  height: auto;
  font-size: 110%;
  border-radius: 4px;
  padding: 1%;
  margin-bottom: 3%;
  display: inline-block;
  transition: all 0.2s;
  position: relative;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:active {
    background-color: "white";
    color: "black";
    transform: translateY(-1px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }

  &::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 5rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 0.4s;
    background-color: black;
  }

  &:disabled::after {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active::after {
    background-color: "white";
    color: "black";
    transform: translateY(-1px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }

  &:hover::after {
    background-color: "white";
    color: "black";
    transform: scaleX(1.1) scaleY(1.5);
    opacity: 0;
    z-index: 0;
  }
`;
export const LoginQuestion = styled.p`
  background-color: white;
  width: 100%;
  height: auto;
  text-align: center;
  margin-bottom: 2%;
`;
