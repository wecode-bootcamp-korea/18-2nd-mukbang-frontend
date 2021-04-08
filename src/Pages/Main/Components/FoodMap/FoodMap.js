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

  const removeMark = deleteMarks => {
    if (deleteMarks.length === 0) {
      console.log(marks);
      return;
    } else {
      deleteMarks.forEach((mark, index) => {
        mark.markData.setMap(null);
      });
      marks.forEach((mark, index) => {
        deleteMarks.forEach(deleteMark => {
          if (mark.storeId === deleteMark.storeId) {
            marks[index] = false;
            return;
          }
        });
      });
      const restMarks = marks.filter(mark => mark !== false);
      console.log(restMarks, marks);
      setMarks(restMarks);
    }

    // const clusterMarkers = marks.map(mark => mark.markData); 추가 기능 구현
    // clusterer.removeMarkers(clusterMarkers); 추가 기능 구현
  };

  const createNewMark = (storeData, map) => {
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
    const newMarks = [];
    markers.forEach((mark, index) => {
      CreateMapMark(kakao, map, mark, overlays, setOverlays, storeData[index]);
      mark.setMap(map);
      const newMark = { storeId: storeData[index].store_id, markData: mark };
      newMarks.push(newMark);
    });
    console.log(marks, newMarks);
    setMarks(marks.concat(newMarks));
    // clusterer.addMarkers(markers); 추가 기능 구현
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

      overlays.forEach(overlay => overlay.setMap(null));

      const newStoreData = [];
      const deleteMarks = [];
      const existStoreData = [];

      storeData.forEach(data => {
        if (marks.length === 0) {
          newStoreData.push(data);
        } else {
          marks.forEach((mark, index) => {
            if (data.store_id === mark.storeId) {
              existStoreData.push(data);
              return;
            } else if (index === marks.length - 1) {
              newStoreData.push(data);
            }
          });
        }
      });
      if (existStoreData.length === 0 && marks.length !== 0)
        deleteMarks.push(marks);
      else {
        marks.forEach(mark => {
          existStoreData.forEach((data, index) => {
            if (data.store_id === mark.storeId) {
              return;
            } else if (index === existStoreData.length - 1) {
              deleteMarks.push(mark);
              return;
            }
          });
        });
      }

      console.log('새로운 데이터: ', newStoreData);
      console.log('삭제할 데이터: ', deleteMarks);
      console.log('있는 데이터: ', existStoreData);
      console.log('전 마커', marks);

      storeData.length === 0 && deleteMarks.push(...marks);
      removeMark(deleteMarks);
      newStoreData.length !== 0 && createNewMark(newStoreData, map, clusterer);
    }
  }, [storeData]);
  console.log('최신 marks', marks);
  console.log('최신 스토어데이터', storeData);
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
