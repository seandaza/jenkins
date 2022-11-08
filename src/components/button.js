import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  width: ${({ width }) => width || 'auto'};
  border: 1px transparent solid;
  border-radius: ${(props) => props.theme.universalBorderRadius};
  cursor: pointer;
  font-family: 'Poppins';
  font-size: ${(props) => props.theme.textTheme.fontSize.normal};
  margin: ${(props) => (props.margin ? props.margin : '0')};
  padding: ${(props) => (props.padding ? props.padding : '8px 20px')};

  ${({ solid, greyDark, theme }) => {
    if (solid) {
      return css`
        color: white;
        background-color: ${theme.colors.primary};
        font-weight: ${theme.textTheme.bold};
      `;
    } else if (greyDark) {
      return css`
        background-color: ${theme.colors.greyDark};
        color: white;
        font-weight: ${theme.textTheme.bold};
      `;
    }
    return css`
      background-color: white;
      color: ${theme.colors.primary};
    `;
  }}

  ${(props) =>
    props.alt &&
    css`
      border: 1x ${(props) => props.theme.colors.secondary} solid;
      color: ${(props) => props.theme.colors.secondary};

      &:hover {
        background-color: ${(props) => props.theme.colors.secondary};
        border: 1px transparent solid;
        color: white;
      }
    `}

  ${(props) =>
    props.solidAlt &&
    css`
      background-color: ${(props) => props.theme.colors.secondary};
      border: 1x ${(props) => props.theme.colors.secondary} solid;
      color: white;

      &:hover {
        border: 1px transparent solid;
      }
    `}
  @media (max-width: 786px) {
    width: ${({ wideResp }) => (wideResp ? '100%' : 'auto')};
  }
`;
export default StyledButton;

export const HeaderButton = styled.button`
  background-color: ${(props) =>
    props.solid ? props.theme.helpSectionTheme.primary : 'white'};
  border: ${(props) => (props.solid ? '1px transparent solid;' : 'black')};
  border-radius: ${(props) => props.theme.universalBorderRadius};
  color: ${(props) => (props.solid ? 'white' : 'black')};
  cursor: pointer;
  font-family: 'Poppins';
  font-size: 0.8em;
  font-weight: 600;
  margin: ${(props) => (props.margin ? props.margin : '0')};
  padding: ${(props) => (props.padding ? props.padding : '6px 10px')};

  ${(props) =>
    props.round &&
    css`
      border-radius: 20px;
    `}
`;

export const PureButton = styled.button`
  background-color: rgb(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
`;
