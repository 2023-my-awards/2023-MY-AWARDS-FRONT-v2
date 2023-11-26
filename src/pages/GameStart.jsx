import React, { useState } from "react";
import "../css/GameStart.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";
import GameStartButton from "../components/GameStartButton";

const Input = styled.input`
  border: none;
  outline: none;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 10px;
  width: 150px;
  height: 28px;
  text-align: left;
  font-family: "CinemaB", sans-serif;
  font-size: 16px;
  color: ${(props) =>
    props.textValue ? "#000" : "#9b9ba4"}; // 조건부로 텍스트 색상 변경
`;

const GameStart = () => {
  const inputFields = Array(8).fill(""); // 8개의 빈 문자열 생성
  const [inputValues, setInputValues] = useState(Array(8).fill("")); // 입력된 값 상태
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  // 버튼을 활성화하기 위한 조건 수정
  const isButtonEnabled =
    inputValues.filter((value) => value.trim() !== "").length >= 2;

  const handleRandomSelection = () => {
    const filledInputs = inputValues.filter((value) => value.trim() !== "");

    if (filledInputs.length >= 2) {
      const randomIndex = Math.floor(Math.random() * filledInputs.length);
      const randomItem = filledInputs[randomIndex];
      navigate("/gameresult", { state: { randomItem, inputValues } });
    }
  };

  return (
    <div id="gamebox">
      <div id="logobox">
        <Logo />
      </div>
      <img id="gametitle" src="images/game_title.png" alt="gametitle" />
      <p id="start_contents">친구들과 돌아가며 나만의 어워즈를 공유해보세요!</p>
      <img id="start_mic" src="images/mic.png" alt="mic" />
      <p id="middletitle">참가자 이름을 입력해 주세요!</p>
      <div id="inputcontainer">
        {inputFields.map((_, index) => (
          <Input
            id="Inputtext"
            key={index}
            type="text"
            placeholder={`이름(8자 내외)`}
            textValue={inputValues[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <GameStartButton
        isEnabled={isButtonEnabled}
        onClick={handleRandomSelection}
      />
    </div>
  );
};

export default GameStart;
