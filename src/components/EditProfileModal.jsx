import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// 스타일을 적용할 수 있도록 스타일드 컴포넌트를 사용합니다.
const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
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
  padding: 20px;
  text-align: center;
`;

const ModalImage = styled.img`
  width:330px;
  height:172px;
`;

const EditProfileModal = ({ show }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(show);

    if (show) {
      // 모달이 표시된 상태일 때, 2-3초 후 모달을 닫기 위해 타이머를 설정합니다.
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      // 컴포넌트가 언마운트되면 타이머를 클리어합니다.
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible) {
    return null;
  }

  return (
    <ModalWrapper>
      <ModalContent>
        <ModalImage src="images/editprofilemodal.png" alt="successmodal" />
      </ModalContent>
    </ModalWrapper>
  );
};

export default EditProfileModal;
