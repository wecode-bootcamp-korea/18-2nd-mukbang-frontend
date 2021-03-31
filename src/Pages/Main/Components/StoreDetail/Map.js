import { BiWebcam } from 'react-icons/bi';
import styled from 'styled-components';

const Map = () => {
  return (
    <MAP id="map">
      <button>{BiWebcam()} 로드뷰보기</button>
    </MAP>
  );
};

export default Map;

const MAP = styled.div`
  margin-top: 10px;
  width: auto;
  height: 166px;
  position: relative;
  background-image: url(https://www.chrischae.kr/content/images/size/w1200/2019/12/starbucks1.jpg);
  button {
    background-color: white;
    position: absolute;
    padding: 13px;
    height: 47px;
    width: 100%;
    text-align: center;
    font-size: 16px;
    border: 1px solid rgb(238, 238, 238);
    bottom: 0px;
  }
`;
