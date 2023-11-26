import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Logo from "../components/Logo";
import "../css/MyPage.css";
import MiniProfile from "../components/MiniProfile";
import AwardDetail from "../components/AwardDetail";
import NavBar from "../components/NavBar";

function MyAward() {
  const { postId } = useParams();
  useEffect(() => {
    console.log(postId);
  }, [postId]);
  console.log(postId);

  return (
    <div id="mydetail_box">
      <br />
      <Logo />
      <div id="awardlist_box">
        <div id="mypage_header">
          <div id="mypage_title">
            <p id="mp_title_txt">수상 내역</p>
            <img
              id="trophy"
              src={"/images/trophy.png"}
            />
          </div>
          <div id="mypage_profile">
            <MiniProfile />
          </div>
        </div>
        <div>
          <AwardDetail selectedPostId={postId} />
        </div>
      </div>
      <NavBar />
    </div>
  );
}

export default MyAward;
