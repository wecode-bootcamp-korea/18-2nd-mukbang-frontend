import styled from 'styled-components';

const ImageSlider = () => {
  return (
    <ImgSlider src="https://www.chrischae.kr/content/images/size/w1200/2019/12/starbucks1.jpg" />
  );
};

export default ImageSlider;

const ImgSlider = styled.img`
  width: 100%;
`;
