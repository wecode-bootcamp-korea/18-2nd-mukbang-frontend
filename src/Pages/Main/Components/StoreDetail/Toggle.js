import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import styled from 'styled-components';

const Toggle = props => {
  return (
    <ToggleStyle>
      {props.title}
      <button onClick={props.activeToggle}>
        {props.isActive ? BiChevronUp() : BiChevronDown()}
      </button>
    </ToggleStyle>
  );
};

export default Toggle;

const ToggleStyle = styled.div`
  color: #222222;
  font-size: 18px;
  position: relative;
  padding: 10px 0px;
  button {
    position: absolute;
    right: 0px;
    top: 2px;
    font-size: 30px;
  }
`;
