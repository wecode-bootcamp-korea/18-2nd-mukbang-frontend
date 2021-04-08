import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, withRouter } from 'react-router-dom';

const StoreList = ({ count }) => {
  const [data, setData] = useState({ storeCount: 0, stores: [] });
  const [offset, setOffset] = useState(0);
  const [review, setReview] = useState(false);
  const [rating, setRating] = useState(false);
  const [reset] = useState(true);
  const LIMIT = 4;
  const test =
    '?lat=37.4918939171295&lng=127.032166561787&scale_level=4&pixel_height=565&pixel_width=1028&price_range=0&price_range=20000';
  // const parameter = props.totalQuery;
  const review_count = `review_category=review_count`;
  const rating_average = `review_category=rating_average`;
  const query = `http://10.58.2.56:8000/store${test}&limit=${LIMIT}&offset=${offset}`;
  const fetchData = (url, reset) => {
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(storeData => {
        console.log(storeData.results.length);
        console.log(reset);
        const nextData = reset
          ? { stores: [...storeData.results] }
          : {
              stores: [...data.stores, ...storeData.results],
            };
        setData(nextData);
      });
  };

  useEffect(() => {
    fetchData(query);
  }, [offset]);

  const reviewClick = e => {
    if (e.target.innerText === '평점순') {
      console.log(rating, review);
      setRating(!rating);
    }
    if (e.target.innerText === '리뷰순') {
      console.log(rating, review);
      setReview(!review);
    }
  };

  useEffect(() => {
    fetchData(
      `${query}&${review_count}&${review ? 'reverse=1' : 'reverse=0'}`,
      reset
    );
  }, [review, reset]);

  useEffect(() => {
    fetchData(
      `${query}&${rating_average}&${rating ? 'reverse=1' : 'reverse=0'}`,
      reset
    );
  }, [rating, reset]);

  // console.log(data.stores[0].full_address.substring(0, 5));
  const onScroll = e => {
    /// scrollHeight(전체 스크롤의 높이) , clientHeight(target의 높이 / storeLists 의 높이) , scrollTop(storeLists의 스크롤을 움직일때마다의 높이)//
    let TotalHeight = e.target.scrollHeight;
    let ScrollValue = e.target.scrollTop;
    let StoreListsScrollHeight = e.target.clientHeight;

    if (ScrollValue + StoreListsScrollHeight > TotalHeight - 1) {
      setOffset(offset + 1);
    }
  };

  // 가게 디테일 페이지 머지 후 테스트 예정

  let history = useHistory();

  const goToStoreDetail = id => {
    history.push(`/main/items/${id}`);
  };

  return (
    <Store>
      <Header>
        <HeaderInfo> 가게 목록 {count}개</HeaderInfo>
      </Header>
      <StoreLists onScroll={onScroll}>
        <Sorting>
          <Grade onClick={reviewClick}>평점순</Grade>
          <Review onClick={reviewClick}>리뷰순</Review>
        </Sorting>
        {data.stores.map(store => (
          <StoreBox
            onClick={() => {
              goToStoreDetail(store.store_id);
            }}
            key={store.store_id}
          >
            <ImgBox>
              <img src={store.store_images[0]} alt="가게 대표 사진" />
            </ImgBox>
            <InfoBox>
              <Category>{store.category}</Category>
              <StoreName>{store.store_name}</StoreName>
              <BottomContent>
                평점 - {store.rating_average}/5, 리뷰 {store.review_count}건
              </BottomContent>
              <BottomContent>
                {store.full_address.substring(0, 5)}
              </BottomContent>
              <BottomContent>{store.one_line_introduction}</BottomContent>
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
  background: #fff;
  z-index: 1;
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
