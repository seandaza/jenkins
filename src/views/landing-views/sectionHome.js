import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import IMAGES from '../../assets/images/images';
import Button from '../../components/button';
import {
  ACTIONS,
  CATEGORIES,
  addGoogleAnalyticsEvent,
} from '../../services/google-analytics-event';
import ROUTES from '../../utilities/routes';

const Home = () => {
  const history = useHistory();

  return (
    <SectionContainer>
      <Grid>
        <div className="home-text">
          <img
            className="title-img"
            src={IMAGES.HOME_TITLE}
            alt=" title - prestamos alinstante"
          />
          <div className="introduction">
            Con Billpocket y KEO ahora tienes una forma{' '}
            <b>fácil, rápida y segura</b> de <b>solicitar préstamos</b> en solo
            segundos.
          </div>
          <div className="home-btn">
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
        </div>
        <div className="home-img">
          <Img src={IMAGES.PERSON1} />
        </div>
      </Grid>
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundGrey};
  margin-bottom: -24px;
  padding: 2% 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  max-width: 980px;
  margin: auto;
  padding-bottom: 2em;
  text-align: left;

  .introduction {
    font-size: 1.1em;
    margin: 2em 0;
  }
  .home-text {
    margin-top: 5em;
    padding: 1em;
  }
  .title-img {
    width: 85%;
  }
  .home-btn {
    text-align: center;
    margin-left: -2em;
  }

  @media (max-width: 720px) {
    grid-template-columns: 100%;
    grid-template-rows: 45% 50%;
    text-align: center;
    padding-bottom: 3em;

    .home-text {
      margin-top: 4px;
      padding: 0 2.5em;
      grid-row: 2;
      h1 {
        font-size: 3em;
      }
    }

    .home-img {
      grid-row: 1;
      img {
        width: 65%;
        max-width: 300px;
      }
    }
    .home-btn {
      margin-bottom: 1em;
      margin-left: 0;
    }
  }
`;

const Img = styled.img`
  margin-left: auto;
  margin-right: 1em;
  order: 2;
  padding: 5%;
  width: 90%;
  z-index: 1;
`;

export default Home;
