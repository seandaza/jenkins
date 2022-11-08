import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { steps } from '../../assets/data';
import IMAGES from '../../assets/images/images';
import Button from '../../components/button';
import Carousel from '../../components/carousel';
import KnowMore from '../../components/know-more';
import { BREAKPOINTS } from '../../models/breakpoints';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../services/google-analytics-event';
import ROUTES from '../../utilities/routes';

const Steps = () => {
  const stepsref = useRef(null);
  const history = useHistory();

  return (
    <React.Fragment>
      <TopBorder />
      <Container>
        <StepsSection>
          <br />
          <br />
          <div className="section-title">
            <div className="h1">Te prestamos para que tu</div>
            <div className="h1 bold"> bolsillo nunca esté vacío</div>
          </div>

          <div className="know-ref">
            <KnowMore knowRef={stepsref}>
              <div className="">¡Solicita tu préstamo rápido y fácil!</div>
            </KnowMore>
          </div>

          <Carousel
            dots
            controlTop={{ resp: '32em', desk: '310px' }}
            slides={steps.map((item, idx) => (
              <Step key={`step_${idx}`}>
                <div className="step-info">
                  <div className="col1">
                    <h1>{item.title}</h1>
                    <p>{item.content}</p>
                  </div>
                  <div>
                    <img className="laptop" src={IMAGES.LAPTOP} alt="laptop" />
                    <img
                      className="laptop-page"
                      src={IMAGES.LAPTOP_PAGES[idx]}
                      alt="keo -laptop -pages"
                    />
                  </div>
                </div>
                <div className="step-info-resp">
                  <img
                    src={IMAGES.MOBILE[idx]}
                    alt="keo - mobile"
                    width="166px"
                  />
                  <div className="image-info">
                    <h1>{item.title}</h1>
                    <p>{item.content}</p>
                  </div>
                </div>
              </Step>
            ))}
          />
          <div className="steps-cta">
            <h3>¡Estás listo para pedirlo!</h3>
            <Button
              solid
              wideResp
              className="button"
              onClick={() => {
                addGoogleAnalyticsEvent({
                  category: CATEGORIES.HOW_IT_WORKS,
                  action: ACTIONS.CLICK,
                  label: 'go to Home',
                });
                history.push(ROUTES.REQUEST_LOAN);
              }}
            >
              Solicita tu préstamo
            </Button>
          </div>
        </StepsSection>
        <Grid ref={stepsref}>
          <div className="steps-img">
            <Img src={IMAGES.PHONE} />
          </div>
          <div className="steps-text">
            <div className="info-title">
              <div className="text">Un préstamo</div>
              <div className="blue">de bolsillo</div>
            </div>
            <p>
              Podrás solicitar más de un préstamo hasta completar tu cupo
              preaprobado.
            </p>
            <div className="features">
              <div className="row">
                <div className="item">
                  <b>Monto</b> <br />
                  Mínimo $ 500 MXN <br />
                  Máximo $ 10.000 MXN
                </div>
                <div className="item">
                  <b>Costo</b> <br />
                  10% + IVA sobre el monto del préstamo desembolsado
                </div>
              </div>
              <div className="row border">
                <div className="item">
                  <b>Plazo</b> <br />1 mes, pagarás en 22 cuotas diarias que se
                  cobran únicamente en días hábiles
                </div>
                <div className="item">
                  <b>Desembolso</b> <br />
                  Recibirás el desembolso directamente en tu cuenta
                </div>
              </div>
            </div>
            <Button
              solid
              wideResp
              className="button"
              onClick={() => {
                addGoogleAnalyticsEvent({
                  category: CATEGORIES.HOW_IT_WORKS,
                  action: ACTIONS.CLICK,
                  label: 'go to Home',
                });
                history.push(ROUTES.REQUEST_LOAN);
              }}
            >
              Solicita tu préstamo
            </Button>
          </div>
        </Grid>
      </Container>
      <BottomBorder />
    </React.Fragment>
  );
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundDark};
  color: ${(props) => props.theme.textTheme.secondaryColor};
  padding: 5em 0;
  @media (max-width: ${BREAKPOINTS.medium}px) {
    padding: 1em 0 2em;
  }
