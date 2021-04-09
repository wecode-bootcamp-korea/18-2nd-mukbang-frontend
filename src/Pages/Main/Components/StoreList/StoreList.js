import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, withRouter } from 'react-router-dom';
import Loading from '../../../../Components/Loading';
import { URL } from '../../../../config';

const StoreList = ({ reset, setReset, count, sendQuery, viewPointData }) => {
  const [data, setData] = useState({ storeCount: 0, stores: [] });
  const [offset, setOffset] = useState(0);
  const [review, setReview] = useState(false);
  const [rating, setRating] = useState(false);
  const LIMIT = 4;

  const review_count = `review_category=review_count`;
  const rating_average = `review_category=rating_average`;
  const query = `${URL}/store${sendQuery}&limit=${LIMIT}&offset=${offset}`;

  const fetchData = (url, reset) => {
    fetch(url)
      .then(res => res.json())
      .then(storeData => {
        const nextData = reset
          ? { stores: storeData.results }
          : {
              stores: [...data.stores, ...storeData.results],
            };
        reset && setOffset(0);
        setData(nextData);
      });
  };

  useEffect(() => {
    sendQuery !== '' && fetchData(query, reset);
  }, [offset, reset, sendQuery, viewPointData]);

  const reviewClick = e => {
    if (e.target.innerText === '평점순') {
      setRating(!rating);
    }
    if (e.target.innerText === '리뷰순') {
      setReview(!review);
    }
  };

  useEffect(() => {
    fetchData(
      `${query}&${review_count}&${review ? 'reverse=1' : 'reverse=0'}`,
      reset
    );
  }, [review, reset, sendQuery]);

  useEffect(() => {
    fetchData(
      `${query}&${rating_average}&${rating ? 'reverse=1' : 'reverse=0'}`,
      reset
    );
  }, [rating, reset, sendQuery]);

  const onScroll = e => {
    /// scrollHeight(전체 스크롤의 높이) , clientHeight(target의 높이 / storeLists 의 높이) , scrollTop(storeLists의 스크롤을 움직일때마다의 높이)//
    let TotalHeight = e.target.scrollHeight;
    let ScrollValue = e.target.scrollTop;
    let StoreListsScrollHeight = e.target.clientHeight;

    if (ScrollValue + StoreListsScrollHeight > TotalHeight - 1) {
      setOffset(offset + 1);
      setReset(false);
    }
  };

  let history = useHistory();

  const goToStoreDetail = id => {
    history.push(`/main/items/${id}`);
  };
  return (
    <Store>
      {data.stores.length === 0 && offset === 0 ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </Store>
  );
};

export default withRouter(StoreList);

const Store = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 400px;
  height: calc(100vh - 130px);
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
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: scroll;
`;

const StoreBox = styled.div`
  display: flex;
  padding: 10px 18px;
  cursor: pointer;
  &:hover {
    background: #f6f6f6;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    img {
      padding: 0;
    }
  }
`;

const ImgBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  img {
    width: 140px;
    height: 80px;
    margin: 0 5px;
    border-radius: 5px;
    object-fit: cover;
    padding: 5px;
    transition: all 0.2s;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }
`;

const InfoBox = styled.div``;
const Category = styled.div`
  font-size: 9px;
  margin-top: 10px;
`;
const StoreName = styled.div`
  font-size: 16px;
  line-height: 25px;
`;
const BottomContent = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 200px;
  font-size: 12px;
  line-height: 18px;
`;
