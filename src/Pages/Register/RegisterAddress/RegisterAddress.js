import React from 'react';
import {
  FormTable,
  FormTableRow,
  FormTalbeBodyTitle,
  FormTableBodyWrite,
  FormInput,
  FormButton,
  FormSpan,
} from '../StyleData/StyleData';

const RegisterAddress = ({
  address,
  storeInput,
  handleDaumPost,
  handleStoreInput,
  handleSubwayList,
}) => {
  return (
    <FormTable>
      <FormTableRow>
        <FormTalbeBodyTitle>주소</FormTalbeBodyTitle>
        <FormTableBodyWrite>
          <FormInput
            className="text address"
            type="text"
            value={address.length !== 0 ? address : null}
            disabled
            placeholder="우편번호 찾기를 통해 등록해주세요."
          />
          <FormButton className="normal ml5" onClick={handleDaumPost}>
            우편번호 찾기
          </FormButton>
        </FormTableBodyWrite>
      </FormTableRow>
      <FormTableRow>
        <FormTalbeBodyTitle>주변역</FormTalbeBodyTitle>
        <FormTableBodyWrite>
          <FormInput
            className="text subway"
            name="station"
            type="text"
            value={storeInput.station}
            onChange={handleStoreInput}
          />
          <FormSpan className="mlr5">(역)</FormSpan>
          <FormInput
            className="text subway"
            name="line"
            type="text"
            value={storeInput.line}
            onChange={handleStoreInput}
          />
          <FormSpan className="mlr5">(호선)</FormSpan>
          <FormButton className="normal" onClick={handleSubwayList}>
            등록하기
          </FormButton>
        </FormTableBodyWrite>
      </FormTableRow>
    </FormTable>
  );
};

export default RegisterAddress;
