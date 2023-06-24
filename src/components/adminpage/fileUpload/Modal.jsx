import { useMutation, useQuery } from 'react-query';
import { getExamIdPost, questionFilePost } from '../../../api/posts';
import { useEffect, useState } from 'react';
import CustomBtn from '../../common/CustomBtn';
import CustomText from '../../common/CustomText';
import { styled } from 'styled-components';
import { majorGet, matchingCertGet, matchingSubGet } from '../../../api/certificate';
import { createPortal } from 'react-dom';

const Modal = ({ setModal }) => {
  // select 상태 관리
  const [select, setSelect] = useState({
    major_id: '',
    certificate_id: '',
    subject_id: '',
    year: '',
    round: '',
    exam_id: '',
  });

  //문제 파일 상태 관리
  const [files, setFiles] = useState(null);

  // 전공 불러오기
  const { data: majorData } = useQuery('major', majorGet, {
    //5분 동안 캐싱처리
    cacheTime: 300 * 1000,
  });

  // 자격증 불러오기
  const { data: certificateData } = useQuery(
    ['certificate', select.major_id], // 쿼리 키에 select.major_id를 추가하여 전공 선택 시마다 쿼리를 재실행
    () => matchingCertGet(select.major_id),
    {
      enabled: select.major_id !== '', // select.major_id 값이 비어있지 않을 때에만 쿼리를 실행
      //5분 동안 캐싱처리
      cacheTime: 300 * 1000,
    },
  );

  // 과목 불러오기
  const { data: subjectData } = useQuery(
    ['matchingSub', select.certificate_id], // 쿼리 키에 select.certificate_id를 추가하여 전공 선택 시마다 쿼리를 재실행
    () => matchingSubGet(select.certificate_id),
    {
      enabled: select.certificate_id !== '', // select.certificate_id 값이 비어있지 않을 때에만 쿼리를 실행
      //5분 동안 캐싱처리
      cacheTime: 300 * 1000,
    },
  );

  // select와 input 이벤트 핸들러
  const selectChangeHandler = (e) => {
    const { name, value } = e.target;
    setSelect((prevSelect) => ({
      ...prevSelect,
      [name]: value,
    }));
  };

  // 파일 이벤트 핸들러
  const ChangeFileHandler = (e) => {
    setFiles(e.target.files[0]);
  };
  //ExamId 불러오는 함수
  const getExamIdMutation = useMutation(getExamIdPost, {
    onSuccess: (data) => {
      if (data?.exam_id) {
        setSelect((prevSelect) => ({
          ...prevSelect,
          exam_id: data.exam_id,
        }));
      }
    },
  });

  //각 select와 input을 넣으면 바로 getExamIdPost함수 실행.
  useEffect(() => {
    if (
      select.major_id !== '' &&
      select.certificate_id !== '' &&
      select.subject_id !== '' &&
      select.year !== '' &&
      select.round !== '' &&
      select.exam_id === ''
    ) {
      const formData = new FormData();
      formData.append('major_id', parseInt(select.major_id));
      formData.append('certificate_id', parseInt(select.certificate_id));
      formData.append('subject_id', parseInt(select.subject_id));
      formData.append('year', parseInt(select.year));
      formData.append('round', parseInt(select.round));
      getExamIdMutation.mutate(formData);
    }
  }, [select]);

  // 시험 문제 등록을 위한 뮤테이션
  const parsingMutation = useMutation(questionFilePost, {
    onSuccess: (res) => {
      if (res.status === 200) {
        setModal(false);
      }
    },
  });

  // 문제를 등록 하기 위한 핸들러
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', files);
    formData.append('exam_id', parseInt(select.exam_id));

    parsingMutation.mutate(formData);
  };

  // 모당 창을 닫는 함수
  const closeModal = () => {
    setModal(false);
  };

  //외부 클릭 시 닫히는 함수
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <form onSubmit={onSubmitHandler}>
      <Background onClick={handleClickOutside}>
        <ModalLayout>
          <SelectBox name='major_id' value={select.major_id} onChange={selectChangeHandler}>
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
          </SelectBox>

          <SelectBox name='certificate_id' value={select.certificate_id} onChange={selectChangeHandler}>
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
          </SelectBox>

          <SelectBox name='subject_id' value={select.subject_id} onChange={selectChangeHandler}>
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
          </SelectBox>

          <div>
            <CustomText>년도: ex - 2022{''}</CustomText>
            <input type='number' name='year' value={select.year} onChange={selectChangeHandler} />
          </div>
          <div>
            <CustomText>회차: ex - 1{''}</CustomText>
            <input type='number' name='round' value={select.round} onChange={selectChangeHandler} />
          </div>

          <input type='file' onChange={ChangeFileHandler} />

          <div style={{ display: 'flex', gap: '10px' }}>
            <CustomBtn type='submit' width='100px' height='35px' _borderradius='10px' bc='#282897'>
              <CustomText fontSize='1rem' fontWeight='700' color='#fff'>
                등록
              </CustomText>
            </CustomBtn>
          </div>
        </ModalLayout>
      </Background>
    </form>,
    document.getElementById('modal-root'),
  );
};

const ModalLayout = styled.div`
  position: absolute;
  top: 30%;
  left: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 20px;

  width: 500px;
  height: 500px;
  background: #fff;
  border-radius: 10px;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const SelectBox = styled.select`
  width: 200px;
  height: 30px;
  text-align: center;
`;
export default Modal;
