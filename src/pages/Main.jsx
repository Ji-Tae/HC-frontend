import React from 'react';
import { Layout } from '../components/common/styled/Layout';
import { styled } from 'styled-components';
import CustomText from '../components/common/CustomText';
import CustomBtn from '../components/common/CustomBtn';
import MainImg from '../Img/MainPage/MainImg.png';
import Search from '../components/main/search/Search';
import { useNavigate } from 'react-router-dom';
import Label from '../components/main/Label';
import CertCategory from '../components/main/CertCategory';
import CardArea from '../components/main/cardArea/CardArea';
import Cookies from 'js-cookie';

function Main() {
  // 쿠키 가져오기
  const cookie = Cookies.get('accessToken');

  const navigate = useNavigate();

  //회원가입으로 보내기
  const goSignup = () => {
    navigate('/signups');
  };

  //로그인으로 보내기
  const goLogin = () => {
    navigate('/logins');
  };

  //테스트 목록 페이지로 보내기
  const goTestList = () => {
    navigate('/test-list');
  };

  return (
    <Layout>
      {/* 최상단 박스 */}
      <TopBox>
        <ExplainBox>
          <TextContainer>
            {cookie ? (
              <>
                <CustomText fontSize='35px' fontWeight='700' fontFamily='Inter'>
                  원하는 시험지를
                </CustomText>
                <CustomText fontSize='35px' fontWeight='700' fontFamily='Inter'>
                  검색하여 풀어보세요!
                </CustomText>
              </>
            ) : (
              <>
                <CustomText fontSize='35px' fontWeight='700' fontFamily='Inter'>
                  맞춤형 자격증 준비 서비스
                </CustomText>

                <CustomText fontSize='30px' fontWeight='600' fontFamily='Inter' margin='0 0 29px 0'>
                  로그인하고 이용해보세요!
                </CustomText>
              </>
            )}

            {cookie ? null : (
              <ButtonBox>
                <CustomBtn
                  width='180px'
                  height='54px'
                  border='3px solid #282897'
                  _borderradius='30px'
                  bc='#D2E6FF'
                  onClick={goSignup}>
                  <CustomText fontSize='1.2rem' fontWeight='700' color='#282897'>
                    회원가입
                  </CustomText>
                </CustomBtn>

                <CustomBtn
                  width='180px'
                  height='54px'
                  border='3px solid #282897'
                  _borderradius='30px'
                  bc='#282897'
                  onClick={goLogin}>
                  <CustomText fontSize='1.2rem' fontWeight='700' color='#fff'>
                    로그인
                  </CustomText>
                </CustomBtn>
              </ButtonBox>
            )}
          </TextContainer>

          <ImgBox></ImgBox>
        </ExplainBox>

        <SearchBox>
          <SearchTextBox>
            <CustomText fontSize='1.6rem' fontWeight='700' color='#fff'>
              기출문제 찾기
            </CustomText>
          </SearchTextBox>

          <SelectBox>
            {/* 셀렉터로 검색 */}
            <Search />
          </SelectBox>
        </SearchBox>
      </TopBox>

      {/* 자격증별 CBT기출 문제 */}
      <Label label='자격증별 CBT 기출문제' goPage={goTestList} />

      {/* 카테고리 */}
      <CertCategory />

      {/* 북마크순 기출문제 */}
      <Label label='북마크순 기출문제' goPage={goTestList} />

      <CardArea />
    </Layout>
  );
}

const TopBox = styled.div`
  margin-bottom: 142px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 598px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #d2e6ff;

  &::content {
    width: 100%;
  }
`;

const ExplainBox = styled.div`
  width: 100%;
  height: 404px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 150px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 50px;
`;
const ImgBox = styled.div`
  width: 404px;
  height: 360px;
  background-image: url(${MainImg});
  background-repeat: no-repeat;
  background-size: cover;
`;
const SearchBox = styled.div`
  width: 100%;
  height: 194px;
  border-radius: 10px;
  background: #f8faff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SearchTextBox = styled.div`
  width: 282px;
  height: 194px;
  background: #282897;
  border-radius: 10px 0 0 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  letter-spacing: -0.03em;
`;

const SelectBox = styled.div`
  width: 918px;
  height: 194px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export default Main;
