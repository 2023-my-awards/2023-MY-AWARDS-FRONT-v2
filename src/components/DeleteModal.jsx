import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../css/fonts/font.css';
import axios from 'axios';

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  text-align: center;
`;

const ModalP = styled.p`
  font-family: 'CinemaL';
  font-size: 16px;
`;

const ModalBtnDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0px;
  justify-content: center;
`;

const DeleteModal = ({ postId, closeModal }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const response = await axios.delete(
        `https://2023-my-awards.com/api/board/${postId}`,
        config
      );

      closeModal();
      if (window.location.href.includes('myscrap')) {
        navigate('/mypage');
      } else if (window.location.href.includes('myaward')) {
        navigate('/mypage');
      } else {
        window.location.reload(); // Default behavior, reloads the page
      }
    } catch (error) {
      console.error('삭제 중 오류:', error);
    }
  };

  return (
    <>
      <ModalWrapper>
        <ModalContent>
          <ModalP
            style={{
              fontFamily: 'CinemaM',
              fontSize: '16px',
              padding: '10px 0px',
            }}
          >
            삭제하시겠습니까?
          </ModalP>
          <ModalBtnDiv>
            <input
              type="button"
              value="취소"
              style={{
                fontFamily: 'CinemaM',
                fontSize: '16px',
                backgroundColor: 'white',
                padding: '20px 70px',
                borderTop: '0.001px solid grey',
                borderRight: '0.001px solid grey',
                borderLeft: 'none',
                borderBottom: 'none',
                borderBottomLeftRadius: '10px',
              }}
              onClick={closeModal}
            />
            <input
              type="button"
              value="삭제"
              style={{
                color: 'red',
                fontFamily: 'CinemaM',
                fontSize: '16px',
                backgroundColor: 'white',
                padding: '20px 70px',
                borderTop: '0.001px solid grey',
                borderRight: 'none',
                borderLeft: 'none',
                borderBottom: 'none',
                borderBottomRightRadius: '10px',
              }}
              onClick={handleDelete}
            />
          </ModalBtnDiv>
        </ModalContent>
      </ModalWrapper>
    </>
  );
};

export default DeleteModal;
