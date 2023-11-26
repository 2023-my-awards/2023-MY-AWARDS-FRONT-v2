import React from "react";
import Logo from "../components/Logo";
import "../css/MyPage.css";
import MiniProfile from "../components/MiniProfile";
import MyList from "../components/MyList";
import ScrapList from "../components/ScrapList";
import NavBar from "../components/NavBar";

function MyPage(props) {
  return (
    <div id="mypage_box">
      <br />
      <Logo />
      <div id="awardlist_box">
        <div id="mypage_header">
          <div id="mypage_title">
            <p id="mp_title_txt">수상 내역</p>
            <img
              id="trophy"
              src={"./images/trophy.png"}
            />
          </div>
          <div id="mypage_profile">
            <MiniProfile />
          </div>
        </div>

        <div id="mylist_scrollbox">
          <MyList />
        </div>
      </div>

      <div id="scraplist_box">
        <div id="mypage_title">
          <p id="mp_title_txt">스크랩</p>
          <img
            id="trophy"
            src={"./images/trophy.png"}
          />
        </div>
        <div id="scraplist_scrollbox">
          <ScrapList />
        </div>
      </div>
      <NavBar />
    </div>
  );
}

export default MyPage;
