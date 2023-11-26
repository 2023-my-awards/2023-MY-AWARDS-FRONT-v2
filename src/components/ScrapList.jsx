import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "../css/fonts/font.css";
import HashTag from "./HashTag";
import API from "../api/api";

const StyledList = styled.div`
  background-color: #f7cc44;
  width: 85%;
  height: 30px;
  border-radius: 10px;
  margin-left: 30px;
  margin-bottom: 15px;
  display: flex;
  padding-top: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SantokkiSpan = styled.span`
  font-family: "Santokki";
  font-size: 14px;
  color: #8a0b0b;
`;

const CinemaMSpan = styled.span`
  font-family: "CinemaM";
  font-size: 14px;
  color: #000000;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const HashTagDiv = styled.div`
  background-color: #ffffff;
  border: 0.01cm solid black;
  border-radius: 15px;
  padding: 0px 5px;
  width: auto;
  height: 23px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  margin: 0px 5px;
`;

const HashTagP = styled.p`
  font-family: "CinemaL";
  font-size: 14px;
  color: black;
  -webkit-text-stroke: 0.01cm black;
  margin-top: 4px;
  margin-right: 3px;
  white-space: nowrap;

  @media (max-width: 410px) {
    font-size: 12px;
  }
`;

const ScrapList = () => {
  const [user_scraps, setUser_scraps] = useState([]);
  const [postId, setPostId] = useState(null);

  const handleListClick = (scrapId) => {
    console.log("클릭한 요소의 scrap.id:", scrapId);
    window.location = `/myscrap/${scrapId}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/api/mypage");

        setUser_scraps(response.data.user_scraps);
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류가 발생했습니다.", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {user_scraps.map((userscrap) => (
        <StyledList onClick={() => handleListClick(userscrap.id)}>
          <HashTagDiv>
            <HashTagP>
              {userscrap.category === "best_all"
                ? "#all"
                : userscrap.category === "best_movies"
                ? "#올해의_영화"
                : userscrap.category === "best_dramas"
                ? "#올해의_드라마"
                : userscrap.category === "best_books"
                ? "#올해의_책"
                : userscrap.category === "best_music"
                ? "#올해의_음악"
                : userscrap.category === "best_moments"
                ? "#올해의_순간"
                : userscrap.category === "best_hobbies"
                ? "#올해의_취미"
                : userscrap.category === "best_discoveries"
                ? "#올해의_발견"
                : userscrap.category === "best_habits"
                ? "#올해의_습관"
                : userscrap.category === "best_sadness"
                ? "#올해의_우울"
                : userscrap.category === "best_thoughts"
                ? "#올해의_생각"
                : userscrap.category === "best_failures"
                ? "#올해의_실패"
                : userscrap.category === "best_regrets"
                ? "#올해의_후회"
                : userscrap.category === "best_humor"
                ? "#올해의_유머"
                : userscrap.category === "best_tears"
                ? "#올해의_눈물"
                : userscrap.category === "best_spending"
                ? "#올해의_소비"
                : userscrap.category === "best_emotions"
                ? "#올해의_감동"
                : userscrap.category === "best_travels"
                ? "#올해의_여행"
                : userscrap.category === "best_food"
                ? "#올해의_음식"
                : userscrap.category === "best_gifts"
                ? "#올해의_선물"
                : userscrap.category === "best_photos"
                ? "#올해의_사진"
                : userscrap.category === "next_year_me"
                ? "#내년의 나"
                : null}
            </HashTagP>
          </HashTagDiv>
          <div style={{ position: "relative", display: "inline-block" }}>
            <SantokkiSpan>수상 제목 : </SantokkiSpan>
            <CinemaMSpan>{userscrap.post_title}</CinemaMSpan>
          </div>
        </StyledList>
      ))}
    </>
  );
};

export default ScrapList;
