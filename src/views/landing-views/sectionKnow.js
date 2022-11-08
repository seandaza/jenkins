import React from 'react';
import Button from '../../components/button';
import IconCard from '../../components/iconCard';
import Carousel from '../../components/carousel';
import { benefits } from '../../assets/data';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ROUTES from '../../utilities/routes';
import {
  ACTIONS,
  CATEGORIES,
  addGoogleAnalyticsEvent,
} from '../../services/google-analytics-event';

const Know = ({ knowRef }) => {
  const history = useHistory();

  return (
    <KnowContainer ref={knowRef}>
      <h2>
        Conoce los préstamos <span className="keo-text">KEO</span> <br />
        para usuarios <span className="billpocket-text">Billpocket</span>
      </h2>
      <p className="description">
        No hace falta que hagas largos trámites, hemos traído préstamos fáciles
        para ti ¡Toma esta oportunidad!
      </p>
      <div className="card-container">
        {benefits.map((item, idx) => (
          <IconCard
            key={`icard_${idx}`}
            icon={item.icon}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
      <div className="card-container-resp">
        <Carousel
          dots
          controlTop={{ resp: '320px', desk: '320px' }}
          slides={benefits.map((item, idx) => (
            <IconCard
              key={`icardres_${idx}`}
              icon={item.icon}
              title={item.title}
              content={item.content}
            />
          ))}
        />
      </div>
      <div className="know-cta">
        <p className="description text-grey">
          ¡Si, quiero que Billpocket y KEO me ayuden a crecer mi negocio!
        </p>
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
    </KnowContainer>
  );
};

const KnowContainer = styled.div`
  margin: 3em 0;
  .description {
    margin: 3em auto;
    max-width: 400px;
  }
  .text-grey {
    color: #2f384d;
  }
  .keo-text {
    color: ${(props) => props.theme.colors.primary};
  }
  .billpocket-text {
    color: ${(props) => props.theme.textTheme.blueLight};
  }
  .card-container {
    display: flex;
    justify-content: center;
    padding: 3em 4em 1em;
    max-width: ${(props) => props.theme.contentMaxWidth};
    margin: auto;
  }
  .card-container-resp {
    display: none;
    .control-buttons {
      width: 85%;
      margin: 9.1em 7%;
    }
  }
  .know-cta {
    padding: 0 2.5em 4em;
  }

  @media (max-width: 720px) {
    .description {
      margin: 3em auto;
      max-width: 300px;
      &.text-grey {
        max-width: 260px;
      }
    }
    .card-container {
      display: none;
    }
    .card-container-resp {
      display: block;
    }
  } ;
`;

export default Know;
