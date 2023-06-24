import React from 'react';
import { styled } from 'styled-components';
import CustomText from '../common/CustomText';
import CustomBtn from '../common/CustomBtn';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { LogoutDelete } from '../../api/users';

function Header() {
  const cookie = Cookies.get('accessToken');
  const userInfo = localStorage.getItem('userInfo');
  const userAuth = JSON.parse(userInfo)?.authority;
  const navigate = useNavigate();

  //홈으로 가기
  const goHome = () => {
    navigate('/');
  };

  // 회원가입으로 가기
  const goSignup = () => {
    navigate('/signups');
  };

  //로그인으로 가기
  const goLogin = () => {
    navigate('/logins');
  };

  //마이페이지로 가기
  const goUserMyPage = () => {
    alert(`이 서비스는 준비 중 입니다.`);
    // navigate('/usermypages');
  };

  //관리자페이지로 가기
  const goAdmin = () => {
    navigate('/adminpages');
  };

  // 모든 테스트 목록 페이지로 가기
  const goTestList = () => {
    navigate('/test-list');
  };

  //로그아웃 뮤테이션
  const LogoutMutation = useMutation(LogoutDelete, {
    onSuccess: () => {
      Cookies.remove('accessToken');
      localStorage.removeItem('userInfo');
      goHome();
    },
  });

  //로그아웃 핸들러
  const LogoutHandler = () => {
    LogoutMutation.mutate();
  };
  return (
    <Container>
      <Title>
        <CustomText
          fontSize='32px'
          fontWeight='600'
          fontFamily='Inter'
          color=' #1A202C'
          cursor='pointer'
          onClick={goHome}>
          Hera Class
        </CustomText>
      </Title>

      <MenuWrap>
        <CustomText
          fontSize='15px'
          fontWeight='600'
          fontFamily='Roboto'
          color='#1A202C'
          cursor='pointer'
          onClick={goHome}>
          홈
        </CustomText>

        <CustomText
          fontSize='15px'
          fontWeight='600'
          fontFamily='Plus Jakarta Sans'
          color='#1A202C'
          cursor='pointer'
          onClick={goTestList}>
          기출문제
        </CustomText>

        {cookie ? (
          <>
            {userAuth === 'A' ? (
              <CustomText
                fontSize='15px'
                fontWeight='600'
                fontFamily='Plus Jakarta Sans'
                color='#1A202C'
                cursor='pointer'
                onClick={goAdmin}>
                문제관리
              </CustomText>
            ) : (
              <CustomText
                fontSize='15px'
                fontWeight='600'
                fontFamily='Plus Jakarta Sans'
                color='#1A202C'
                cursor='pointer'
                onClick={goUserMyPage}>
                마이페이지
              </CustomText>
            )}

            <Divider />
            <CustomBtn width='82px' height='38px' bc='#282897' _borderradius='4px'>
              <CustomText fontSize='15px' fontWeight='500' fontFamily='Inter' color='#fff' onClick={LogoutHandler}>
                로그아웃
              </CustomText>
            </CustomBtn>
          </>
        ) : (
          <>
            <Divider />

            <CustomText
              fontSize='15px'
              fontWeight='600'
              fontFamily='Inter'
              color='#282897'
              textDecoration='underline'
              opacity='0.75'
              cursor='pointer'
              onClick={goSignup}>
              회원가입
            </CustomText>
            <CustomBtn width='82px' height='38px' bc='#282897' _borderradius='4px'>
              <CustomText fontSize='15px' fontWeight='500' fontFamily='Inter' color='#fff' onClick={goLogin}>
                로그인
              </CustomText>
            </CustomBtn>
          </>
        )}
      </MenuWrap>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100px;
  padding: 28px 72px;

  border: 1px solid #486284;
  box-sizing: border-box;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  letter-spacing: -0.03em;
`;

const MenuWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  letter-spacing: -0.03em;

  gap: 25px;
`;

const Divider = styled.div`
  height: 21px;
  border-left: 1px solid #486284;
  opacity: 0.8;
`;
export default Header;
