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
  overflow: hidden;
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

const MyList = () => {
  const [user_posts, setUser_posts] = useState([]);
  const [postId, setPostId] = useState(0);

  const handleListClick = (postId) => {
    console.log("클릭한 요소의 post.id:", postId);
    window.location = `/myaward/${postId}`;
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await API.get("/api/mypage");
        setUser_posts(response.data.user_posts);
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류가 발생했습니다.", error);
      }
    };
    fetchUserPosts();
  }, []);

  return (
    <>
      {user_posts.map((userpost) => (
        <StyledList onClick={() => handleListClick(userpost.id)}>
          <HashTagDiv>
            <HashTagP>
              {userpost.category === "best_all"
                ? "#all"
                : userpost.category === "best_movies"
                ? "#올해의_영화"
                : userpost.category === "best_dramas"
                ? "#올해의_드라마"
                : userpost.category === "best_books"
                ? "#올해의_책"
                : userpost.category === "best_music"
                ? "#올해의_음악"
                : userpost.category === "best_moments"
                ? "#올해의_순간"
                : userpost.category === "best_hobbies"
                ? "#올해의_취미"
                : userpost.category === "best_discoveries"
                ? "#올해의_발견"
                : userpost.category === "best_habits"
                ? "#올해의_습관"
                : userpost.category === "best_sadness"
                ? "#올해의_우울"
                : userpost.category === "best_thoughts"
                ? "#올해의_생각"
                : userpost.category === "best_failures"
                ? "#올해의_실패"
                : userpost.category === "best_regrets"
                ? "#올해의_후회"
                : userpost.category === "best_humor"
                ? "#올해의_유머"
                : userpost.category === "best_tears"
                ? "#올해의_눈물"
                : userpost.category === "best_spending"
                ? "#올해의_소비"
                : userpost.category === "best_emotions"
                ? "#올해의_감동"
                : userpost.category === "best_travels"
                ? "#올해의_여행"
                : userpost.category === "best_food"
                ? "#올해의_음식"
                : userpost.category === "best_gifts"
                ? "#올해의_선물"
                : userpost.category === "best_photos"
                ? "#올해의_사진"
                : userpost.category === "next_year_me"
                ? "#내년의 나"
                : null}
            </HashTagP>
          </HashTagDiv>
          <div style={{ position: "relative", display: "inline-block" }}>
            <SantokkiSpan>수상 제목 : </SantokkiSpan>
            <CinemaMSpan>{userpost.title}</CinemaMSpan>
          </div>
        </StyledList>
      ))}
    </>
  );
};

export default MyList;
