import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 모달 스타일
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Nickyes = styled.img`
    width: 330px;
    height:172px;
`;

const Nickno = styled.img`
    width: 330px;
    height:172px;
`;

const CheckModal = ({ show, isSuccess }) => {
  const [modalShow, setModalShow] = useState(show);

  // 컴포넌트가 로드될 때 show 상태를 확인하여 모달 표시 여부를 설정
  useEffect(() => {
    setModalShow(show);

    // 2~3초 후에 모달을 자동으로 닫음
    if (show) {
      setTimeout(() => {
        setModalShow(false);
      }, 2000); // 2초 후에 모달 닫기
    }
  }, [show]);

  return (
    <ModalContainer show={modalShow}>
      {isSuccess ? (
        <Nickyes src="images/nickyes.png" alt="success" />
      ) : (
        <Nickno src="images/nickno.png" alt="fail" />
      )}
    </ModalContainer>
  );
};

export default CheckModal;
