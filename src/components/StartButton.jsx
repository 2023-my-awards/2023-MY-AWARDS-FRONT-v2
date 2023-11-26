import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledButton=styled.button`
  margin-top:40px;
  margin-bottom:70px;
  margin-left:40px;
  border: none;
  background:none;
`;

const Image=styled.img`
  width: 90%;
  margin-left:-43px;
`;

const StartButton = ({ isEnabled, onClick }) => {
  const buttonImage = isEnabled ? "images/start_on.png" : "images/start_off.png";

  return (
    <StyledButton onClick={onClick}>
      <Image src={buttonImage} alt="Start" />
    </StyledButton>
  );
};

export default StartButton;