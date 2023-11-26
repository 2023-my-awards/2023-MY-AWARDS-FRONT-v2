import React from 'react';
import styled from 'styled-components';
import API from '../api/api';

const CheckButtonContainer = styled.div`
  text-align: right;
  margin-right: 30px;
`;

const StyledButton = styled.button`
  background-color: #8B4513;
  border: 0.5px solid #000000;
  width: 83px;
  height: 33px;
  font-size: 16px;
  font-family: "CinemaL", sans-serif;
  color: #FFFFFF;
  border-radius: 5px;
  cursor: ${(props) => (props.isButtonEnabled ? 'pointer' : 'not-allowed')};
`;

const CheckButton = ({ isButtonEnabled, onClick, inputValue }) => {
  const handleCheck = async () => {
    try {
      // Axios를 사용하여 서버에 POST 요청 보내기
      const response = await API.post("/api/user/check_nickname", {
        nickname: inputValue, // 사용자가 입력한 닉네임을 전송
      });

      // 서버 응답에 대한 로직 추가 (예: 중복확인 성공 여부에 따른 처리)
      console.log(response.data);
    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  };

  return (
    <CheckButtonContainer>
      <StyledButton
        isButtonEnabled={isButtonEnabled}
        onClick={isButtonEnabled ? () => onClick(handleCheck) : null}
      >
        중복확인
      </StyledButton>
    </CheckButtonContainer>
  );
};

export default CheckButton;
