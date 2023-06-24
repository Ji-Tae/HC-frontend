import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CustomText from '../common/CustomText';
import { useQuery } from 'react-query';
import { majorGet, matchingCertGet } from '../../api/certificate';
import { useNavigate } from 'react-router-dom';

function CertCategory() {
  const navigate = useNavigate();

  //전공 카테고리 상태관리
  const [selectedMajorId, setSelectedMajorId] = useState('');

  //전공 가져오기
  const { data: majorData } = useQuery('major', majorGet);

  //전공에 따른 자격증 가져오기
  const { data: certificateData, isLoading } = useQuery(
    ['matchingCertGet', selectedMajorId],
    () => matchingCertGet(selectedMajorId),
    {
      enabled: selectedMajorId !== '',
      //5분 동안 캐싱처리
      cacheTime: 300 * 1000,
    },
  );

  //전공 카테고리 클릭 핸들러
  const onClickHandler = (majorId) => {
    setSelectedMajorId(majorId);
  };
  //자격증 클릭 핸들러
  const certClickHandler = (certificateId) => {
    navigate(`/test-list/${certificateId}`);
  };

  //최초 렌더링 시에 전공 제일 앞 카테고리를 스테이트로 지정
  useEffect(() => {
    if (majorData?.length > 0) {
      setSelectedMajorId(majorData[0].major_id);
    }
  }, [majorData]);

  return (
    <CatContainer>
      <MajorCat>
        {majorData?.map((major) => (
          <MajorCatItemBox key={major.major_id} isclick={selectedMajorId === major.major_id ? 'true' : 'false'}>
            <CustomText
              value={major.major_id}
              fontSize='1.55rem'
              fontweight='500'
              onClick={() => onClickHandler(major.major_id)}>
              {major.name}
            </CustomText>
          </MajorCatItemBox>
        ))}
      </MajorCat>
      <CertCat>
        <CertCatWrapper>
          {isLoading ? (
            <div>자격증을 불러오는 중 입니다.</div>
          ) : (
            certificateData?.map((cert) => (
              <CustomText
                key={cert.certificate_id}
                fontSize='1.5rem'
                fontweight='500'
                color='#898989'
                cursor='pointer'
                onClick={() => certClickHandler(cert.certificate_id)}>
                {cert.name}
              </CustomText>
            ))
          )}
        </CertCatWrapper>
      </CertCat>
    </CatContainer>
  );
}

const CatContainer = styled.div`
  height: 309px;
  background: #f8faff;
  margin-bottom: 142px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const MajorCat = styled.div`
  height: 60px;
  padding: 0px 50px;
  border-radius: 10px;
  background: #d2e6ff;
  display: flex;
  flex-wrap: wrap;

  > * {
    flex: 0 0 25%;
  }
  text-align: center;
`;

const CertCat = styled.div`
  height: 249px;
  padding-top: 40px;
`;

const CertCatWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;

  > * {
    flex: 0 0 25%;
    cursor: pointer;
    color: #898989;
    font-size: 1.5rem;
    font-weight: 500;
    height: 50px;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #282897;
    }
  }
`;

const MajorCatItemBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 50px;
  box-sizing: border-box;
  color: ${({ isclick }) => (isclick === 'true' ? '#282897' : '#898989')};
  position: relative;

  > * {
    font-size: ${({ isclick }) => (isclick === 'true' ? '1.55rem' : '1.4rem')};
    font-weight: ${({ isclick }) => (isclick === 'true' ? '700' : '500')};
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ isclick }) => (isclick === 'true' ? '100%' : '0')};
    height: 3px;
    background-color: #282897;
    transition: width 0.3s ease-in-out;
  }
`;

export default CertCategory;
