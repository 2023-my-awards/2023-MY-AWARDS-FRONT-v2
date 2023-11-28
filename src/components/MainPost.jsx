import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../css/PostDetail.css';
import axios from 'axios';
import HashTag from '../components/HashTag';
import DeleteModal from '../components/DeleteModal';
import API from '../api/api';

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
  border-radius: 15px;
  overflow: hidden;
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

const MainPost = ({ selectedTag }) => {
  const [postInfo, setPostInfo] = useState([]);
  const [postStates, setPostStates] = useState([]);
  const [selectedValue, setSelectedValue] = useState('selecter');
  const [category, setCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalPostId, setDeleteModalPostId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState([]);

  const formatUpdatedAT = isoString => {
    const date = new Date(isoString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat(options).format(date);
  };

  const handleDeleteClick = postId => {
    setDeleteModalPostId(postId);
    setShowDeleteModal(true);
  };

  const handleLikeClick = async index => {
    const postId = postInfo[index].id;
    const updatedPostStates = [...postStates];

    // 좋아요 상태 토글
    updatedPostStates[index] = {
      ...updatedPostStates[index],
      likebtn: !updatedPostStates[index].likebtn,
    };

    setPostStates(updatedPostStates);

    try {
      if (updatedPostStates[index].likebtn) {
        // 좋아요를 누른 경우 (좋아요 추가)
        const response = await API.post(`/api/board/${postId}/like`, {
          user: userId,
          post: postId,
        });
        console.log('좋아요 요청이 성공했습니다.', response);

        // 요청 완료 시, 상태 업데이트
        updatedPostStates[index] = {
          ...updatedPostStates[index],
          likeImage: './images/like_on.png',
          likeCount: response.data.like_count,
        };

        // 좋아요 개수 화면에 반영
        document.getElementById(`like_count_${postId}`).textContent =
          response.data.like_count;
        setPostStates(updatedPostStates);

        // 좋아요 개수를 다시 가져와서 화면에 반영
        const updatedLikeCount = await LikeView(postId);
        updatedPostStates[index].likeCount = updatedLikeCount;
        document.getElementById(`like_count_${postId}`).textContent =
          updatedLikeCount;
        setPostStates(updatedPostStates);
      } else {
        // 좋아요를 취소한 경우 (좋아요 추가 후 취소)
        const response = await API.post(`/api/board/${postId}/like`, {
          user: userId,
          post: postId,
        });
        console.log('좋아요 취소 요청이 성공했습니다.', response);
        updatedPostStates[index] = {
          ...updatedPostStates[index],
          likeImage: './images/like_off.png',
          likeCount: response.data.like_count,
        };
        console.log('좋아요 개수:', response.data.like_count);
        setPostStates(updatedPostStates);

        // 좋아요 개수를 다시 가져와서 화면에 반영
        const updatedLikeCount = await LikeView(postId);
        updatedPostStates[index].likeCount = updatedLikeCount;
        document.getElementById(`like_count_${postId}`).textContent =
          updatedLikeCount;
        setPostStates(updatedPostStates);
      }
    } catch (error) {
      console.error('좋아요 요청 중 오류가 발생했습니다.', error);
    }
  };

  const handleScrapClick = async index => {
    const postId = postInfo[index].id;
    const updatedPostStates = [...postStates];

    // 스크랩 상태 토글
    updatedPostStates[index] = {
      ...updatedPostStates[index],
      scrapbtn: !updatedPostStates[index].scrapbtn,
    };

    setPostStates(updatedPostStates);

    try {
      if (updatedPostStates[index].scrapbtn) {
        // 스크랩한 경우 (스크랩 추가)
        const response = await API.post(`/api/board/${postId}/scrap`, {
          user: userId,
          post: postId,
        });
        console.log('스크랩 요청이 성공했습니다.', response);
        // 성공적으로 요청이 완료되면 이미지 업데이트
        updatedPostStates[index] = {
          ...updatedPostStates[index],
          ScrapImage: './images/scrap_on.png',
        };
      } else {
        // 스크랩을 취소한 경우 (스크랩 추가 후 취소)
        const response = await API.post(`/api/board/${postId}/scrap`, {
          user: userId,
          post: postId,
        });
        console.log('스크랩 취소 요청이 성공했습니다.', response);
        updatedPostStates[index] = {
          ...updatedPostStates[index],
          ScrapImage: './images/scrap_off.png',
        };
      }
    } catch (error) {
      console.error('스크랩 요청 중 오류가 발생했습니다.', error);
    }
  };

  const filteredPosts = postInfo.filter(post => {
    switch (selectedTag) {
      case 1:
        return true;
      case 2:
        return post.category === 'best_movies';
      case 3:
        return post.category === 'best_dramas';
      case 4:
        return post.category === 'best_books';
      case 5:
        return post.category === 'best_music';
      case 6:
        return post.category === 'best_moments';
      case 7:
        return post.category === 'best_hobbies';
      case 8:
        return post.category === 'best_discoveries';
      case 9:
        return post.category === 'best_habits';
      case 10:
        return post.category === 'best_sadness';
      case 11:
        return post.category === 'best_thoughts';
      case 12:
        return post.category === 'best_failures';
      case 13:
        return post.category === 'best_regrets';
      case 14:
        return post.category === 'best_humor';
      case 15:
        return post.category === 'best_tears';
      case 16:
        return post.category === 'best_spending';
      case 17:
        return post.category === 'best_emotions';
      case 18:
        return post.category === 'best_travels';
      case 19:
        return post.category === 'best_food';
      case 20:
        return post.category === 'best_gifts';
      case 21:
        return post.category === 'best_photos';
      case 22:
        return post.category === 'next_year_me';
      default:
        return true;
    }
  });

  const getLikeStatus = async postId => {
    try {
      const response = await axios.get(
        `https://2023-my-awards.com/api/board/${postId}/like_status`,
        {
          withCredentials: true,
        }
      );

      return response.data.is_liked;
    } catch (error) {
      console.error('좋아요 상태를 가져오는 중 오류 발생:', error);
      return false; // 에러 발생 시 기본값으로 false를 반환
    }
  };

  const getScrapStatus = async postId => {
    try {
      const response = await axios.get(
        `https://2023-my-awards.com/api/board/${postId}/scrap_status`,
        {
          withCredentials: true,
        }
      );

      return response.data.is_scrapped;
    } catch (error) {
      console.error('스크랩 상태를 가져오는 중 오류 발생:', error);
      return false; // 에러 발생 시 기본값으로 false를 반환
    }
  };

  const LikeView = async postId => {
    try {
      const response = await axios.get(
        `https://2023-my-awards.com/api/board/${postId}/like`,
        {
          withCredentials: true,
        }
      );
      console.log('좋아요 개수:', response.data.like_count);

      return response.data.like_count;
    } catch (error) {
      console.error('좋아요 개수를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const fetchDataAndLikeStatus = async () => {
      try {
        // 사용자 정보
        const userResponse = await axios.get(
          'https://2023-my-awards.com/api/user/current_user',
          {
            withCredentials: true,
          }
        );
        setUserId(userResponse.data.id);

        // 게시판 정보
        const response = await API.get('/api/board');

        setPostInfo(response.data);
        setPostStates(
          response.data.map(() => ({
            likebtn: false,
            scrapbtn: false,
            likeCount: response.data.like_count,
            likeImage: './images/like_off.png',
            ScrapImage: './images/scrap_off.png',
          }))
        );
        setCategory(response.data.category);
        console.log('버튼 눌림');
        // console.log(response.data);

        // 각 게시물에 대한 좋아요, 스크랩 상태를 가져와서 업데이트
        const updatedPostStates = await Promise.all(
          response.data.map(async post => {
            const isLiked = await getLikeStatus(post.id);
            const isScrapped = await getScrapStatus(post.id);
            const likeCount = await LikeView(post.id);
            return {
              likebtn: postStates.some(state => state.postId === post.id)
                ? postStates.find(state => state.postId === post.id).likebtn
                : isLiked,
              scrapbtn: postStates.some(state => state.postId === post.id)
                ? postStates.find(state => state.postId === post.id).scrapbtn
                : isScrapped,
              likeCount: likeCount.like_count,
              likeImage: './images/like_off.png',
              ScrapImage: './images/scrap_off.png',
              postId: post.id, // 게시물 ID 저장
            };
          })
        );

        setPostStates(updatedPostStates);
      } catch (error) {
        console.error('fetchDataAndLikeStatus 함수에서 오류 발생:', error);
      }
    };

    fetchDataAndLikeStatus();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await API.get(`/api/mypage`);
        setUserInfo(response.data.user_info);
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류가 발생했습니다.', error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div id="detail_box">
      {filteredPosts.map((post, index) => (
        <PostBox key={post.id}>
          <PostProfileDiv>
            <PIContainer>
              <ProfileImg
                src={
                  post.user.profile_image
                    ? `${post.user.profile_image}`
                    : 'images/default.png'
                }
                alt="프로필 사진"
              />
            </PIContainer>
            <div id="detail_header">
              <Nickname>{post.nickname}</Nickname>
              <p id="detail_header_p">{formatUpdatedAT(post.created_at)}</p>
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
            {post.nickname === userInfo.nickname ? (
              <img
                id="detail_menuimg"
                src={'./images/menubar.png'}
                onClick={() => handleDeleteClick(post.id)}
              />
            ) : (
              <img id="detail_menuimg" style={{ display: 'none' }} />
            )}
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
            <div id="likebtn_div">
              <img
                id="likebtn"
                src={
                  postStates[index].likebtn
                    ? './images/like_on.png'
                    : './images/like_off.png'
                }
                onClick={() => {
                  handleLikeClick(index);
                }}
              />
              <span id={`like_count_${post.id}`}>{post.like_count}</span>
            </div>
            <img
              id="scrapbtn"
              src={
                postStates[index].scrapbtn
                  ? './images/scrap_on.png'
                  : './images/scrap_off.png'
              }
              onClick={() => {
                handleScrapClick(index);
                // 스크랩 상태를 가져오는 함수에 해당 게시물의 ID를 전달
                getScrapStatus(post.id);
              }}
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

export default MainPost;
