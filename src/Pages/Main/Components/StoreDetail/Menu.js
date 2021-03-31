import styled from 'styled-components';
const Menu = () => {
  return (
    <StoreMenu>
      <img src="https://www.chrischae.kr/content/images/size/w1200/2019/12/starbucks1.jpg" />
      <img src="https://www.chrischae.kr/content/images/size/w1200/2019/12/starbucks1.jpg" />
      <img src="https://www.chrischae.kr/content/images/size/w1200/2019/12/starbucks1.jpg" />
      <p>아메리카노</p>
      <p>라떼</p>
      <p>피지오</p>
      <img src="https://www.chrischae.kr/content/images/size/w1200/2019/12/starbucks1.jpg" />
      <img src="https://www.chrischae.kr/content/images/size/w1200/2019/12/starbucks1.jpg" />
      <img src="https://www.chrischae.kr/content/images/size/w1200/2019/12/starbucks1.jpg" />
      <p>아메리카노</p>
      <p>라떼</p>
      <p>피지오</p>
    </StoreMenu>
  );
};

export default Menu;

const StoreMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  img {
    width: 100%;
  }
  p {
    text-align: center;
  }
`;
