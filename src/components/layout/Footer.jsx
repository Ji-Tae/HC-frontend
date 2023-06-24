import React from 'react';
import { styled } from 'styled-components';
import CustomText from '../common/CustomText';
import logo from '../../Img/MainPage/hera-class-logo-black.png';

function Footer() {
  return (
    <Container>
      <ItemBox>
        <LogoBox>
          <Img src={logo} />
          <CustomText fontWeight='700' fontSize='1rem'>
            | Fe: <a href='https://github.com/THE-HERA-CLASS/HC-frontend'>Github</a> | Be:{' '}
            <a href='https://github.com/THE-HERA-CLASS/HC-backend'>Github</a> |{' '}
            <a href='https://teamsparta.notion.site/99-14-34184f2fff0b4e38b4fee3239f7d4c6f'>프로젝트소개서</a>
          </CustomText>
        </LogoBox>

        <p />

        <CustomText fontSize='1rem'>HERA CLASS | TeamHera: 박하은 박지태 김수지 김현수 김채민 강준석</CustomText>

        <CustomText fontSize='1rem'>주소: 서울특별시 강남구 테헤란로44길 8 12층</CustomText>

        <CustomText fontSize='1rem'>고객센터: the.hera.class@gmail.com</CustomText>

        <p />

        <CustomText fontWeight='700' fontSize='1rem'>
          ⓒHERACLASS. ALL RIGHTS RESERVED
        </CustomText>
      </ItemBox>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 347px;
  background: #f8faff;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemBox = styled.div`
  width: 1200px;
  height: 100%;
  padding-top: 150px;
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: 150px;
  height: 30px;
`;

const LogoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: baseline;
`;
export default Footer;
