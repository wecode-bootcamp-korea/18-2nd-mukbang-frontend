import React, { useState, useEffect } from 'react';
import Rodeview from './Roadview';
import Toggle from './Toggle';
import StoreInfo from './StoreInfo';
import Map from './Map';
import Menu from './Menu';
import Preview from './Preview';
import { BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';

const StoreDetail = () => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch('/data/storeDetail.json')
  //     .then(res => res.json())
  //     .then(data => setData(data));
  // }, []);

  return (
    <Detail>
      <Compo>
        <button>{BiArrowBack()}</button>
        {false ? '위치보기' : '강남구 논현동'}
      </Compo>
      {false ? (
        <Rodeview />
      ) : (
        <>
          <Preview />
          <Info>
            <Toggle title="가게 정보" />
            <StoreInfo />
          </Info>
          <Info>
            <Toggle title="메뉴" />
            <Content>
              <Menu />
            </Content>
          </Info>
          <Info>
            <Toggle title="위치" />
            <Content>
              강남구 논현동
              <Map />
            </Content>
          </Info>
          <Info>
            <Toggle title="인근 전철역" />
            <Content>사당역, 잠실역, 선릉역</Content>
          </Info>
          <Info>
            <Toggle title="리뷰" />
            <Content>아메리카노가 맛있는 집입니다.</Content>
          </Info>
        </>
      )}
    </Detail>
  );
};

export default StoreDetail;

const Info = styled.div`
  padding: 18px;
  margin-top: 10px;
  background-color: white;
`;

const Content = styled.div`
  border-top: 1px solid rgb(238, 238, 238);
  padding: 18px 0px;
  color: #757575;
`;

const Compo = styled.div`
  padding: 18px;
  background-color: white;
  display: flex;
  height: 50px;
  position: relative;
  button {
    display: absoulte;
    font-size: 15px;
  }
`;

const Detail = styled.div`
  background-color: rgb(238, 238, 238);
  position: absolute;
  right: 0;
  width: 400px;
  height: 100%;
  border-left: 1px solid #333;
`;
