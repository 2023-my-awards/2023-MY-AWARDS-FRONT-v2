import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import API from "../api/api";

const StyledButton = styled.button`
    font-family: "CinemaB", sans-serif;
    font-size: 20px;
    margin-top: 80%;
    bottom: 0;
    margin-left: -2%;
    right: 0;
    text-align: center;
    background: none;
    border: none;
`;

const Image = styled.img`
    width: 85%;
    height: auto;
    align-self: center;
`

const KakaoLoginButton = () => {
    const navigate = useNavigate();

    const handleKakaoLogin = () => {
        // Kakao 로그인 페이지로 이동
        window.location.href = "http://127.0.0.1:8000/api/kakao/login";
    };


    return (
        <div>
            <StyledButton onClick={handleKakaoLogin}>
                <Image id="kakaologin_button" src="images/kakaologin.png" alt="loginbutton" />
            </StyledButton>
        </div>
    );
};

export default KakaoLoginButton;
