import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { loginPost } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import CustomText from '../components/common/CustomText';
import CustomBtn from '../components/common/CustomBtn';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
function Login() {
  const navigate = useNavigate();

  //홈으로 가기
  const goHome = () => {
    navigate('/');
  };

  //회원가입으로 가기
  const goSignup = () => {
    navigate('/signups');
  };

  //로그인 인풋 관리
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  //userInput 핸들러
  const userInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  // 로그인 뮤테이션
  const loginMutation = useMutation(loginPost, {
    onSuccess: (res) => {
      if (res.status === 200) {
        const cookie = Cookies.get('accessToken');
        const userInfo = jwtDecode(cookie);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        goHome();
      }
    },
  });

  //로그인 제출 핸들러
  const submitHandler = (e) => {
    e.preventDefault();

    const user = {
      email: userInput.email,
      password: userInput.password,
    };

    loginMutation.mutate(user);
  };

  return (
    <form onSubmit={submitHandler}>
      <LoginLayout>
        <LoginCard>
          <CustomText margin='0 0 49px 0' fontSize='2rem' fontWeight='700' color='#282897'>
            로그인
          </CustomText>

          <LoginInput
            type='text'
            name='email'
            value={userInput.email}
            onChange={userInputChangeHandler}
            placeholder='아이디'
            required
          />

          <LoginInput
            type='password'
            name='password'
            value={userInput.password}
            onChange={userInputChangeHandler}
            placeholder='비밀번호'
            required
          />

          <FindIdBox>
            <CustomText
              fontSize='0.95rem'
              fontWeight='500'
              textDecoration='underline'
              cursor='pointer'
              onClick={() => alert(`이 서비스는 준비 중 입니다.`)}>
              아이디 찾기
            </CustomText>
            <CustomText
              fontSize='0.95rem'
              fontWeight='500'
              textDecoration='underline'
              cursor='pointer'
              onClick={() => alert(`이 서비스는 준비 중 입니다.`)}>
              비밀번호 찾기
            </CustomText>
          </FindIdBox>

          <CustomBtn type='submit' width='384px' height='66px' _borderradius='10px' bc='#282897'>
            <CustomText fontSize='1.5rem' fontWeight='700' color='#fff'>
              Login
            </CustomText>
          </CustomBtn>

          <GoSignupBox>
            <CustomText fontSize='0.95rem' fontWeight='500' color=' #486284'>
              아직 회원이 아니신가요?
            </CustomText>
            <CustomText
              fontSize='1.2rem'
              fontWeight='700'
              textDecoration='underline'
              onClick={goSignup}
              cursor='pointer'>
              회원가입
            </CustomText>
          </GoSignupBox>
        </LoginCard>
      </LoginLayout>
    </form>
  );
}

const LoginLayout = styled.div`
  background: #d2e6ff;

  padding: 70px 0;

  height: 1048px;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;

const LoginCard = styled.div`
  width: 612px;
  height: 600px;

  padding-top: 80px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: start;

  background: #fff;

  border-radius: 10px;
`;

const LoginInput = styled.input`
  width: 384px;
  height: 60px;

  background: #eff3fd;

  border-radius: 10px;

  border: none;

  margin: 15px;

  padding-left: 24px;

  font-size: 1.2rem;

  &::placeholder {
    font-size: 20px;
    color: #898989;
  }
`;

const FindIdBox = styled.div`
  width: 384px;

  margin-bottom: 49px;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: end;

  gap: 24px;
`;

const GoSignupBox = styled.div`
  width: 384px;

  margin-top: 13px;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  gap: 14px;
`;
export default Login;
