import { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import IMAGES from '../assets/images/images';
import { BREAKPOINTS } from '../models/breakpoints';
import ROUTES from '../utilities/routes';
import StyledButton from './button';
import BottomBorder from './cardFooter';
import HeaderMobile from './headerMobile';

export default function SuccessfulContact() {
  const history = useHistory();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <SuccessfulContactStyled>
      {showConfetti && (
        <Confetti
          className="confetti"
          active={showConfetti}
          config={{
            spread: '360',
            stagger: '5',
            elementCount: '200',
            startVelocity: '40',
            colors: ['#FF4759', '#FF7380'],
          }}
        />
      )}
      <HeaderMobile className="header" help />
      <div className="card">
        <img className="icon" src={IMAGES.TICK} alt="tick" />
        <div className="title">¡Gracias!</div>
        <div className="description">
          Hemos recibido tu mensaje y nos pondremos en contacto lo antes
          posible.
        </div>
        <StyledButton solid onClick={() => history.push(ROUTES.ROOT)}>
          <div>Volver al inicio</div>
          {window.innerWidth < BREAKPOINTS.medium && (
            <i className="material-icons">east</i>
          )}
        </StyledButton>
      </div>
      <BottomBorder className="bottom-border" />
    </SuccessfulContactStyled>
  );
}

const SuccessfulContactStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .header {
    display: none;
  }

  .confetti {
    position: absolute;
    z-index: -1;
    margin: 0 auto;
  }

  .card {
    margin: auto;
    max-width: 350px;
    min-height: 387px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    box-shadow: 0 20px 30px 0 rgba(201, 172, 173, 0.52);
    border-radius: 10px;

    padding: 3em;

    .title {
      font-size: ${({ theme }) => theme.textTheme.fontSize.h1};
      font-weight: ${({ theme }) => theme.textTheme.bold};
      margin: 1em 0;
    }
    .description {
      font-size: ${({ theme }) => theme.textTheme.fontSize.p};
      text-align: center;
      max-width: 261px;
      word-wrap: break-word;
      margin-bottom: 2em;
    }
  }
  .bottom-border {
    display: none;
  }
  @media (max-width: ${BREAKPOINTS.medium}px) {
    justify-content: inherit;
    .header {
      display: block;
    }
    .card {
      margin: 0;
      height: 85%;
      box-shadow: none;
      button {
        margin-top: 2em;
        width: 110%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .bottom-border {
      display: flex;
      margin: 0;
    }
  }

  @media (min-height: 1024px) {
    .card {
      height: 50%;
    }
  }
`;
