import React from 'react';
import { css, styled } from 'styled-components';

//재사용성 컴포넌트
function CustomBtn(props) {
  //프롭스를 구조분해 할당 해서 선언 한 겁니다.
  //width : 버튼 넓이
  //height : 버튼 높이
  //margin : 마진
  //bc : background-color
  //shadow : 버튼의 그림자 설정
  //border : 보더 설정입니다.
  //_borderradius : 보더 모서리 설정입니다.
  //color : 글씨 색입니다.
  //disabled : 버튼 비활성화. 이 프롭스만 넘겨줘도 되게 설정해놓음.
  //position : 포지션 설정
  //type : 버튼 타입 지정
  //onClick : 클릭 시 실행 되는 함수 프롭
  const { children, bc, width, height, border, onClick, margin, shadow, type, position, _borderradius, disabled } =
    props;
  return (
    <ButtonStyled
      margin={margin}
      bc={bc}
      width={width}
      height={height}
      border={border}
      shadow={shadow}
      onClick={onClick}
      _borderradius={_borderradius}
      type={type}
      disabled={disabled}
      position={position}>
      {children}
    </ButtonStyled>
  );
}
const ButtonStyled = styled.button`
  box-sizing: border-box;
  margin: ${({ margin }) => `${margin}`};
  width: ${({ width }) => `${width}`};
  height: ${({ height }) => `${height}`};
  border-radius: ${({ _borderradius }) => `${_borderradius}`};
  background-color: ${({ bc }) => `${bc}`};
  box-shadow: ${({ shadow }) => `${shadow}`};
  position: ${({ position }) => `${position}`};
  ${({ disabled }) =>
    disabled
      ? css`
          pointer-events: none;
          opacity: 0.1;
        `
      : ''}
  ${({ border }) =>
    border
      ? css`
          border: ${border};
        `
      : css`
          border: none;
        `}

  &:hover {
    filter: brightness(110%);
  }
  &:active {
    filter: brightness(90%);
  }
  cursor: pointer;
`;

export default CustomBtn;
