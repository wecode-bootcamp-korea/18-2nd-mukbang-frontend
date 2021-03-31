import { useEffect } from 'react';
import { BiWebcam } from 'react-icons/bi';
import styled from 'styled-components';

const Map = props => {
  /*global kakao*/
  useEffect(() => {
    kakao.maps.load(() => {
      const container = document.getElementById('map'),
        options = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
          scrollwheel: false,
          draggable: false,
        };
      const map = new kakao.maps.Map(container, options);
      const circle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        radius: 50,
        strokeWeight: 5,
        strokeColor: '#ffa409',
        strokeOpacity: 1,
        strokeStyle: 'dashed',
        fillColor: '#ffa409',
        fillOpacity: 0.5,
      });

      circle.setMap(map);
    });
  });

  return (
    <MAP id="map">
      <button onClick={props.openRoadview}>{BiWebcam()} 로드뷰보기</button>
    </MAP>
  );
};

export default Map;

const MAP = styled.div`
  position: relative;
  margin-top: 10px;
  width: auto;
  height: 166px;
  button {
    z-index: 5;
    position: absolute;
    text-align: center;
    border: 1px solid rgb(238, 238, 238);
    bottom: 0px;
    padding: 13px;
    height: 47px;
    width: 100%;
    background-color: white;
    font-size: 16px;
    cursor: pointer;
  }
`;
