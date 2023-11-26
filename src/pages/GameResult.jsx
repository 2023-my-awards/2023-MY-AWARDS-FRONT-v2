import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../css/GameResult.css";
import { useLocation } from "react-router-dom";
import Logo from "../components/Logo";

const StyledButton = styled.button`
  margin-top: 10%;
  border: none;
  background: none;
`;

const Topics = [
  "영화",
  "드라마",
  "책",
  "음악",
  "순간",
  "발견",
  "습관",
  "우울",
  "생각",
  "실패",
  "후회",
  "눈물",
  "취미",
  "유머",
  "감동",
  "소비",
  "여행",
  "음식",
  "선물",
  "사진",
  "나",
];

const GameResult = () => {
  const location = useLocation();
  const state = location.state;
  const randomItem =
    state && state.randomItem ? state.randomItem : "랜덤 아이템 없음";
  const inputValues = state && state.inputValues ? state.inputValues : [];

  // 필터링된 빈 값이 담긴 배열
  const nonEmptyInputValues = inputValues.filter(
    (value) => value.trim() !== ""
  );

  const [randomHashtag, setRandomHashtag] = useState(
    `올해의_${Topics[Math.floor(Math.random() * Topics.length)]}`
  );

  const generateRandomHashtag = () => {
    const randomHashtagValue = `올해의_${
      Topics[Math.floor(Math.random() * Topics.length)]
    }`;
    setRandomHashtag(randomHashtagValue);
  };

  useEffect(() => {
    generateRandomHashtag();
  }, [randomItem]);

  // 필터링된 배열에서 랜덤으로 아이템 선택
  const randomNonEmptyItem =
    nonEmptyInputValues[Math.floor(Math.random() * nonEmptyInputValues.length)];

  return (
    <div id="gamebox">
      <Logo id="resultlogo" />
      <img id="result_gametitle" src="images/game_title.png" alt="gametitle" />
      <img id="mic" src="images/mic.png" alt="mic" />

      <p id="topic_result">어워즈 주제</p>
      <div id="hashtag-container">
        {randomHashtag && (
          <div id="hashtag-box">
            <img id="topicimage" src="images/topic.png" alt="topic" />
            <div id="hashtag-text">{`#${randomHashtag}`}</div>
          </div>
        )}
      </div>
      <p id="nameresult">{`'${randomNonEmptyItem}'부터 시계방향!`}</p>
      <StyledButton onClick={generateRandomHashtag}>
        <img id="result_nextbutton" src="images/gamestart2.png" alt="button" />
      </StyledButton>
    </div>
  );
};

export default GameResult;
