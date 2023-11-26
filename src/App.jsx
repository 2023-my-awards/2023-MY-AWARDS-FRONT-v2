import "./App.css";
import { Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import SetProfile from "./pages/SetProfile";
import MainPage from "./pages/MainPage";
import Posting from "./pages/Posting";
import GameStart from "./pages/GameStart";
import GameResult from "./pages/GameResult";
import MyPage from "./pages/MyPage";
import MyAward from "./pages/MyAward";
import MyScrap from "./pages/MyScrap";
import EditMyPost from "./pages/EditMyPost";
import EditProfile from "./pages/EditProfile";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const pageContent = document.getElementById("page-content");
    if (pageContent) {
      const pageHeight = pageContent.scrollHeight;
      const windowHeight = window.innerHeight;

      if (pageHeight > windowHeight) {
        pageContent.style.overflowY = "scroll";
      }
    }
  }, []);
  return (
    <Routes>
      <Route path="/intro" element={<Intro />}></Route>
      <Route path="/mainpage" element={<MainPage />}></Route>
      <Route path="/posting" element={<Posting />}></Route>
      <Route path="/setprofile" element={<SetProfile />}></Route>
      <Route path="/gamestart" element={<GameStart />}></Route>
      <Route path="/gameresult" element={<GameResult />}></Route>
      <Route path="/mypage" element={<MyPage />}></Route>
      <Route path="/myaward/:postId" element={<MyAward />}></Route>
      <Route path="/myscrap/:postId" element={<MyScrap />}></Route>
      <Route path="/editmypost" element={<EditMyPost />}></Route>
      <Route path="/editprofile" element={<EditProfile />}></Route>
    </Routes>
  );
}

export default App;
