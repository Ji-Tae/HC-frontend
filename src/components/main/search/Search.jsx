import React, { useState } from 'react';
import { styled } from 'styled-components';
import CustomBtn from '../../common/CustomBtn';
import { majorGet, matchingCertGet, matchingSubGet } from '../../../api/certificate';
import { useQuery } from 'react-query';
import SearchIcon from '../../../Img/MainPage/search.svg';
import SearchDown from '../../../Img/MainPage/searchdown.svg';
import { useNavigate } from 'react-router-dom';

function Search() {
  const navigate = useNavigate();
  // select 스테이트
  const [select, setSelect] = useState({
    major_id: '',
    certificate_id: '',
    subject_id: '',
  });

  // 전공 불러오기
  const { data: majorData } = useQuery('major', majorGet, {
    //5분 동안 캐싱처리
    cacheTime: 300 * 1000,
  });

  // 전공에 따른자격증 불러오기
  const { data: certificateData } = useQuery(
    ['matchingCertGet', select.major_id], // 쿼리 키에 select.major_id를 추가하여 전공 선택 시마다 쿼리를 재실행
    () => matchingCertGet(select.major_id),
    {
      enabled: select.major_id !== '', // select.major_id 값이 비어있지 않을 때에만 쿼리를 실행
      //5분 동안 캐싱처리
      cacheTime: 300 * 1000,
    },
  );

  // 자격증에 따른 과목 불러오기
  const { data: subjectData } = useQuery(
    ['matchingSub', select.certificate_id], // 쿼리 키에 select.certificate_id를 추가하여 전공 선택 시마다 쿼리를 재실행
    () => matchingSubGet(select.certificate_id),
    {
      enabled: select.certificate_id !== '', // select.certificate_id 값이 비어있지 않을 때에만 쿼리를 실행
      //5분 동안 캐싱처리
      cacheTime: 300 * 1000,
    },
  );

  //select 핸들러
  const selectChangeHandler = (e) => {
    const { name, value } = e.target;
    setSelect({
      ...select,
      [name]: value,
    });
  };

  const searchHandler = (subjectId) => {
    if (select.major_id !== '' && select.certificate_id !== '' && select.subject_id !== '') {
      navigate(`/test-list/subject/${subjectId}`);
    } else {
      alert(`각 항목을 모두 체크해주세요.`);
    }
  };
  return (
    <SelectBox>
      <Select name='major_id' value={select.major_id} onChange={selectChangeHandler}>
        <option value='' disabled hidden>
          전공
        </option>
        {majorData?.map((major) => {
          return (
            <option key={major.major_id} value={major.major_id}>
              {major.name}
            </option>
          );
        })}
      </Select>

      <Divider />

      <Select name='certificate_id' value={select.certificate_id} onChange={selectChangeHandler}>
        <option value='' disabled hidden>
          자격증
        </option>
        {certificateData?.map((certificate) => {
          return (
            <option key={certificate.certificate_id} value={certificate.certificate_id}>
              {certificate.name}
            </option>
          );
        })}
      </Select>

      <Divider />

      <Select name='subject_id' value={select.subject_id} onChange={selectChangeHandler}>
        <option value='' disabled hidden>
          과목
        </option>
        {subjectData?.map((subject) => {
          return (
            <option key={subject.subject_id} value={subject.subject_id}>
              {subject.name}
            </option>
          );
        })}
      </Select>

      <CustomBtn
        width='116px'
        height='74px'
        _borderradius='0 10px 10px 0'
        bc='#282897'
        onClick={() => searchHandler(select.subject_id)}>
        <img src={SearchIcon} alt='' />
      </CustomBtn>
    </SelectBox>
  );
}

const SelectBox = styled.div`
  width: 788px;
  height: 72px;
  padding-left: 20px;
  border: 1px solid #454545;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  border-radius: 10px;

  gap: 30px;
`;

const Select = styled.select`
  padding-right: 35px;
  border: none;
  width: 170px;
  height: 72px;
  background-color: transparent;

  font-size: 20px;
  font-weight: 400;

  text-overflow: ellipsis;
  text-align: center;
  background: url(${SearchDown}) no-repeat 95% 50%;
  border-radius: 0px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  select::-ms-expand {
    display: none;
  }
`;
const Divider = styled.div`
  height: 40px;
  border-left: 1px solid #000000;
  opacity: 0.8;
`;
export default Search;
