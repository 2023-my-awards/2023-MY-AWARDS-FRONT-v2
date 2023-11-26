import React from "react";
import "../css/Intro.css";
import styled from "styled-components";
import KakaoLoginButton from "../components/KakaoLoginButton";
import IntroIcon from "../../public/images/introname.png"

const Appname = styled.div`
  font-family: "Santokki", sans-serif;
  font-size: 64px;
  color: #f7cc44;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const Intro = () => {
  return (
    <div className="intro">
      <Appname>
        <img id="nameimage" src={IntroIcon} alt="intro" />
      </Appname>
      <KakaoLoginButton id="button" />
    </div>
  );
};

export default Intro;
