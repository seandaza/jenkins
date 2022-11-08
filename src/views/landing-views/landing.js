import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import IMAGES from '../../assets/images/images';
import Footer from '../../components/footer';
import HeaderMobile from '../../components/headerMobile';
import KnowMore from '../../components/know-more';
import Snackbar from '../../components/snackbar';
import { BREAKPOINTS } from '../../models/breakpoints';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../services/google-analytics-event';
import { useResizeListener } from '../../utilities/resize-listener';
import ROUTES from '../../utilities/routes';
import SectionFaqs from './sectionFaqs';
import SectionHome from './sectionHome';
import SectionKnow from './sectionKnow';
import SectionSteps from './sectionSteps';

const Container = styled.div`
  text-align: center;

  .snackbar {
    width: 55%;
  }

  .white-circle {
    position: absolute;
    left: 0;
    margin-left: -8em;
  }
  .small-blue-circle {
    position: absolute;
    z-index: -1;
    left: 0;
    margin-top: -10em;
    margin-left: 10%;
    width: 4em;
  }
  .large-blue-semicircle {
    position: absolute;
    right: 0;
    margin-top: 11em;
  }
  .small-red-circle {
    position: absolute;
    left: 0;
    margin-left: 8em;
    margin-top: -15em;
  }

  @media (max-width: ${BREAKPOINTS.medium}px) {
    .snackbar {
      width: 75%;
      padding: 0 0.5em;
      p {
        margin: 0.3em 0;
      }
    }
    .button {
      padding: 1em 0;
    }
    .large-blue-semicircle,
    .small-blue-circle,
    .small-red-circle,
    .white-circle {
      display: none;
    }
  }
`;

const Landing = () => {
  const history = useHistory();
  const knowref = useRef(null);
  const [screenWidth, setscreenWidth] = useState(window.innerWidth);
  useResizeListener((width) => setscreenWidth(width));

  useEffect(() => {
    addGoogleAnalyticsEvent({
      category: CATEGORIES.HOW_IT_WORKS,
      action: ACTIONS.VISIT,
    });
  }, []);

  return (
    <Container>
      {screenWidth <= BREAKPOINTS.medium && (
        <HeaderMobile
          title="¿Cómo funciona?"
          backButtonAction={() => history.push(ROUTES.ROOT)}
          help
        />
      )}
      <SectionHome />
      <img
        className="white-circle"
        src={IMAGES.WHITE_CIRCLE}
        alt="white-circle"
      />
      <Snackbar className="snackbar">
        <p>
          {screenWidth > BREAKPOINTS.medium && (
            <>
              <b>Nos aliamos con Billpocket</b>, para darle a sus clientes un
              préstamo que ayudará a crecer su negocio
            </>
          )}
          {screenWidth < BREAKPOINTS.medium && (
            <>
              Esto es posible gracias a la <br />
              <b>alianza entre KEO y Billpocket</b>
            </>
          )}
        </p>
      </Snackbar>

      <div className="know-ref">
        <KnowMore knowRef={knowref}>
          <p>Conoce más</p>
        </KnowMore>
      </div>

      <SectionKnow knowRef={knowref} />
      <img
        className="small-blue-circle"
        src={IMAGES.BLUE_CIRCLE}
        alt="blue-circle"
      />
      <img
        className="large-blue-semicircle"
        src={IMAGES.BLUE_SEMICIRCLE}
        alt="blue-semicircle"
      />
      <SectionSteps />
      <img
        className="small-red-circle"
        src={IMAGES.RED_CIRCLE}
        alt="red-circle"
      />
      <SectionFaqs />

      <Snackbar
        className="snackbar"
        style={{ marginBottom: '-24px', position: 'relative' }}
      >
        <p>
          ¿Tienes dudas sobre el préstamo? consulta nuestras{' '}
          <Link to={ROUTES.FAQ}>preguntas frecuentes</Link> o{' '}
          <Link to={ROUTES.CONTACT}>contáctanos</Link>
        </p>
      </Snackbar>

      <Footer />
    </Container>
  );
};

export default Landing;
