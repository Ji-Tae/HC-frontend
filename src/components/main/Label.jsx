import React from 'react';
import { styled } from 'styled-components';
import CustomText from '../common/CustomText';
import moreImg from '../../Img/MainPage/moreImg.svg';

function Label({ label, goPage }) {
  return (
    <LableContainer>
      <CustomText fontSize='1.55rem' fontWeight='700'>
        {label}
      </CustomText>
      <MoreBtn>
        <CustomText fontSize='1rem' fontWeight='400' textDecoration='underline' onClick={goPage}>
          더보기
        </CustomText>
        <img src={moreImg} alt='more' />
      </MoreBtn>
    </LableContainer>
  );
}

const LableContainer = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;
`;

const MoreBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;
export default Label;
