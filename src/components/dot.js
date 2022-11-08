import styled from "styled-components";

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  align-self: center;
  background-color: ${props => props.isactive? "#C7C6C6" : "#747474" };
  &:hover {
    border: 2px solid #303643;
  }
`;

export default Dot;