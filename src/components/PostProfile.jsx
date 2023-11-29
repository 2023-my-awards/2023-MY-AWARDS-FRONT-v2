import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Nickname = styled.p`
  font-family: "CinemaM";
  color: "#000000";
  font-size: 16px;
  display: inline-block;
  margin-left: 5px;
  padding-bottom: 20px;
`;

const PIContainer = styled.div`
  width: 31px;
  height: 31px;
  margin-top: 8px;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostProfile = () => {
  const [postInfo, setPostInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`https://2023-my-awards.com/api/board/${this.post_id}`)
      .then((response) => {
        setPostInfo(response.data);
      })
      .catch((error) => {
        console.error("사용자 정보를 가져오는 중 오류가 발생했습니다.", error);
      });
  }, []);

  return (
    <div>
      <PostProfileDiv>
        <PIContainer>
          <ProfileImg
            src={
              post.user.profile_image ? `${post.user.profile_image}`:
              "./images/default.png"
            }
            alt="프로필 사진"
          />
        </PIContainer>
        {postInfo
          .filter((postInfo) => postInfo.id === 1)
          .map((postInfo) => (
            <Nickname>{postInfo.nickname}</Nickname>
          ))}
      </PostProfileDiv>
    </div>
  );
};

export default PostProfile;
