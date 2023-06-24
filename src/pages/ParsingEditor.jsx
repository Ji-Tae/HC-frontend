import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { majorGet, certificateGet, subjectGet } from '../api/certificate';

const ParsingEditor = () => {
  const [input, setInput] = useState('');
  const [questions, setQuestions] = useState([]);
  const [select1, setSelect1] = useState('');
  const [select2, setSelect2] = useState('');
  const [select3, setSelect3] = useState('');
  const [majors, setMajors] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchMajors = async () => {
      const response = await majorGet();
      setMajors(response);
    };

    const fetchCertificates = async () => {
      const response = await certificateGet();
      setCertificates(response);
    };

    const fetchSubjects = async () => {
      const response = await subjectGet();
      setSubjects(response);
    };

    fetchMajors();
    fetchCertificates();
    fetchSubjects();
  }, []);

  const handleMajorChange = (e) => {
    setSelect1(e.target.value);
  };

  const handleCertificateChange = (e) => {
    setSelect2(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelect3(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionsData = {
      major_id: select1,
      certificate_id: select2,
      subject_id: select3,
      contents: questions,
    };
    console.log(questionsData);

    try {
      const res = await axios.post('/api/submit', questionsData);
      // 서버로부터의 응답 처리
      console.log(res?.data);
    } catch (error) {
      console.log(error?.res);
    }

    setInput('');
  };

  useEffect(() => {
    console.log(questions); // questions 상태의 변화를 추적
  }, [questions]);

  const handleInputChange = (e) => {
    const newInput = e.target.value;
    console.log('New input: ', newInput);
    setInput(newInput);

    const lines = newInput.split('\n');
    const newQuestions = [];
    let question = null;
    let isExplanation = false;
    let isExample = false;
    let choices = [];
    let examples = [];

    lines.forEach((line) => {
      const numberMatch = line.match(/^\s*(\d+)\./); // 문제 번호를 찾는 정규 표현식
      const choiceMatch = line.match(/^\s*(①|②|③|④)/); // 선택지를 찾는 정규 표현식
      const answerMatch = line.match(/^--정답\s*(\d+)/); // 정답 정보를 찾는 정규 표현식
      const explanationStartMatch = line.match(/^<문제 해설>/); // 해설 시작을 찾는 정규 표현식
      const explanationEndMatch = line.match(/\s*\[해설작성자\s*:\s*.+\]\s*$/); // 해설 끝을 찾는 정규 표현식
      const exampleMatch = line.match(/--보기/); // 보기 시작을 찾는 정규 표현식
      const numberTextSplitRegex = /^(\d+)\.(.*)/;

      if (line.trim() === '--보기') {
        isExample = true;
        return;
      }

      if (explanationEndMatch) {
        isExplanation = false;
        if (question) {
          question.explanation += line + '\n';
        }
      } else if (isExplanation) {
        if (question) {
          question.explanation += line + '\n';
        }
      }

      if (numberMatch) {
        if (question) {
          question.examples = examples.join('\n'); // 보기를 문제 객체에 추가
          question.choices = choices.join('\n'); // 선택지를 문제 객체에 추가
          questions.push(question);
        }
        // 문제 번호와 본문 분리
        const numberTextSplitMatch = numberTextSplitRegex.exec(line);
        const number = numberTextSplitMatch ? numberTextSplitMatch[1] : '';
        const text = numberTextSplitMatch ? numberTextSplitMatch[2] : '';

        question = {
          number: number,
          text: text + '\n', // 문제 번호 다음에 나오는 텍스트를 문제 텍스트로 추가
          choices: [],
          answer: null,
          explanation: '',
          examples: [],
        };

        choices = [];
        examples = [];
      } else if (exampleMatch) {
        // 보기를 시작하기 전까지의 모든 텍스트를 문제 텍스트로 처리
        if (question && !isExample && !isExplanation) {
          question.text += line + '\n';
          examples.push(exampleMatch[1]); // 보기를 배열에 추가
        }
        isExample = true; // 보기가 시작되었음을 표시
        examples.push(line); // 보기를 배열에 추가
      } else if (choiceMatch) {
        choices.push(line); // 선택지를 배열에 추가
      } else if (answerMatch) {
        if (question) {
          question.answer = answerMatch[1];
        }
      } else if (explanationStartMatch) {
        isExplanation = true;
        question.explanation = line + '\n';
      } else if (explanationEndMatch) {
        isExplanation = false;
      } else if (isExample) {
        if (line !== '--보기') {
          examples.push(line); // 보기를 배열에 추가
        }
      } else if (!isExample && !isExplanation) {
        // 보기나 해설이 시작되기 전까지의 모든 텍스트를 문제 텍스트로 처리
        if (question) {
          question.text += line + '\n';
        }
      }
    });

    if (question) {
      question.examples = examples.join('\n'); // 마지막 문제의 보기를 문제 객체에 추가
      question.choices = choices.join('\n'); // 마지막 문제의 선택지를 문제 객체에 추가
      newQuestions.push(question);
    }
    console.log('New questions: ', newQuestions); // 생성된 새로운 질문 목록 출력
    setQuestions(newQuestions);
  };

  return (
    <div>
      <h2 style={subHeaderStyle}>문제 관리</h2>
      <form onSubmit={handleSubmit}>
        <Select1 value={select1} onChange={handleMajorChange}>
          {majors?.map((major) => (
            <option key={major.id} value={major.id}>
              {major.name}
            </option>
          ))}
        </Select1>
        <Select2 value={select2} onChange={handleCertificateChange}>
          {certificates?.map((certificate) => (
            <option key={certificate.id} value={certificate.id}>
              {certificate.name}
            </option>
          ))}
        </Select2>
        <Select3 value={select3} onChange={handleSubjectChange}>
          {subjects?.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </Select3>
        <TextAreaInput value={input} onChange={handleInputChange} />
        <ExtraBox>
          <TempSaveButton>임시저장</TempSaveButton>
          <RegisterButton>문제등록</RegisterButton>
        </ExtraBox>
      </form>
      <TextAreaOutput
        readOnly
        value={
          questions.length
            ? questions
                .map((question) => {
                  const { number, text, choices, answer, explanation, examples } = question;
                  return `번호:${number}\n문제:${text}보기:\n${examples}선택지:\n${choices}\n${explanation}정답:${answer}`;
                })
                .join('\n\n')
            : ''
        }
      />
    </div>
  );
};

const subHeaderStyle = {
  position: 'absolute',
  width: '95px',
  height: '38px',
  left: '72px',
  top: '135px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '25px',
  lineHeight: '38px',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '-0.03em',
  color: '#000000',
  whiteSpace: 'nowrap',
};

const Select1 = styled.select`
  position: absolute;
  width: 284px;
  height: 50px;
  left: 72px;
  top: 209px;
  background: #d3dce7;
  border-radius: 10px;
`;

const Select2 = styled(Select1)`
  left: 368px;
`;

const Select3 = styled(Select1)`
  left: 664px;
`;

const TextAreaInput = styled.textarea`
  position: absolute;
  width: 876px;
  height: 734px;
  left: 72px;
  top: 269px;
  background: #d3dce7;
  border-radius: 10px;
  resize: none;
`;

const ExtraBox = styled.div`
  position: absolute;
  width: 874px;
  height: 72px;
  left: 73px;
  top: 935px;
  background: #bbc3cd;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; // 버튼 간의 간격
`;

const TextAreaOutput = styled.textarea`
  position: absolute;
  width: 876px;
  height: 796px;
  left: 972px;
  top: 207px;
  background: #d3dce7;
  border-radius: 10px;
  resize: none;
`;

const TempSaveButton = styled.button`
  box-sizing: border-box;
  width: 160px;
  height: 50px;
  border: 2px solid #282897;
  border-radius: 10px;
  background: transparent; // ExtraBox의 배경색이 보이도록 설정
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.03em;
  color: #282897;
`;

const RegisterButton = styled.button`
  width: 160px;
  height: 50px;
  background: #282897;
  border-radius: 10px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.03em;
  color: #d3dce7;
`;

export default ParsingEditor;
