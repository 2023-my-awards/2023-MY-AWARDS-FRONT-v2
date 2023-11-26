import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../css/fonts/font.css";
import axios from "axios";

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

const HashTag = ({ tagnum, onClick }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/hashtag", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // 쿠키사용
      })
      .then((response) => {
        setCategories(
          response.data.categories.filter(
            (categories) => categories.id == tagnum
          )
        );
      });
  }, [tagnum]);

  const handleClick = () => {
    if (onClick) {
      onClick(tagnum);
    }
  };

  return (
    <div>
      <HashTagDiv onClick={handleClick}>
        {categories.map((categories) => (
          <HashTagP key={categories.id}>{categories.tagname}</HashTagP>
        ))}
      </HashTagDiv>
    </div>
  );
};

export default HashTag;
