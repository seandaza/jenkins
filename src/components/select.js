import styled from 'styled-components';

const SelectStyled = styled.select`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '3em'};
  font-family: ${({ theme }) => theme.textTheme.fontFamily};

  background: ${(props) => props.theme.colors.backgroundLight};
  border: ${(props) =>
    props.warning
      ? `1px solid ${props.theme.colors.red}`
      : `1px solid ${props.theme.colors.grey}`};

  margin-bottom: 0.5em;
  border-radius: 4.35px;
  padding: 0 1em;

  &:focus {
    border: 1.5px solid ${(props) => props.theme.colors.secondaryLight};
    outline-color: #4cd67c;
  }
`;

export default SelectStyled;
