import React from "react";
import styled from "styled-components";

const StyledButton=styled.button`
  margin-top:0%;
  margin-left:10%;
  border: none;
  background:none;
`;

const Image=styled.img`
  width: 90%;
  margin-left:-43px;
`;

const GameStartButton = ({ isEnabled, onClick }) => {
  const buttonImage = isEnabled ? "images/gamebtn_on.png" : "images/gamebtn_off.png";

  return (
    <StyledButton onClick={onClick}>
      <Image src={buttonImage} alt="GameStart" />
    </StyledButton>
  );
};

export default GameStartButton;