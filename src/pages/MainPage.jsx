import React, { useState, useEffect } from "react";
import "../css/MainPage.css";
import Logo from "../components/Logo";
import "../css/fonts/font.css";
import TagBar from "../components/TagBar";
import HashTag from "../components/HashTag";
import MainPost from "../components/MainPost";
import NavBar from "../components/NavBar";
import axios from "axios";

function MainPage({ tagnum }) {
  const [hashtag, setHashtag] = useState([]);
  const [tagBarVisible, setTagBarVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState(1);
  const [selectedValue, setSelectedValue] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://2023-my-awards.com/api/hashtag", {
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

  return (
    <div
      style={{
        backgroundImage: `url(${
          "./images/main_bg.png"
        })`,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Logo style={{ display: "inline" }} />
      <div id="main_hashtag" onClick={toggleTagBar}>
        <HashTag tagnum={selectedTag} />
      </div>
      <div id="main_post_div">
        <MainPost selectedTag={selectedTag} />
      </div>
      <div
        id="main_tagbar"
        className={tagBarVisible ? "visible" : "hidden"}
        onClick={TagBarClick}
      >
        <TagBar
          handleTagClick={handleTagClick}
          handleTagValue={handleTagValue}
        />
      </div>
      <div id="main_navbar_div">
        <NavBar />
      </div>
    </div>
  );
}

export default MainPage;
