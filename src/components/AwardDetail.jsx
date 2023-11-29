import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../css/PostDetail.css';
import axios from 'axios';
import HashTag from '../components/HashTag';
import DeleteModal from './DeleteModal';

const PostBox = styled.div`
  margin-top: 15px;
  border-radius: 20px;
  background-color: #f7cc44;
  width: 85%;
  height: auto;
  margin: 0 auto;
  margin-bottom: 25px;
  padding: 10px 20px;
  font-family: 'CinemaM';
`;

const Nickname = styled.p`
  font-family: 'CinemaM';
  color: '#000000';
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
  font-family: 'CinemaL';
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

const AwardDetail = ({ selectedPostId }) => {
  // const [postInfo, setPostInfo] = useState([
  //   {
  //     id: 69,
  //     images: [
  //       {
  //         image:
  //           'http://2023-my-awards.com/media/post/69/2023/11/29/image1.png',
  //       },
  //       {
  //         image:
  //           'http://2023-my-awards.com/media/post/69/2023/11/29/image2.png',
  //       },
  //     ],
  //     nickname: '곰도링',
  //     user: {
  //       nickname: '곰도링',
  //       profile_image: null,
  //     },
  //     title: '테스트용',
  //     content: '테스트용',
  //     created_at: '2023-11-29T16:34:34.502293',
  //     like_count: 0,
  //     category: 'best_dramas',
  //     writer: 11,
  //   },
  // ]);

  const [postInfo, setPostInfo] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isScrapped, setIsScrapped] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalPostId, setDeleteModalPostId] = useState(null);

  const handleDeleteClick = postId => {
    setDeleteModalPostId(postId);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    axios
      .get(`https://2023-my-awards.com/api/board/${selectedPostId}`)
      .then(response => {
        setPostInfo(response.data);
        setIsLiked(response.data.is_liked);
        setIsScrapped(response.data.is_scrapped);
        console.log(response.data);
      })
      .catch(error => {
        console.error('사용자 정보를 가져오는 중 오류가 발생했습니다.', error);
      });
  }, [selectedPostId]);

  const handleLikeClick = () => {
    axios
      .post(`https://2023-my-awards.com/api/board/${selectedPostId}/like`)
      .then(response => {
        setIsLiked(!isLiked);
      })
      .catch(error => {
        console.error('좋아요 요청을 보내는 중 오류가 발생했습니다.', error);
      });
  };

  const handleScrapClick = () => {
    axios
      .post(`https://2023-my-awards.com/api/board/${selectedPostId}/scrap`)
      .then(response => {
        setIsScrapped(!isScrapped);
      })
      .catch(error => {
        console.error('스크랩 요청을 보내는 중 오류가 발생했습니다.', error);
      });
  };

  return (
    <div id="detail_box">
      {postInfo.map(post => (
        <PostBox key={post.id}>
          <PostProfileDiv>
            <PIContainer>
              <ProfileImg
                src={
                  post.user.profile_image
                    ? `${post.user.profile_image}`
                    : '/images/default.png'
                }
                alt="프로필 사진"
              />
            </PIContainer>
            <div id="detail_header">
              <Nickname>{post.nickname}</Nickname>
              <p id="detail_header_p">
                {post.created_at.split('T')[0].replace(/-/g, '.')}
              </p>
            </div>
          </PostProfileDiv>

          <div id="detail_hashtag_div">
            <HashTagDiv>
              <HashTagP>
                {post.category === 'best_all'
                  ? '#all'
                  : post.category === 'best_movies'
                  ? '#올해의_영화'
                  : post.category === 'best_dramas'
                  ? '#올해의_드라마'
                  : post.category === 'best_books'
                  ? '#올해의_책'
                  : post.category === 'best_music'
                  ? '#올해의_음악'
                  : post.category === 'best_moments'
                  ? '#올해의_순간'
                  : post.category === 'best_hobbies'
                  ? '#올해의_취미'
                  : post.category === 'best_discoveries'
                  ? '#올해의_발견'
                  : post.category === 'best_habits'
                  ? '#올해의_습관'
                  : post.category === 'best_sadness'
                  ? '#올해의_우울'
                  : post.category === 'best_thoughts'
                  ? '#올해의_생각'
                  : post.category === 'best_failures'
                  ? '#올해의_실패'
                  : post.category === 'best_regrets'
                  ? '#올해의_후회'
                  : post.category === 'best_humor'
                  ? '#올해의_유머'
                  : post.category === 'best_tears'
                  ? '#올해의_눈물'
                  : post.category === 'best_spending'
                  ? '#올해의_소비'
                  : post.category === 'best_emotions'
                  ? '#올해의_감동'
                  : post.category === 'best_travels'
                  ? '#올해의_여행'
                  : post.category === 'best_food'
                  ? '#올해의_음식'
                  : post.category === 'best_gifts'
                  ? '#올해의_선물'
                  : post.category === 'best_photos'
                  ? '#올해의_사진'
                  : post.category === 'next_year_me'
                  ? '#내년의 나'
                  : null}
              </HashTagP>
            </HashTagDiv>

            <img
              id="detail_menuimg"
              src={'/images/menubar.png'}
              onClick={() => handleDeleteClick(post.id)}
            />
          </div>

          <div id="detail_contentbox">
            <p id="detail_title">{post.title}</p>
            <p id="detail_contents">{post.content}</p>
            <div id="detail_imgcontainer">
              {post.images && post.images.length > 0 && (
                <>
                  <img
                    id="detail_photo1"
                    src={post.images[0].image}
                    alt="첫번째 이미지"
                  />
                  {post.images.length > 1 && (
                    <img
                      id="detail_photo2"
                      src={post.images[1].image}
                      alt="두번째 이미지"
                    />
                  )}
                </>
              )}
            </div>
          </div>

          <div id="detail_btnbox">
            <LikeBtn
              id="likebtn"
              src={isLiked ? '/images/like_on.png' : '/images/like_off.png'}
              onClick={handleLikeClick}
            />
            <ScrapBtn
              id="scrapbtn"
              src={
                isScrapped ? '/images/scrap_on.png' : '/images/scrap_off.png'
              }
              onClick={handleScrapClick}
            />
          </div>
        </PostBox>
      ))}

      {showDeleteModal && (
        <DeleteModal
          postId={deleteModalPostId}
          closeModal={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default AwardDetail;
