import { useHistory } from "react-router-dom";
import styled from "styled-components";
import StyledButton from "../../../components/button";
import { BREAKPOINTS } from "../../../models/breakpoints";
import ROUTES from "../../../utilities/routes";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70vh;

  .text {
    margin: 3em 0 3em 0;
    max-width: 435px;
  }
  button {
    width: 50%;
    margin: 0 auto;
    @media (max-width: ${BREAKPOINTS.medium}px) {
      width: 100%;
    }
  }

  @media (min-height: 1024px) {
    height: 40%;
  }
`;

export default function FailStatus() {
  const history = useHistory();
  return (
    <Container>
      <div className="h2 bold">¡Lo sentimos!</div>
      <div className="text">
        Por ahora{" "}
        <span className="bold">no tienes un preaprobado disponible</span>, sigue
        usando <span className="bold">la plataforma de Billpocket</span> para
        poder acceder a este beneficio con KEO.
      </div>
      <StyledButton
        className="dark"
        solid
        onClick={() => {
          history.push(ROUTES.HOW_WORKS);
        }}
      >
        Regresar a Billpocket
      </StyledButton>
    </Container>
  );
}
