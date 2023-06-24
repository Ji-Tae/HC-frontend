import React from 'react';
import { styled } from 'styled-components';
import CustomText from '../components/common/CustomText';
import CustomBtn from '../components/common/CustomBtn';
import { useQuery, useQueryClient } from 'react-query';
import { certIdExamGet, examAllGet, subIdExamGet } from '../api/posts';
import { useNavigate, useParams } from 'react-router-dom';

function TestListPages() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { certificateId, subjectId } = useParams();

  //메인 페이지의 카테고리 클릭으로 들어오면 해당 자격증의 모든 문제를 모두 보여주는 함수
  const { data: certExams } = useQuery(['examcertget', certificateId], () => certIdExamGet(certificateId), {
    // 자격증 ID가 있을 경우에만 가져옴
    enabled: certificateId ? true : false,
    // 5분 동안 캐싱 처리
    cacheTime: 300 * 1000,
    // 데이터를 가져온 후 실행될 로직 추가
    onSuccess: () => {
      queryClient.removeQueries('examallget');
      queryClient.removeQueries(['examsubget', subjectId]);
    },
  });

  // 헤더의 기출문제 클릭으로 들어왔을 때 모든 문제를 보여주는 함수
  const { data: allExams } = useQuery('examallget', examAllGet, {
    enabled: certificateId === undefined && subjectId === undefined, // certificateId와 subjectId가 모두 undefined일 때만 실행
    cacheTime: 300 * 1000, // 5분 동안 캐싱 처리
    // 데이터를 가져온 후 실행될 로직 추가
    onSuccess: () => {
      queryClient.removeQueries(['examcertget', certificateId]);
      queryClient.removeQueries(['examsubget', subjectId]);
    },
  });

  // 메인페이지의 검색기능으로 들어오면 해당 과목 문제를 보여주는 함수
  const { data: subExams } = useQuery(['examsubget', subjectId], () => subIdExamGet(subjectId), {
    // 과목 ID가 있을 경우에만 가져옴
    enabled: subjectId ? true : false,
    // 5분 동안 캐싱 처리
    cacheTime: 300 * 1000,
    // 데이터를 가져온 후 실행될 로직 추가
    onSuccess: () => {
      queryClient.removeQueries(['examcertget', certificateId]);
      queryClient.removeQueries('examallget');
    },
  });

  const goTestPage = (examId) => {
    navigate(`/testpages/exam/${examId}`);
  };
  return (
    <TestListLayout>
      <ListContainer>
        <ListBox>
          <ListBoxHeader>
            <HeaderItem>
              <CustomText fontSize='1.25rem' fontWeight='700'>
                과목명
              </CustomText>
            </HeaderItem>

            <HeaderItem>
              <CustomText fontSize='1.25rem' fontWeight='700'>
                년도
              </CustomText>
            </HeaderItem>

            <HeaderItem>
              <CustomText fontSize='1.25rem' fontWeight='700'>
                회차
              </CustomText>
            </HeaderItem>

            <HeaderItem>
              <CustomText fontSize='1.25rem' fontWeight='700'>
                {/* 줄맞추기 위한 빈 태그 */}
              </CustomText>
            </HeaderItem>
          </ListBoxHeader>

          {certExams?.map((exam) => {
            return (
              <TestList key={exam.exam_id}>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.subject_name}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.year}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.round}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomBtn
                    width='90px'
                    height='31px'
                    bc='#282897'
                    _borderradius='5px'
                    onClick={() => goTestPage(exam.exam_id)}>
                    <CustomText fontSize='1rem' color='#fff'>
                      응시하기
                    </CustomText>
                  </CustomBtn>
                </ListItem>
              </TestList>
            );
          })}
          {allExams?.map((exam) => {
            return (
              <TestList key={exam.exam_id}>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.subject_name}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.year}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.round}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomBtn
                    width='90px'
                    height='31px'
                    bc='#282897'
                    _borderradius='5px'
                    onClick={() => goTestPage(exam.exam_id)}>
                    <CustomText fontSize='1rem' color='#fff'>
                      응시하기
                    </CustomText>
                  </CustomBtn>
                </ListItem>
              </TestList>
            );
          })}
          {subExams?.map((exam) => {
            return (
              <TestList key={exam.exam_id}>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.subject_name}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.year}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.round}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomBtn
                    width='90px'
                    height='31px'
                    bc='#282897'
                    _borderradius='5px'
                    onClick={() => goTestPage(exam.exam_id)}>
                    <CustomText fontSize='1rem' color='#fff'>
                      응시하기
                    </CustomText>
                  </CustomBtn>
                </ListItem>
              </TestList>
            );
          })}
        </ListBox>
      </ListContainer>
    </TestListLayout>
  );
}

const TestListLayout = styled.div`
  margin: 70px 153px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListBox = styled.div`
  width: 1200px;
  flex-direction: column;
`;

const ListBoxHeader = styled.div`
  width: 100%;
  background: #d2e6ff;
  height: 48px;
  padding: 0px 70px;
  display: flex;
  align-items: center;
`;

const HeaderItem = styled.div`
  flex-basis: 25%;
  text-align: center;
`;

const TestList = styled.div`
  width: 100%;
  height: 48px;
  padding: 0px 70px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const ListItem = styled.div`
  flex-basis: 25%;
`;

export default TestListPages;
