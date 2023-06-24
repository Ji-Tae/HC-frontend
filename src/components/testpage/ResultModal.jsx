import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../../axios/api";
import Cookies from "js-cookie";

const ResultModal = ({ children, open, onClose, onCheckNote, id }) => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!open) {
      return;
    }

    const fetchData = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        const response = await api.get(`/api/exam/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
        console.log(id);
        const { major_name, certificate_name, subject_name } =
          response.data.data[0];
        setSubject(`${major_name} - ${certificate_name} - ${subject_name}`);
        const responseAnswer = await api.get(`/api/getAnswerWithExamId/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
    
          const data = responseAnswer.data.data;
          const total = data.length;
          const correct = data.filter(item => item.marking).length;

          console.log(data);
    
          setTotal(total);
          setCorrect(correct);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [id, open]); // 'id'와 'open'을 의존성 배열에 추가

  const handleCheckNote = () => {
    // 부모 컴포넌트에게 알림
    onCheckNote();

    // 모달 닫기
    onClose();
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <h2>{subject}</h2>
        <p>
          점수: {correct}/{total}
        </p>
        {children}
        <button onClick={onClose}>나가기</button>
        <button onClick={handleCheckNote}>오답노트 확인하기</button>
      </ModalContainer>
    </ModalOverlay>,
    document.getElementById("portal")
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  box-sizing: border-box;
`;

export default ResultModal;