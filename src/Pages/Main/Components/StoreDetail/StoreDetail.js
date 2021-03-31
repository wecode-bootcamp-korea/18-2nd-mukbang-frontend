import React, { useState, useEffect } from 'react';
import Roadview from './Roadview';
import Info from './Info';
import Preview from './Preview';
import { BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';

const StoreDetail = props => {
  const [storeData, setData] = useState([]);
  useEffect(() => {
    // fetch(`http://fd0bc12171bf.ngrok.io/store/detail?store_id=53`)
    fetch('/data/storeDetail.json')
      .then(res => res.json())
      .then(res => setData([res.result]));
  }, []);

  const [isRoadviewOpen, setOpen] = useState(false);
  const openRoadview = () => {
    setOpen(!isRoadviewOpen);
  };

  const goToStoreList = () => {
    console.log('StoreList 페이지로 돌아가기');
  };

  return (
    <Detail>
      {storeData.map(data => (
        <React.Fragment key={data.store_id}>
          <Compo>
            <Button onClick={isRoadviewOpen ? openRoadview : goToStoreList}>
              {BiArrowBack()}
            </Button>
            {isRoadviewOpen
              ? '위치보기'
              : data.region_2depth_name + ' ' + data.region_3depth_name}
          </Compo>
          {isRoadviewOpen ? (
            <Roadview latitude={data.lat} longitude={data.lon} />
          ) : (
            <>
              <Preview
                introduction={data.one_line_introduction}
                rate={data.rating_average}
                review={data.review_count}
                name={data.store_name}
                category={data.category}
                images={data.store_images}
                open_status={data.open_status}
              />
              <Info
                address={data.full_address}
                lat={data.lat}
                lon={data.log}
                phone_number={data.phone_number}
                parking={data.is_parking}
                wifi={data.is_wifi}
                reservation={data.is_reservation}
                reviews={data.reviews}
                opening_time={data.opening_time_description}
                sns_url={data.sns_url}
                metro_stations={data.metro_stations.map(
                  data => data.name + '(' + data.line + ')'
                )}
                openRoadview={openRoadview}
                latitude={data.lat}
                longitude={data.lon}
                menu_pamphlet={data.menu_pamphlet_image_url}
                menuList={data.menus}
                visitor_photos={data.visitor_photos}
              />
            </>
          )}
        </React.Fragment>
      ))}
    </Detail>
  );
};

export default StoreDetail;

const Compo = styled.div`
  padding: 18px;
  background-color: white;
  display: flex;
  height: 50px;
  position: relative;
`;

const Button = styled.button`
  display: absoulte;
  font-size: 15px;
  cursor: pointer;
`;

const Detail = styled.div`
  background-color: rgb(238, 238, 238);
  position: absolute;
  right: 0;
  width: 400px;
  height: 100%;
  border-left: 1px solid #333;
  overflow-y: scroll;
`;
