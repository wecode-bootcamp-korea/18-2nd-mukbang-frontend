import React, { useState } from 'react';
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
  // const useEffect() => {
  //   fetch('/data/storeDetail.json')
  //     .then(res => res.json())
  //     .then(data => useState(data));
  // }, [];

  const [isActive, setActive] = useState(false);
  // const [title, setTitle] = useState('');
  const activeToggle = e => {
    setActive(!isActive);
    console.log(e);
    // setTitle(title=e.target)
  };
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
            <Toggle
              isActive={isActive}
              activeToggle={activeToggle}
              title="가게 정보"
            />
            {isActive && console.log() /*<StoreInfo />*/}
          </Info>
          <Info>
            <Toggle
              isActive={isActive}
              activeToggle={activeToggle}
              title="메뉴"
            />
            {isActive && (
              <Content>
                <Menu />
              </Content>
            )}
          </Info>
          <Info>
            <Toggle
              isActive={isActive}
              activeToggle={activeToggle}
              title="위치"
            />
            {isActive && (
              <Content>
                강남구 논현동
                <Map />
              </Content>
            )}
          </Info>
          <Info>
            <Toggle
              isActive={isActive}
              activeToggle={activeToggle}
              title="인근 전철역"
            />
            {isActive && <Content>사당역, 잠실역, 선릉역</Content>}
          </Info>
          <Info>
            <Toggle
              isActive={isActive}
              activeToggle={activeToggle}
              title="리뷰"
            />
            {isActive && <Content>아메리카노가 맛있는 집입니다.</Content>}
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

const TITLE = [
  { 1: '가게 정보' },
  { 2: '위치' },
  { 3: '메뉴' },
  { 4: '인근 전철역' },
  { 5: '리뷰' },
];
