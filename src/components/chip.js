import styled from 'styled-components';

const Chip = styled.div`
  background: #ffffff;
  box-shadow: 0 5px 14px -6px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  font-weight: normal;
  font-size: 12px;
  color: #303643;
  line-height: 20px;
  padding: 0.5em 1.5em;
  margin: 0.5em;
  border: ${(props) =>
    props.isactive ? '1px solid #303643' : '1px solid rgb(0, 0, 0, 0)'};
  width: fit-content;
  &:hover {
    border: 1px solid #303643;
  }
  @media (max-width: 720px) {
    font-size: 0.8em;
  }
`;

export default Chip;
