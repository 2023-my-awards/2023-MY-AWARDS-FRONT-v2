import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin-top: 40px;
  margin-bottom:70px;
  margin-left: 40px;
  border: none;
  background: none;
`;

const Image = styled.img`
  width: 90%;
  margin-left:-43px;
`;

const EditProfileButton = ({ isEnabled, onClick }) => {
  const buttonImage = isEnabled ? "images/editprofile_on.png" : "images/editprofile_off.png";

  return (
    <div>
      <StyledButton onClick={onClick}>
        <Image src={buttonImage} alt="Change" />
      </StyledButton>
    </div>
  );
};

export default EditProfileButton;
