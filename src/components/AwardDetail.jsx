import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../css/PostDetail.css";
import axios from "axios";
import HashTag from "../components/HashTag";

const PostBox = styled.div`
  margin-top: 15px;
  border-radius: 20px;
  background-color: #f7cc44;
  width: 85%;
  height: auto;
  margin: 0 auto;
  margin-bottom: 25px;
  padding: 10px 20px;
  font-family: "CinemaM";
`;

const Nickname = styled.p`
  font-family: "CinemaM";
  color: "#000000";
  font-size: 16px;
  display: block;
  margin-left: 5px;
  margin-top: 10px;
  margin-bottom: -10px;
`;

const PIContainer = styled.div`
  width: 31px;
  height: 31px;
  margin-top: 8px;
  display: inline-block;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: -15px;
`;

const LikeBtn = styled.img`
  cursor: pointer;
`;

const ScrapBtn = styled.img`
  cursor: pointer;
`;

const AwardDetail = ({ selectedPostId }) => {
  const [postInfo, setPostInfo] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isScrapped, setIsScrapped] = useState(false);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/board/${selectedPostId}`)
      .then((response) => {
        setPostInfo(response.data);
        setIsLiked(response.data.is_liked);
        setIsScrapped(response.data.is_scrapped);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("사용자 정보를 가져오는 중 오류가 발생했습니다.", error);
      });
  }, [selectedPostId]);

  const handleLikeClick = () => {
    axios
      .post(`http://127.0.0.1:8000/api/board/${selectedPostId}/like`)
      .then((response) => {
        setIsLiked(!isLiked);
      })
      .catch((error) => {
        console.error("좋아요 요청을 보내는 중 오류가 발생했습니다.", error);
      });
  };

  const handleScrapClick = () => {
    axios
      .post(`http://127.0.0.1:8000/api/board/${selectedPostId}/scrap`)
      .then((response) => {
        setIsScrapped(!isScrapped);
      })
      .catch((error) => {
        console.error("스크랩 요청을 보내는 중 오류가 발생했습니다.", error);
      });
  };
  return (
    <div id="detail_box">
      {postInfo
        .filter((post) => post.id === selectedPostId)
        .map((post) => (
          <PostBox key={post.id}>
            <PostProfileDiv>
              <PIContainer>
                <ProfileImg
                  src={
                    post.user.profile_image ? `${post.user.profile_image}`:
                    "/images/profile.png"
                  }
                  alt="프로필 사진"
                />
              </PIContainer>
              <div id="detail_header">
                <Nickname>{post.nickname}</Nickname>
                <p id="detail_header_p">{post.date}</p>
              </div>
            </PostProfileDiv>

            <div id="detail_hashtag_div">
              <HashTag tagnum={post.hashtag} />
              <img
                id="detail_menuimg"
                src={"/images/menubar.png"}
              />
            </div>

            <div id="detail_contentbox">
              <p id="detail_title">{post.title}</p>
              <p id="detail_contents">{post.contents}</p>
              <div id="detail_imgcontainer">
                <img id="detail_photo1" src={post.photo1} />
                <img id="detail_photo2" src={post.photo2} />
              </div>
            </div>

            <div id="detail_btnbox">
              <LikeBtn
                id="likebtn"
                src={
                  isLiked
                    ? "/images/like_on.png"
                    : "/images/like_off.png"
                }
                onClick={handleLikeClick}
              />
              <ScrapBtn
                id="scrapbtn"
                src={
                  isScrapped
                    ? "/images/scrap_on.png"
                    : "/images/scrap_off.png"
                }
                onClick={handleScrapClick}
              />
            </div>
          </PostBox>
        ))}
    </div>
  );
};

export default AwardDetail;
