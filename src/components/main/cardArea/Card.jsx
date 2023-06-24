import React from 'react';
import { styled } from 'styled-components';
import CustomText from '../../common/CustomText';

function Card() {
  return (
    <Container onClick={() => alert(`이 서비스는 준비 중 입니다.`)}>
      <NotiBox>
        <Noti>
          <CustomText color='#D3DCE7' fontSize='0.5rem' fontWeight='600'>
            New
          </CustomText>
        </Noti>
      </NotiBox>

      <CustomText fontSize='1.25rem' fontWeight='600'>
        2023
      </CustomText>
      <CustomText fontSize='1.25rem' fontWeight='600'>
        데이터분석기사
      </CustomText>
      <CustomText fontSize='1.25rem' fontWeight='600'>
        N회차
      </CustomText>
    </Container>
  );
}
const Container = styled.div`
  width: 282px;
  height: 217px;

  padding: 20px;

  display: flex;
  flex-direction: column;

  align-items: start;
  justify-content: center;

  border-radius: 10px;

  background: #d2e6ff;

  gap: 10px;

  cursor: pointer;
`;

const NotiBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
`;

const Noti = styled.div`
  width: 58px;
  height: 23px;

  border-radius: 5px;
  background: #486284;

  display: flex;

  align-items: center;
  justify-content: center;
`;
export default Card;
