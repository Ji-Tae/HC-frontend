import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { authMailPost, emailConfirmGet, nicknameConfirmGet, signupPost, verifyMailPost } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { majorGet } from '../api/certificate';
import { styled } from 'styled-components';
import CustomBtn from '../components/common/CustomBtn';
import CustomText from '../components/common/CustomText';

function Signup() {
  const navigate = useNavigate();

  //전공 불러오기
  const { data } = useQuery('major', majorGet);

  //input 스테이트
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [major_id, setMajor_id] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  //오류메세지 스테이트
  const [emailMsg, setEmailMsg] = useState('');
  const [nicknameMsg, setNicknameMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [confirmPwMsg, setConfirmPwMsg] = useState('');

  //유효성검사 스테이트
  const [isEmail, setIsEmail] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isConfirmPw, setIsConfirmPw] = useState(false);
  const [isMajor, setIsMajor] = useState(false);
  const [isVerifyCode, setIsVerifyCode] = useState(false);

  //중복검사 스테이트
  const [existsEmail, setExistsEmail] = useState(false);
  const [existsNickname, setExistsNickname] = useState(false);

  //이메일 인증 스테이트
  const [verifyEmail, setVerifyEmail] = useState(false);

  // 로그인으로 보내기
  const goLogin = () => {
    navigate('/logins');
  };

  // 이메일 이벤트 핸들러
  const onChangeEmailHandler = (e) => {
    //이메일 정규 표현식
    const emailRegex = /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMsg('이메일 형식이 틀렸습니다. 다시 확인해주세요.');
      setIsEmail(false);
    } else {
      setEmailMsg('올바른 이메일 형식입니다.');
      setIsEmail(true);
    }
  };

  //닉네임 이벤트 핸들러
  const onChangeNicknameHandler = (e) => {
    // 닉네임 정규표현식
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
    const nicknameCurrent = e.target.value;
    setNickname(nicknameCurrent);

    if (!nicknameRegex.test(nicknameCurrent)) {
      setNicknameMsg('영문 대소문자, 숫자, 한글로 2글자 이상 10글자 이하로 입력해주세요.');
      setIsNickname(false);
    } else {
      setNicknameMsg('올바른 닉네임 형식입니다.');
      setIsNickname(true);
    }
  };

  //비밀번호 이벤트 핸들러
  const onChangePasswordHandler = (e) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,15}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMsg('비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함한 8~15자여야 합니다.');
      setIsPassword(false);
    } else {
      setPasswordMsg('올바른 비밀번호 형식입니다.');
      setIsPassword(true);
    }
  };

  //비밀번호 확인 이벤트 핸들러
  const onChangeConfirmPwHandler = (e) => {
    const confirmPwCurrent = e.target.value;
    const passwordCurrent = password;
    setConfirmPw(confirmPwCurrent);

    if (confirmPwCurrent !== passwordCurrent) {
      setConfirmPwMsg('비밀번호가 틀립니다. 다시 확인해주세요.');
      setIsConfirmPw(false);
    } else {
      setConfirmPwMsg('비밀번호와 일치합니다.');
      setIsConfirmPw(true);
    }
  };

  //전공 선택 이벤트 핸들러
  const onChangeMajorHandler = (e) => {
    const majorCurrent = e.target.value;
    setMajor_id(majorCurrent);

    if (majorCurrent === '') {
      setIsMajor(false);
    } else {
      setIsMajor(true);
    }
  };

  //인증코드 이벤트 핸들러
  const onChangeVerifyCodeHandler = (e) => {
    const verifyCodeCurrent = e.target.value;
    setVerifyCode(verifyCodeCurrent);

    if (verifyCodeCurrent.length === 6) {
      setIsVerifyCode(true);
    } else {
      setIsVerifyCode(false);
    }
  };

  // 인증 코드 발송 뮤테이션
  const authEmaliMutation = useMutation(authMailPost, {
    onSuccess: () => {
      setExistsEmail(true);
    },
  });

  //이메일 중복 체크 핸들러, 이후 통신이 성공적이면 바로 인증코드 발송
  const emailConfirmClick = async () => {
    const response = await emailConfirmGet(email);
    if (response?.status === 200) {
      //중복 체크 후 바로 인증코드 발송
      authEmaliMutation.mutate({ email });
    }
  };

  //닉네임 중복 체크 핸들러
  const nicknameConfirmHandler = async () => {
    const response = await nicknameConfirmGet(nickname);
    if (response?.status === 200) {
      setExistsNickname(true);
    }
  };

  // 이메일 인증 뮤테이션
  const verifyMailMutation = useMutation(verifyMailPost, {
    onSuccess: (data) => {
      if (data.status === 200) {
        setVerifyEmail(true);
      }
    },
  });

  // 이메일인증 클릭 이벤트 핸들러
  const verifyMailClick = () => {
    const verify = {
      email,
      userCode: verifyCode,
    };
    verifyMailMutation.mutate(verify);
  };

  //회원가입 요청 뮤테이션
  const signupMutation = useMutation(signupPost, {
    onSuccess: (res) => {
      if (res.status === 200) {
        goLogin();
      }
    },
  });

  //회원가입 요청 핸들러
  const submitHandler = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      nickname,
      password,
      major_id,
    };
    signupMutation.mutate(newUser);
  };

  return (
    <form onSubmit={submitHandler}>
      <SignupLayout>
        <SignupContainer>
          {/* 페이지 타이틀 */}
          <TitleBox>
            <CustomText color='#000' fontSize='2rem' fontWeight='700'>
              회원가입
            </CustomText>
            <CustomText
              color='#282897'
              fontSize='1.5rem'
              fontWeight='700'
              textDecoration='underline'
              cursor='pointer'
              onClick={goLogin}>
              로그인
            </CustomText>
          </TitleBox>

          {/* 아이디 인풋*/}
          <ItemBox>
            <CustomText fontSize='1.5rem'>아이디</CustomText>
            <ConfirmBox>
              <SignupInput
                name='email'
                onChange={onChangeEmailHandler}
                value={email}
                type='email'
                placeholder='email@gmail.com'
                pattern='[a-zA-Z0-9]+(?:[.][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*'
              />

              <CustomBtn
                type='button'
                width='200px'
                height='60px'
                bc='#282897'
                _borderradius='10px'
                onClick={emailConfirmClick}
                disabled={!isEmail}>
                <CustomText color='#fff' fontSize='1.2rem' fontWeight='600'>
                  중복확인
                </CustomText>
              </CustomBtn>
            </ConfirmBox>

            {email.length > 0 && <ErrorMsg iserror={isEmail.toString()}>{emailMsg}</ErrorMsg>}
          </ItemBox>

          {/* 인증코드 인풋*/}
          <ItemBox>
            <ConfirmBox>
              <SignupInput
                name='verifyCode'
                onChange={onChangeVerifyCodeHandler}
                value={verifyCode}
                placeholder='인증코드를 입력해주세요.'
              />

              <CustomBtn
                type='button'
                width='200px'
                height='60px'
                bc='#282897'
                _borderradius='10px'
                onClick={verifyMailClick}
                disabled={!isVerifyCode}>
                <CustomText color='#fff' fontSize='1.2rem' fontWeight='600'>
                  인증하기
                </CustomText>
              </CustomBtn>
            </ConfirmBox>
          </ItemBox>

          {/* 비밀번호 인풋*/}
          <ItemBox>
            <CustomText fontSize='1.5rem'>비밀번호</CustomText>
            <SignupInput
              name='password'
              onChange={onChangePasswordHandler}
              value={password}
              type='password'
              placeholder='비밀번호'
            />

            {password.length > 0 && <ErrorMsg iserror={isPassword.toString()}>{passwordMsg}</ErrorMsg>}
          </ItemBox>

          {/* 비밀번호 확인 인풋*/}
          <ItemBox>
            <CustomText fontSize='1.5rem'>비밀번호 확인</CustomText>
            <SignupInput
              name='confirmPw'
              onChange={onChangeConfirmPwHandler}
              value={confirmPw}
              type='password'
              placeholder='비밀번호 재확인'
            />

            {confirmPw.length > 0 && <ErrorMsg iserror={isConfirmPw.toString()}>{confirmPwMsg}</ErrorMsg>}
          </ItemBox>

          {/* 닉네임 인풋*/}
          <ItemBox>
            <CustomText fontSize='1.5rem'>닉네임</CustomText>
            <ConfirmBox>
              <SignupInput
                name='nickname'
                onChange={onChangeNicknameHandler}
                value={nickname}
                type='text'
                placeholder='닉네임'
              />

              <CustomBtn
                type='button'
                width='200px'
                height='60px'
                bc='#282897'
                _borderradius='10px'
                onClick={nicknameConfirmHandler}
                disabled={!isNickname}>
                <CustomText color='#fff' fontSize='1.2rem' fontWeight='600'>
                  중복확인
                </CustomText>
              </CustomBtn>
            </ConfirmBox>

            {nickname.length > 0 && <ErrorMsg iserror={isNickname.toString()}>{nicknameMsg}</ErrorMsg>}
          </ItemBox>

          {/* 전공선택*/}
          <ItemBox>
            <CustomText fontSize='1.5rem'>전공선택</CustomText>
            <MajorSelector name='major_id' value={major_id} onChange={onChangeMajorHandler}>
              <option value='' disabled hidden>
                전공 선택
              </option>
              {data?.map((major) => {
                return (
                  <option key={major.major_id} value={major.major_id}>
                    {major.name}
                  </option>
                );
              })}
            </MajorSelector>

            {major_id === '' && <ErrorMsg>전공을 선택해주세요</ErrorMsg>}
          </ItemBox>

          <CustomBtn
            _borderradius='10px'
            margin='78px 0 0 0'
            width='100%'
            height='72px'
            bc='#282897'
            type='submit'
            disabled={
              !isEmail ||
              !isNickname ||
              !isPassword ||
              !isMajor ||
              !isConfirmPw ||
              !existsEmail ||
              !existsNickname ||
              !verifyEmail
            }>
            <CustomText color='#fff' fontSize='1.5rem' fontWeight='700'>
              가입하기
            </CustomText>
          </CustomBtn>
        </SignupContainer>
      </SignupLayout>
    </form>
  );
}

const SignupLayout = styled.div`
  width: 588px;
  margin: auto;
`;

const SignupContainer = styled.div`
  width: 588px;

  margin: 70px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  margin-bottom: 40px;

  align-items: baseline;
  justify-content: flex-end;
  gap: 156px;
`;

const SignupInput = styled.input`
  width: 100%;
  height: 60px;

  border-radius: 10px;
  border: none;

  box-sizing: border-box;

  padding-left: 25px;

  background: #eff3fd;

  font-size: 1.2rem;

  &::placeholder {
    font-size: 20px;
    color: #898989;
  }
`;

const MajorSelector = styled.select`
  width: 100%;
  height: 60px;

  border-radius: 10px;
  border: none;

  box-sizing: border-box;

  background: #eff3fd;

  text-align: center;

  color: #898989;

  font-size: 20px;
`;

const ItemBox = styled.div`
  width: 100%;
  margin: 12px 0;

  display: flex;
  flex-direction: column;

  align-items: start;
  justify-content: center;

  gap: 5px;
`;

const ConfirmBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: end;

  gap: 15px;
`;

const ErrorMsg = styled.span`
  color: ${({ iserror }) => (iserror === 'true' ? 'blue' : 'red')};
`;
export default Signup;
