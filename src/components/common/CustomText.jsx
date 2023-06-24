import React from 'react';
import { styled } from 'styled-components';

// 글자에 스타일을 넣기 위한 컴포넌트입니다.

function CustomText(props) {
  // fontSize : 글자 크기 입니다.
  // color : 글자 색 입니다
  // fontWeight : 글자 굵기 입니다.
  // margin : 글자 마진 입니다.
  // cursor : 글자 커서 모양 입니다.
  // onClick : 이벤트 함수를 넘겨 줍니다.
  // fontFamily : 글자 모양 입니다.
  //textDecoration: 텍스트 데코레이션 (밑 줄 등등)입니다.
  //opacity: 투명도
  const { children, fontSize, color, fontWeight, margin, cursor, onClick, fontFamily, textDecoration, opacity, value } =
    props;
  return (
    <TextStyled
      fontSize={fontSize}
      color={color}
      fontWeight={fontWeight}
      margin={margin}
      cursor={cursor}
      onClick={onClick}
      fontFamily={fontFamily}
      textDecoration={textDecoration}
      opacity={opacity}
      value={value}>
      {children}
    </TextStyled>
  );
}

const TextStyled = styled.div`
  cursor: ${({ cursor }) => `${cursor}`};
  font-size: ${({ fontSize }) => `${fontSize}`};
  font-weight: ${({ fontWeight }) => `${fontWeight}`};
  color: ${({ color }) => `${color}`};
  margin: ${({ margin }) => (margin ? `${margin}` : null)};
  font-family: ${({ fontFamily }) => `${fontFamily}`};
  text-decoration: ${({ textDecoration }) => `${textDecoration}`};
  opacity: ${({ opacity }) => `${opacity}`};
`;
export default CustomText;
