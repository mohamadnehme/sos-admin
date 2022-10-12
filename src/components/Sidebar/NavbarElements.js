import styled from "styled-components";

export const Nav = styled.nav`
  width: 100%;
  background: #131313;
  color: #ffffff;
  height: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: stretch;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: flex-start;
  align-content: stretch;
  margin-left: 30px;
  margin-top: 30px;
  cursor: pointer;
`;

export const LogoImage = styled.img`
  font-size: 100%;
`;
export const LogoHeader = styled.h1`
  font-size: 100%;
  margin-top: 10%;
`;
export const NavbarSections = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  width: 65%;
  margin-top: 1.9%;
  @media screen and (max-width: 1390px) and (min-width: 1010px) {
    transition: 0.8s all ease;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    width: 55%;
    margin-top: 2.2%;
  }

  @media screen and (max-width: 1009px) and (min-width: 700px) {
    transition: 0.8s all ease;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    width: 30%;
    margin-top: 2.6%;
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
`;
export const NavbarSection = styled.div`
  padding: 0% 1%;
  @media screen and (max-width: 1009px) and (min-width: 700px) {
    padding: 0% 4%;
  }
`;
export const NavbarSectionText = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #ffffff;
  white-space: nowrap;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid #fff;
  }
  &:hover {
    border-bottom: 1px solid #fff;
    color: #63d0ff;
  }
  @media screen and (max-width: 1390px) and (min-width: 1010px) {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    text-align: center;
    color: #ffffff;
    white-space: nowrap;
    cursor: pointer;

    &.active {
      border-bottom: 3px solid #fff;
    }
    &:hover {
      border-bottom: 1px solid #fff;
      color: #63d0ff;
    }
  }
  @media screen and (max-width: 1009px) and (min-width: 700px) {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    text-align: center;
    color: #ffffff;
    white-space: nowrap;
    cursor: pointer;

    &.active {
      border-bottom: 3px solid #fff;
    }
    &:hover {
      border-bottom: 1px solid #fff;
      color: #63d0ff;
    }
  }
`;
export const NavbarEndLinks = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  margin-right: 30px;
  width: 100%;
  `;
export const SocialsNavbar = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: flex-start;
  margin-left: -100%;
  margin-top: 4%;
  @media screen and (max-width: 1390px) and (min-width: 1010px) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    align-content: flex-start;
    margin-left: -50%;
    margin-top: 4%;
  }
  @media screen and (max-width: 1390px) and (min-width: 1010px) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    align-content: flex-start;
    margin-left: -50%;
    margin-top: 4%;
  }
`;
export const SocialNavbar = styled.div`
  margin-left: -100%;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid #fff;
  }
  &:hover {
    border-bottom: 1px solid #fff;
    color: #63d0ff;
  }
  @media screen and (max-width: 1390px) and (min-width: 1010px) {
    margin-left: -70%;
    cursor: pointer;

    &.active {
      border-bottom: 3px solid #fff;
    }
    &:hover {
      border-bottom: 1px solid #fff;
      color: #63d0ff;
    }
  }
`;

export const NavbarEndLine = styled.div`
  border-left: 1px solid white;
  height: 30px;
  opacity: 0.4;
  margin-top: 2%;
  @media screen and (max-width: 1390px) and (min-width: 1010px) {
    border-left: 1px solid white;
    height: 30px;
    opacity: 0.4;
    margin-top: 2%;
  }
  @media screen and (max-width: 1009px) and (min-width: 700px) {
    border-left: 1px solid white;
    height: 30px;
    opacity: 0.4;
    margin-top: 2%;
  }
`;

export const NavbarButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  // background-color: red;
`;

export const NavbarSignUp = styled.button`
  width: 100px;
  height: 40px;
  background-color: #131313;
  border: 2px solid #36c3ff;
  border-radius: 5px;
  background: #131313;
  color: white;
  font-size: 15px;
  white-space: nowrap;
  &:hover {
    background-color: #63d0ff; /* Green */
    color: white;
    cursor: pointer;
    transition-duration: 0.7s;
  }
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  @media screen and (max-width: 1390px) and (min-width: 1010px) {
    width: 90px;
    height: 40px;
    background-color: #131313;
    border: 2px solid #36c3ff;
    border-radius: 5px;
    background: #131313;
    color: white;
    font-size: 15px;
    white-space: nowrap;
    &:hover {
      background-color: #63d0ff; /* Green */
      color: white;
      cursor: pointer;
      transition-duration: 0.7s;
    }
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
  }
`;

export const NavbarLogin = styled.button`
  width: 100px;
  height: 40px;
  background-color: #36c3ff;
  border: 2px solid #36c3ff;
  border-radius: 5px;
  background: #36c3ff;
  color: white;
  font-size: 15px;
  white-space: nowrap;
  &:hover {
    background-color: Transparent;
    color: white;
    cursor: pointer;
    transition-duration: 0.7s;
  }
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  @media screen and (max-width: 1390px) and (min-width: 1010px) {
    width: 90px;
    height: 40px;
    background-color: #36c3ff;
    border: 2px solid #36c3ff;
    border-radius: 5px;
    background: #36c3ff;
    color: white;
    font-size: 15px;
    white-space: nowrap;
    &:hover {
      background-color: Transparent;
      color: white;
      cursor: pointer;
      transition-duration: 0.7s;
    }
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
  }
`;

export const NavBarWallet = styled.img`
  width: 25px;
  cursor: pointer;
  margin-top: 18%;
`;

export const ActivateCercle = styled.div`
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
`;

export const NavsMobile = styled.div`
  @media screen and (min-width: 700px) {
    display: none;
  }
  z-index: 5;
  padding-right: 5%;
  margin-top: 1.5%;
`;

export const SubNavs = styled.p`
  padding: 3%;
  white-space: nowrap;
  font-size: 110%;
  color: white;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid white;
    color: white;
  }
  &:active {
    border-bottom: 1px solid white;
    color: white;
  }

  @media screen and (max-width: 1360px) and (min-width: 1034px) {
    padding: 3%;
    white-space: nowrap;
    font-size: 85%;
  }
  @media screen and (max-width: 1033px) and (min-width: 800px) {
    padding: 2%;
    white-space: nowrap;
    font-size: 80%;
  }
  z-index: 2;
`;

export const NavPageMobile = styled.div`
  background-color: #131313;
  position: absolute;
  z-index: 3;
  height: 700vh;
  width: 100%;
  padding-left: 15%;
  @media screen and (min-width: 701px) {
    display: none;
  }
`;

export const ProfileMobileContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
`;

export const ConnectToWalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  color: white;
  font-weight: 100;
  font-size: 80%;
  margin-top: -10%;
`;

export const ProfileName = styled.h1`
  color: white;
  font-size: 150%;
  margin-top: 12%;
`;

export const NavbarMobileLine = styled.div`
  background-color: white;
  width: 90%;
  height: 0.5px;
  margin-top: 1%;
  margin-bottom: 5%;
`;
export const ButtonsMobileRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
  align-content: stretch;
  padding-right: 10%;
  padding-top: 10%;
`;
