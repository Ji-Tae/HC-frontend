import React, { useState } from 'react';
import { styled } from 'styled-components';
import CustomBtn from '../components/common/CustomBtn';
import CustomText from '../components/common/CustomText';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/adminpage/fileUpload/Modal';
import { createPortal } from 'react-dom';

function AdminPage() {
  const navigate = useNavigate();

  //모달 스테이트
  const [modal, setModal] = useState(false);

  //클릭 시 파싱에디터로 보내기
  const goParsingEditor = () => {
    navigate('/parsingeditor');
  };

  //클릭 시 모달창 오픈
  const openModalHandler = () => {
    setModal(true);
  };

  // portal사용
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  document.body.appendChild(modalRoot);

  return (
    <AdminLayout>
      <CustomBtn width='500px' height='200px' _borderradius='10px' bc='#282897' onClick={goParsingEditor}>
        <CustomText fontSize='2.5rem' fontWeight='700' color='#fff'>
          에디터로 등록
        </CustomText>
      </CustomBtn>
      <CustomBtn width='500px' height='200px' _borderradius='10px' bc='#282897' onClick={openModalHandler}>
        <CustomText fontSize='2.5rem' fontWeight='700' color='#fff'>
          파일로 등록
        </CustomText>
      </CustomBtn>
      {modal ? createPortal(<Modal setModal={setModal} />, modalRoot) : null}
    </AdminLayout>
  );
}

const AdminLayout = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 50px;
`;
export default AdminPage;
