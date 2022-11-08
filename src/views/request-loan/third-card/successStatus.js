import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import IMAGES from "../../../assets/images/images";
import StyledButton from "../../../components/button";
import { BREAKPOINTS } from "../../../models/breakpoints";
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from "../../../services/google-analytics-event";
import ROUTES from "../../../utilities/routes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 70vh;

  .title {
    color: #293442;
  }
  .icon {
    margin: 1.5em 0;
  }

  .confetti {
    z-index: -1;
    margin: 0 auto;
  }

  .description {
    max-width: 385px;
    word-wrap: break-word;
    margin: 0 auto;
  }

  .buttons {
    margin: 2em -3em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    button {
      width: 45%;
    }
    button + button {
      margin-left: 1em;
    }
  }

  @media (max-width: ${BREAKPOINTS.medium}px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    .icon {
      height: 8em;
    }
    .card {
      margin-bottom: 5em;
      max-width: 319px;
    }
    .buttons {
      flex-direction: column;
      margin: 0;
      button {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding: 0.8em 1em;
        font-weight: bold;
        div {
          margin-top: 0.15em;
        }
      }
      button + button {
        margin-top: 1em;
        margin-left: 0;
      }
    }
  }
`;

export default function SuccessStatus({ KYC }) {
  const history = useHistory();
  const [onMount, setOnMount] = useState(false);

  useEffect(() => {
    setOnMount(true);
    addGoogleAnalyticsEvent({
      category: CATEGORIES.CASH_ADVANCE,
      action: ACTIONS.RESPONSE,
      label: "loan successful",
    });
  }, []);

  return (
    <Container>
      <Confetti
        className="confetti"
        active={onMount}
        config={{
          spread: "360",
          stagger: "5",
          elementCount: "200",
          startVelocity: "40",
          colors: ["#FF4759", "#FF7380"],
        }}
      />
      <div className="h2 bold">
        {window.innerWidth < BREAKPOINTS.medium && <>¡Felicidades!</>}
        {window.innerWidth >= BREAKPOINTS.medium && (
          <>
            {!KYC && "¡Has solicitado tu préstamo correctamente!"}
            {!!KYC && "¡Felicidades!"}
          </>
        )}
      </div>
      <img className="icon" src={IMAGES.TICK} alt="tick" />
      <div className="description">
        {window.innerWidth >= BREAKPOINTS.medium && (
          <>
            Tu préstamo se{" "}
            <span className="bold">desembolsará inmediatamente</span>
            {" en tu "}
            <span className="bold">cuenta asociada a Billpocket</span>
          </>
        )}
        {window.innerWidth < BREAKPOINTS.medium && (
          <>
            Tus datos han sido validados. Continua <br /> disfutando de tu
            beneficio de préstamos al <br /> instante KEO | Billpocket
          </>
        )}
      </div>
      <div className="card">
        <span className="bold">Recuerda:</span>
        <br />
        El detalle de la transacción y los Términos y Condiciones fueron
        enviados a tu correo.
      </div>
      <div className="buttons">
        <StyledButton
          className="button dark"
          greyDark
          onClick={() => history.push(ROUTES.LOANS)}
        >
          <div>Ir a mis préstamos</div>
          {window.innerWidth < BREAKPOINTS.medium && (
            <i className="material-icons">east</i>
          )}
        </StyledButton>
        <StyledButton
          className="button"
          solid
          onClick={() => {
            history.push("/");
          }}
        >
          <div>Solicitar préstamo</div>
          {window.innerWidth < BREAKPOINTS.medium && (
            <i className="material-icons">east</i>
          )}
        </StyledButton>
      </div>
    </Container>
  );
}
