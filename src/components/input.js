import styled from 'styled-components';

const StyledInput = styled.input`
  font-family: Poppins;
  font-size: 0.8em;
  background: ${(props) => props.theme.colors.backgroundLight};
  border: ${ props => props.warning ? `1px solid ${props.theme.colors.primary}` : `1px solid ${props.theme.inputTheme.borderColor}`};
  border-radius: 4.03px;
  width: 100%;
  height: 28.8px;
  margin-bottom: 0.5em;
  &:focus {
    border: 1.5px solid ${(props) => props.theme.colors.secondaryLight};
  }
`

export default StyledInput;