`;

const StepsSection = styled.div`
  .bold {
    font-weight: ${({ theme }) => theme.textTheme.bold};
  }
  .section-title {
    .h1 {
      font-size: ${({ theme }) => theme.textTheme.fontSize.h1};
    }
    .bold {
      margin-top: -0.4em;
      color: ${(props) => props.theme.colors.red};
    }
  }

  h3 {
    font-weight: normal;
  }

  .steps-cta {
    margin-top: 4em;
  }

  @media (max-width: 786px) {
    .section-title {
      .h1 {
        font-size: 1.6em;
      }
    }
    .steps-cta {
      padding: 0 2em;
    }
  }
`;

const Step = styled.div`
  max-width: 560px;
  margin: auto;
  .step-info {
    background-color: ${(props) => props.theme.colors.teal};
    border-radius: 10px;
    width: 450px;
    height: 275px;
    display: grid;
    grid-template-columns: 45% 55%;
    .col1 {
      padding: 3em 0 0em 3em;
      text-align: left;
      font-weight: bold;

      h1 {
        font-size: 3em;
        margin: 0;
      }
    }

    @media (max-width: 720px) {
      display: none;
    }
  }
  .laptop {
    margin-top: 13px;
    width: 30em;
  }
  .laptop-page {
    position: absolute;
    top: 23px;
    margin-left: -72px;
    width: 23.5em;
  }
  .step-info-resp {
    display: none;
    @media (max-width: 720px) {
      display: block;
      margin-top: 1.5em;
      img {
        height: 335px;
      }
      .image-info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        /* width: 295px; */
        margin: auto;
        h1 {
          font-family: Poppins;
          font-size: 2em;
          border-radius: 50px;
          border: 4px solid ${({ theme }) => theme.colors.teal};
          color: ${({ theme }) => theme.colors.teal};
          width: 53px;
          height: 53px;
          padding-top: 0.1em;
        }
        p {
          margin-left: 1em;
          text-align: left;
          font-size: 1em;
          max-width: 230px;
        }
      }
    }
  }
`;

const TopBorder = styled.div`
  border-left: 0px solid transparent;
  border-top: 50px solid transparent;
  border-right: 100vw solid ${(props) => props.theme.colors.backgroundDark};
  border-bottom: 0vw solid ${(props) => props.theme.colors.backgroundDark};
  @media (max-width: ${BREAKPOINTS.medium}px) {
    margin-bottom: -0.06em;
    border-top: 30px solid transparent;
  }
`;

const BottomBorder = styled.div`
  border-right: 0px solid transparent;
  border-bottom: 50px solid transparent;
  border-left: 100vw solid ${(props) => props.theme.colors.backgroundDark};
  border-top: 0vw solid ${(props) => props.theme.colors.backgroundDark};
  @media (max-width: ${BREAKPOINTS.medium}px) {
    margin-top: -0.08em;
    border-bottom: 30px solid transparent;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  max-width: 980px;
  margin: 10em auto 5em;

  .row {
    padding-bottom: 2em;
    display: grid;
    grid-template-columns: 50% 50%;
    text-align: left;
    .item + .item {
      margin-left: 2.5em;
    }
  }
  .row + .row {
    padding-top: 2em;
    padding-bottom: 0;
  }

  .features {
    margin-top: 3em;
    .item {
      max-width: 230px;
    }
  }

  .border {
    border-top: 3px solid ${({ theme }) => theme.colors.teal};
  }

  .info-title {
    .text {
      font-size: 2.5em;
    }
    .blue {
      font-size: 4em;
      margin-top: -0.35em;
      color: ${({ theme }) => theme.colors.teal};
      transform: rotate(-2.7deg);
      font-style: italic;
      font-weight: bold;
      white-space: nowrap;
    }
  }

  .button {
    margin-top: 4em;
  }

  @media (max-width: 720px) {
    grid-template-columns: 100%;
    margin: 5em auto 3em;
    .row {
      padding-right: 0;
      p {
        margin-right: 1em;
      }
      p + p {
        margin-right: 0;
        margin-left: 1em;
      }
    }
    .steps-img {
      img {
        width: 80%;
      }
    }
    .steps-text {
      padding: 1em 2em;
    }
  }
`;

const Img = styled.img`
  margin-left: auto;
  margin-right: 1em;
  order: 2;
  width: 100%;
  z-index: 1;
`;

export default Steps;
