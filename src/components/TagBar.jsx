import React from "react";
import styled from "styled-components";
import HashTag from "./HashTag";

const TagBarDiv = styled.div`
  width: 100%;
  height: 320px;
  background-color: #69320a;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TagBar = (props) => {
  function hashtagClick(tagnum) {
    props.handleTagClick(tagnum);
    props.handleTagValue(tagnum);
    console.log(tagnum);
  }

  return (
    <TagBarDiv media>
      <div
        style={{
          display: "flex",
          marginTop: "25px",
        }}
      >
        <HashTag tagnum={1} onClick={() => hashtagClick(1)} />
        <HashTag tagnum={2} onClick={() => hashtagClick(2)} />
        <HashTag tagnum={3} onClick={() => hashtagClick(3)} />
        <HashTag tagnum={4} onClick={() => hashtagClick(4)} />
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <HashTag tagnum={5} onClick={() => hashtagClick(5)} />
        <HashTag tagnum={6} onClick={() => hashtagClick(6)} />
        <HashTag tagnum={7} onClick={() => hashtagClick(7)} />
        <HashTag tagnum={8} onClick={() => hashtagClick(8)} />
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <HashTag tagnum={9} onClick={() => hashtagClick(9)} />
        <HashTag tagnum={10} onClick={() => hashtagClick(10)} />
        <HashTag tagnum={11} onClick={() => hashtagClick(11)} />
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <HashTag tagnum={12} onClick={() => hashtagClick(12)} />
        <HashTag tagnum={13} onClick={() => hashtagClick(13)} />
        <HashTag tagnum={14} onClick={() => hashtagClick(14)} />
        <HashTag tagnum={15} onClick={() => hashtagClick(15)} />
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <HashTag tagnum={16} onClick={() => hashtagClick(16)} />
        <HashTag tagnum={17} onClick={() => hashtagClick(17)} />
        <HashTag tagnum={18} onClick={() => hashtagClick(18)} />
      </div>
      <div
        style={{
          display: "flex",
          marginBottom: "25px",
        }}
      >
        <HashTag tagnum={19} onClick={() => hashtagClick(19)} />
        <HashTag tagnum={20} onClick={() => hashtagClick(20)} />
        <HashTag tagnum={21} onClick={() => hashtagClick(21)} />
        <HashTag tagnum={22} onClick={() => hashtagClick(22)} />
      </div>
    </TagBarDiv>
  );
};

export default TagBar;
