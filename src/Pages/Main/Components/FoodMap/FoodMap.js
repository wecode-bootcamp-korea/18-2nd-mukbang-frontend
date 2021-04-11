import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Filter from './Filter/Filter';
import { CreateMapMark } from './CreateMapMarks';
import bread from './images/bread.png';
import chicken from './images/chicken.png';
import chinese from './images/chinese.png';
import coffee from './images/coffee.png';
import fastfood from './images/fastfood.png';
import fusion from './images/fusion.png';
import korean from './images/korean.png';
import snack from './images/snack.png';
import sushi from './images/sushi.png';
import west from './images/west.png';
import './FoodMap.scss';

const { kakao } = window;

const FoodMap = ({
  storeData,
  viewPointData,
  getPriceRange,
  getCategoryCheck,
  setViewPointData,
}) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [marks, setMarks] = useState([]);
  const [overlays, setOverlays] = useState([]);
  const categoryImage = {
    베이커리: bread,
    카페: coffee,
    패스트푸드: fastfood,
    분식: snack,
    차칸: chicken,
    한식: korean,
    일식: sushi,
    중식: chinese,
    퓨전: fusion,
    양식: west,
  };

  const createNewMark = (storeData, map, clusterer) => {
    const markers = storeData.map(data => {
      const icon = new kakao.maps.MarkerImage(
        categoryImage[data.category],
        new kakao.maps.Size(35, 35),
        {
          alt: '마커 이미지',
        }
      );
      const mark = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(data.lat, data.lng),
        image: icon,
      });
      return mark;
    });
    const overlayList = [];
    markers.forEach((mark, index) => {
      CreateMapMark(kakao, map, mark, overlays, overlayList, storeData[index]);
    });
    setMarks(markers);
    setOverlays(overlayList);
    clusterer.addMarkers(markers);
    return markers;
  };

  useEffect(() => {
    if (!mapInstance) {
      const container = document.getElementById('FoodMap');
      const options = {
        center: new kakao.maps.LatLng(viewPointData.lat, viewPointData.lng),
        level: viewPointData.zoomLevel,
      };

      const map = new kakao.maps.Map(container, options);
      const clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 4,
        minClusterSize: 2,
        // gridSize: 격자 크기 (추후 사용)
        styles: [
          {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#fead33',
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: '40px',
            opacity: '80%',
          },
        ],
      });
      const handleViewPoint = () => {
        const centerPoint = map.getCenter();
        const mapLevel = map.getLevel();
        setViewPointData({
          ...viewPointData,
          lat: centerPoint.Ma,
          lng: centerPoint.La,
          zoomLevel: mapLevel,
        });
      };

      kakao.maps.event.addListener(map, 'dragend', handleViewPoint);
      kakao.maps.event.addListener(map, 'zoom_changed', handleViewPoint);
      setMapInstance({ map, clusterer });
    }
  }, []);

  useEffect(() => {
    if (mapInstance) {
      const { map, clusterer } = mapInstance;
      map.setCenter(
        new kakao.maps.LatLng(viewPointData.lat, viewPointData.lng)
      );
      marks.forEach(mark => mark.setMap(null));
      overlays.forEach(overlay => overlay.setMap(null));
      clusterer.clear();

      storeData.length !== 0 && createNewMark(storeData, map, clusterer);
    }
  }, [storeData, viewPointData]);

  return (
    <Map id="FoodMap" style={{ height: '100%' }}>
      <Filter
        viewPointData={viewPointData}
        setViewPointData={setViewPointData}
        getPriceRange={getPriceRange}
        getCategoryCheck={getCategoryCheck}
      />
    </Map>
  );
};

const Map = styled.div`
  height: 100%;
`;

export default FoodMap;
