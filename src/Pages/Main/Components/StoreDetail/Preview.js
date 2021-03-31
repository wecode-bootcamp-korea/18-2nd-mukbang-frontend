import styled from 'styled-components';
import ImageSlider from './ImageSlider';

const Preview = () => {
  return (
    <PreviewStyle>
      <ImageSlider />
      <Name>
        스타벅스<button>{true ? '🤍' : '💖'}</button>
      </Name>
      <Overview>
        <div>
          <p>평점</p>
          <span>3.5/5.0</span>
        </div>
        <div>
          <p>리뷰</p>
          <span>200건</span>
        </div>
        <div>
          <p>업종</p>
          <span>카페/커피</span>
        </div>
      </Overview>
      <Description>아메리카노가 맛있어요.</Description>
    </PreviewStyle>
  );
};

export default Preview;

const Description = styled.div`
  padding: 18px;
`;

const PreviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 23px;
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
  border-bottom: 1px solid rgb(238, 238, 238);
  button {
    font-size: 20px;
  }
`;

const Overview = styled.div`
  padding: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 79px;
  line-height: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);
  p {
    color: #222222;
    font-size: 12px;
  }
  span {
    color: #2d60a3;
    font-size: 20px;
    font-weight: bold;
  }
`;
