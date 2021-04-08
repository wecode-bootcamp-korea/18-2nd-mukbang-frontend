import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, withRouter } from 'react-router-dom';

const StoreList = () => {
  const [data, setData] = useState({ storeCount: 0, stores: [] });
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`/data/data${page}.json`)
      .then(res => res.json())
      .then(result => {
        const nextData = {
          storeCount: result.storeCount,
          stores: [...data.stores, ...result.stores],
        };
        setData(nextData);
      });
  }, [page]);

  const onScroll = e => {
    /// scrollHeight(전체 스크롤의 높이) , clientHeight(target의 높이 / storeLists 의 높이) , scrollTop(storeLists의 스크롤을 움직일때마다의 높이)//
    let TotalHeight = e.target.scrollHeight;
    let ScrollValue = e.target.scrollTop;
    let StoreListsScrollHeight = e.target.clientHeight;

    if (ScrollValue + StoreListsScrollHeight > TotalHeight - 1) {
      setPage(page + 1);
    }
  };

  let history = useHistory();
  const goToStoreDetail = id => {
    history.push(`/main/items/${id}`);
  };

  return (
    <Store>
      <Header>
        <HeaderInfo> 가게 목록 {data.storeCount}개</HeaderInfo>
      </Header>
      <StoreLists onScroll={onScroll}>
        <Sorting>
          <Grade>평점순</Grade>
          <Review>리뷰순</Review>
        </Sorting>
        {data.stores.map(store => (
          <StoreBox
            key={store.id}
            onClick={() => {
              goToStoreDetail(store.id);
            }}
          >
            <ImgBox>
              <img src={store.img} alt="가게 대표 사진" />
            </ImgBox>
            <InfoBox>
              <Category>{store.category}</Category>
              <StoreName>{store.storename}</StoreName>
              <BottomContent>
                평점 - {store.grade}/{store.totalgrade}, 리뷰 {store.review}건
              </BottomContent>
              <BottomContent>{store.address}</BottomContent>
              <BottomContent>{store.content}</BottomContent>
            </InfoBox>
          </StoreBox>
        ))}
      </StoreLists>
    </Store>
  );
};

export default withRouter(StoreList);

const Store = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  border-left: 1px solid #333;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #333;
`;

const HeaderInfo = styled.div`
  width: 100%;
  padding: 0px 18px;
  font-size: 18px;
`;

const Sorting = styled.div`
  display: flex;
  padding: 10px 18px;
`;

const Review = styled.div`
  font-size: 15px;
  cursor: pointer;
`;

const Grade = styled(Review)`
  margin-right: 15px;
`;

const StoreLists = styled.section`
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
`;

const StoreBox = styled.div`
  display: flex;
  padding: 10px 18px;
  cursor: pointer;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const ImgBox = styled.div`
  width: 145px;
  height: 112px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoBox = styled.div``;
const Category = styled.div`
  font-size: 9px;
  margin-top: 10px;
`;
const StoreName = styled.div`
  font-size: 18px;
  line-height: 30px;
`;
const BottomContent = styled.div`
  font-size: 14px;
  line-height: 18px;
`;
