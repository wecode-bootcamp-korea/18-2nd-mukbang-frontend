import React, { useEffect, useState } from 'react';
import StoreList from './Components/StoreList/StoreList';
import StoreDetail from './Components/StoreDetail/StoreDetail';
import { useHistory, withRouter } from 'react-router-dom';
import FoodMap from './Components/FoodMap/FoodMap';
import styled from 'styled-components';

const Main = props => {
  const history = useHistory();
  const PATH = history.location.pathname;
  const [storeData, setStoreData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selecCategory, setSelectCategory] = useState({
    first: Array(6).fill(false),
    second: Array(7).fill(false),
  });
  const [viewPointData, setViewPointData] = useState({
    lat: 30,
    lng: 120,
    zoomLevel: 4,
  });
  const getPriceRange = (e, range) => {
    setPriceRange(range);
  };

  const getCategoryCheck = category => {
    setSelectCategory({
      ...selecCategory,
      first: category.first,
      second: category.second,
    });
  };

  useEffect(() => {
    const deviceWidth = window.innerWidth;
    const deviceHeight = window.innerHeight - 130;
    const totalCateogory = [...selecCategory.first, ...selecCategory.second];
    const convertToText = totalCateogory
      .map((select, index) => (select ? storeCategory[index] : false))
      .filter(Boolean);

    if (selecCategory.first[0] && !selecCategory.second[0]) {
      convertToText.shift();
      convertToText.unshift(...storeCategory.slice(1, 6));
    } else if (convertToText.filter(e => e === '전체').length === 2)
      convertToText.length = 0;
    else if (selecCategory.second[0]) {
      convertToText.pop();
      convertToText.push(...storeCategory.slice(7, storeCategory.length));
    }

    const dataList = {
      lat: viewPointData.lat,
      lng: viewPointData.lng,
      scale_level: viewPointData.zoomLevel,
      pixel_height: deviceHeight,
      pixel_width: deviceWidth,
    };
    // 좌표, 줌레벨, 뷰포트 값
    const query = Object.entries(dataList)
      .map((item, index) => {
        const querylist = `${item[0]}=${item[1]}`;
        return index === 0 ? `?${querylist}` : `&${querylist}`;
      })
      .join('');
    // 카테고리 값
    const query2 = convertToText
      ?.map(category => `&category=${category}`)
      .join('');
    // 가격 범위 값
    const query3 = priceRange.map(price => `&price_range=${price}`).join('');
    const totalQuery = `${query}${query2}${query3}`;

    fetch(`http://1945f0d40f18.ngrok.io/store${totalQuery}`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        const check = JSON.stringify(res.results) !== JSON.stringify(storeData);
        check && setStoreData(res.results);
      });
  }, [priceRange, selecCategory, viewPointData]);

  useEffect(() => {
    const stringToQuery = query => {
      const [_, params] = query.split('?'); // 물음표 분리
      return params.split('&').reduce((acc, cur) => {
        // 프로퍼티 분리
        const [k, v] = cur.split('='); // key, value 분리
        return { ...acc, [k]: v };
      }, {});
    };
    const queryObj = stringToQuery(props.location.search);
    props.location.search !== '' &&
      setViewPointData({
        lat: queryObj.lat,
        lng: queryObj.lng,
        zoomLevel: 2,
      });
    console.log(1);
  }, [props.location.search]);

  const count = storeData.length;
  return (
    <MainSection>
      <FoodMap
        storeData={storeData}
        getPriceRange={getPriceRange}
        getCategoryCheck={getCategoryCheck}
        viewPointData={viewPointData}
        setViewPointData={setViewPointData}
      />
      {PATH === '/main' ? <StoreList count={count} /> : <StoreDetail />}
    </MainSection>
  );
};
const storeCategory = [
  '전체',
  '베이커리',
  '카페',
  '패스트푸드',
  '분식',
  '치킨',
  '전체',
  '한식',
  '일식',
  '중식',
  '퓨전',
  '양식/레스토랑',
  '기타주점',
];

const MainSection = styled.main`
  position: relative;
  height: calc(100vh - 130px);
  margin-top: 130px;
`;

export default withRouter(Main);
