import React, { useState, useEffect } from "react";
import "../css/Posting.css";
import Logo from "../components/Logo";
import styled from "styled-components";
import "../css/fonts/font.css";
import CustomFileInputButton from "../components/CustomFileInputButton";
import TagBar from "../components/TagBar";
import HashTag from "../components/HashTag";
import axios from "axios";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const StyledTxt = styled.p`
  color: #8a0b0b;
  font-family: "Santokki";
  font-size: 20px;
  display: inline-block;
  text-align: center;
`;

const StyledImg = styled.img`
  width: 26px;
  height: 26px;
  display: inline-block;
  padding-left: 5px;
  margin-bottom: -8px;
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

const Posting = ({ tagnum }) => {
  const [hashtag, setHashtag] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [postImage, setPostImage] = useState("post_off.png");
  const [tagBarVisible, setTagBarVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState(0);
  const [selectedValue, setSelectedValue] = useState("selecter");
  const [imageFiles, setImageFiles] = useState([null, null]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/hashtag", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setCategories(
          response.data.categories.filter(
            (categories) => categories.id === tagnum
          )
        );
      });
  }, [tagnum]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    if (newTitle && contents) {
      setPostImage("post_on.png");
    } else {
      setPostImage("post_off.png");
    }
  };

  const handleContentsChange = (e) => {
    const newContents = e.target.value;
    setContents(newContents);

    if (title && newContents) {
      setPostImage("post_on.png");
    } else {
      setPostImage("post_off.png");
    }
  };

  const handleImageChange = async (images) => {
    console.log("Received Images in Posting:", images);

    try {
      const blobImages = await Promise.all( // 이미지 파일을 blob으로 변환
        images.map(async (image) => {
          const response = await fetch(image);
          const blob = await response.blob();
          return blob;
        })
      );

      console.log("blob Images:", blobImages);

      setImageFiles(blobImages);
    } catch (error) {
      console.error("이미지 변환에 오류가 발생 :", error);
    }
  };
  

  const toggleTagBar = () => {
    setTagBarVisible(true);
  };

  const TagBarClick = () => {
    if (tagBarVisible) {
      setTagBarVisible(false);
    }
  };

  const handleTagClick = (tagnum) => {
    console.log(tagnum);
    setSelectedTag(tagnum);
  };

  const handleTagValue = (tagnum, value) => {
    switch (tagnum) {
      case 0:
        value = "select";
        break;
      case 1:
        value = "best_all";
        break;
      case 2:
        value = "best_movies";
        break;
      case 3:
        value = "best_dramas";
        break;
      case 4:
        value = "best_books";
        break;
      case 5:
        value = "best_music";
        break;
      case 6:
        value = "best_moments";
        break;
      case 7:
        value = "best_hobbies";
        break;
      case 8:
        value = "best_discoveries";
        break;
      case 9:
        value = "best_habits";
        break;
      case 10:
        value = "best_sadness";
        break;
      case 11:
        value = "best_thoughts";
        break;
      case 12:
        value = "best_failures";
        break;
      case 13:
        value = "best_regrets";
        break;
      case 14:
        value = "best_humor";
        break;
      case 15:
        value = "best_tears";
        break;
      case 16:
        value = "best_spending";
        break;
      case 17:
        value = "best_emotions";
        break;
      case 18:
        value = "best_travels";
        break;
      case 19:
        value = "best_food";
        break;
      case 20:
        value = "best_gifts";
        break;
      case 21:
        value = "best_photos";
        break;
      case 22:
        value = "next_year_me";
        break;
    }
    setSelectedValue(value);
    console.log(value);
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    console.log("Image Files in handleSubmit:", imageFiles);
    if (title && contents) {
      try {
        const userResponse = await axios.get(
          "http://127.0.0.1:8000/api/user/current_user",
          {
            withCredentials: true, // 쿠키 사용
          }
        );
        const userId = userResponse.data.id;
        const formData = new FormData();

        // FormData에 전송할 데이터 추가
        if (imageFiles) {
          imageFiles.forEach((file, index) => {
            if (file) {
              formData.append(`images`, file, `image${index + 1}.png`);
            }
          });
        }
        
        
        formData.append('title', title);
        formData.append('content', contents);
        formData.append('category', selectedValue);
        formData.append('writer', userId);

        console.log("FormData with Images:", formData);

        const response = await API.post("/api/board", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        if (response.data) {
          console.log("게시글 등록 성공!");
          navigate("/mainpage");
        } else {
          console.log("게시글 등록 실패:", response.data.message);
        }
      } catch (error) {
        console.error("서버 요청 오류:", error);
      }
    } else {
      alert("수상 제목과 내용을 모두 입력하세요.");
    }
  };

  return (
    <div id="posting_container">
      <br />
      <Logo />

      <img
        id="decoration"
        src={"./images/decoration.png"}
        alt="deco"
      />
      <div id="posting_box">
        <div id="posting_title">
          <StyledTxt>올해의 마이 어워즈</StyledTxt>
          <StyledImg src={ "./images/medal.png"} />
        </div>

        <div id="posting_hashtag" onClick={toggleTagBar}>
          <HashTag id="post_hastag_component" tagnum={selectedTag} />
          <span id="post_hashtag_span">부문</span>
        </div>

        <form id="posting_form">
          <label htmlFor="input_title">수상 제목 :</label>
          <input
            type="text"
            id="input_title"
            placeholder="제목을 입력해주세요. (20자 내외)"
            value={title}
            onChange={handleTitleChange}
          />
          <br />

          <label htmlFor="input_contents" id="label_textarea">
            내용 :
          </label>
          <div id="textarea_div">
            <textarea
              id="input_contents"
              placeholder="내용을 입력해주세요. (300자 내외)"
              rows="11"
              value={contents}
              onChange={handleContentsChange}
            />
          </div>
          <br />
          <CustomFileInputButton onImageChange={handleImageChange}/>
          <p id="photonotice">사진 첨부는 2장까지만 가능합니다!</p>
        </form>
      </div>

      <p id="posting_congrats">수상을 축하합니다!</p>
      <img
        id="posting_btn"
        src={`./images/${postImage}`}
        alt="등록버튼"
        onClick={handleSubmit}
      />
      <div
        id="posting_tagbar"
        className={tagBarVisible ? "visible" : "hidden"}
        onClick={TagBarClick}
      >
        <TagBar
          handleTagClick={handleTagClick}
          handleTagValue={handleTagValue}
        />
      </div>
    </div>
  );
};

export default Posting;
