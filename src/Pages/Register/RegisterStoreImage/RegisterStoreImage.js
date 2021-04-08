import React from 'react';
import {
  RegistImageBox,
  ImageBoxList,
  FormInput,
  ImageNumber,
  ImageTitle,
  FormButton,
} from '../StyleData/StyleData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const RegisterStoreImage = ({
  storeInput,
  imageList,
  handleImageList,
  handleStoreInput,
}) => {
  return (
    <RegistImageBox>
      {Array(4)
        .fill(null)
        .map((e, index) => {
          const sortType = [
            { title: '가게 이미지', name: `store${index}` },
            { title: '전체 메뉴 이미지', name: 'allMenu' },
          ];
          const TitleName = index !== 3 ? sortType[0] : sortType[1];
          const checkValidation = imageList[index];
          const value = storeInput[TitleName.name];
          return (
            <ImageBoxList>
              <ImageNumber>{index + 1}</ImageNumber>
              <ImageTitle>{TitleName.title}</ImageTitle>
              <FormInput
                className="text w100"
                type="text"
                name={TitleName.name}
                value={value}
                onChange={handleStoreInput}
              />
              <FormButton
                className="imageBtn"
                checkValidation={checkValidation}
                onClick={e => {
                  handleImageList(e, TitleName.name, index);
                }}
              >
                <FontAwesomeIcon icon={faCheck} />
              </FormButton>
            </ImageBoxList>
          );
        })}
    </RegistImageBox>
  );
};

export default RegisterStoreImage;
