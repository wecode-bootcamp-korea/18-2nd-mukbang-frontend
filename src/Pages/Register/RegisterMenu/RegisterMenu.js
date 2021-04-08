import React from 'react';
import styled from 'styled-components';
import {
  RegisterMenuBox,
  RegistImageBox,
  ImageBoxList,
  ImageNumber,
  ImageTitle,
  FormInput,
  MenuDetailBox,
  MenuDetailList,
  MenuDetailSpan,
  FormButton,
} from '../StyleData/StyleData';

const RegisterMenu = ({
  storeInput,
  handleStoreInput,
  handleMenuList,
  menuImageList,
  removeMenuList,
}) => {
  const imageListCheck = menuImageList.filter(Boolean).length;
  return (
    <>
      <RegisterMenuBox>
        <ImageBoxList className="menu plr20">
          <ImageTitle>메뉴 이미지</ImageTitle>
          <FormInput
            name="menuImage"
            className="text w100"
            type="text"
            value={storeInput.menuImage}
            onChange={handleStoreInput}
          />
        </ImageBoxList>
        <MenuDetailBox>
          {inputList.map((input, index) => (
            <MenuDetailList key={index}>
              <MenuDetailSpan className="mr5">{input.title}:</MenuDetailSpan>
              <FormInput
                name={input.name}
                className="text w50"
                type="text"
                placeholder="내용을 작성해주세요"
                value={storeInput[input.name]}
                onChange={handleStoreInput}
              />
              <MenuDetailSpan className="ml5">({input.sub})</MenuDetailSpan>
            </MenuDetailList>
          ))}
        </MenuDetailBox>
        <FormButton className="menuBtn" onClick={handleMenuList}>
          등록하기
        </FormButton>
      </RegisterMenuBox>
      <RegistImageBox className="menu">
        {imageListCheck !== 0 &&
          menuImageList.map((list, index) => (
            <ImageBoxList
              key={index}
              onClick={() => {
                removeMenuList(index);
              }}
            >
              <ImageNumber>{index + 1}</ImageNumber>
              <PreviewImage src={list.image_url} alt="미리보기" />
            </ImageBoxList>
          ))}
      </RegistImageBox>
    </>
  );
};

const inputList = [
  { title: '이름', name: 'menuName', sub: '메뉴명' },
  { title: '가격', name: 'price', sub: '단위:원' },
];

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default RegisterMenu;
