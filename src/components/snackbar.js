import styled from 'styled-components';

const Snackbar = styled.div`
  max-width: 980px;
  font-family: poppins;
  background-color: ${(props) => props.theme.colors.backgroundLight};
  margin: auto;
  box-shadow: 0px 15px 38px 12px rgba(0, 0, 0, 0.1);
  border-radius: ${(props) => props.theme.universalBorderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;
    font-weight: bold;
  }
  @media (max-width: 720px) {
    padding: 0.1em 1em;
    width: 80%;
    font-size: 0.8em;
  }
`;

export default Snackbar;
