import React, {useEffect, useState} from "react";
import styled from "styled-components";

const ModalBox = styled.div`
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

const Modalcontent = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
`;

const ModalImage = styled.img`
  width:330px;
  height:172px;
`

const PhotoModal = ({show}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(()=>{
    setIsVisible(show);

    if (show) {
      const timer = setTimeout(()=>{
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
      <ModalBox>
        <Modalcontent>
          <ModalImage src="images/imagelimitmodal.png" alt="photolimitmodal" />
        </Modalcontent>
      </ModalBox>
    );
  };


export default PhotoModal;


