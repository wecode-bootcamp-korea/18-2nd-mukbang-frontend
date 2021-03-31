import styled from 'styled-components';
const StoreInfo = () => {
  return (
    <Infolist>
      <li>
        <span>주소</span>
        <span>강남구 논현동</span>
      </li>
      <li>
        <span>주차</span>
        <span>{true ? '가능' : '불가능'}</span>
      </li>
    </Infolist>
  );
};

export default StoreInfo;

const Infolist = styled.ul`
  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 6px 0px;
    border-bottom: 1px solid rgb(238, 238, 238);
    color: #757575;
  }
`;
