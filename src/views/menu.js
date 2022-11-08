import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ICONS } from '../assets/images/images';
import StyledButton from '../components/button';
import HeaderMobile from '../components/headerMobile';
import { BREAKPOINTS } from '../models/breakpoints';
import { UserContext } from '../providers/user-provider';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../services/google-analytics-event';
import { currencyFormat } from '../utilities/currency-format';
import { useResizeListener } from '../utilities/resize-listener';
import ROUTES from '../utilities/routes';

const MenuStyled = styled.div`
  font-size: ${({ theme }) => theme.textTheme.fontSize.normal};

  .header {
    padding: 1em 2em 2em;
    background: #ffffff;
    box-shadow: 0 20px 30px 0 rgba(18, 62, 119, 0.11);

    .date {
      color: #7b7e80;
      font-weight: ${({ theme }) => theme.textTheme.bold};
    }
    .available-amount {
      color: ${({ theme }) => theme.colors.primary};
      font-size: ${({ theme }) => theme.textTheme.fontSize.h1};
      font-weight: ${({ theme }) => theme.textTheme.bold};
    }
    .subtitle {
      .long-text {
        font-size: 0.8rem;
      }
      .bold {
        font-weight: bold;
      }
    }
    button {
      width: 100%;
      &.button-dark {
        margin-top: 0.5em;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #1e1e1e;
      }
    }
  }

  .options {
    padding: 2em 1em 3em;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .card {
      width: 43%;
      background: #ffffff;
      box-shadow: 0 16px 30px 0 rgba(18, 62, 119, 0.14);
      line-height: 20px;
      padding: 1.5em 1em;
      margin: 0.8em 0.3em;
      border-radius: 10px;

      .icon {
        margin-bottom: 0.5em;
        width: 30px;
        height: 30px;
      }
      .card-content {
        .card-title {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 52px;
          font-weight: ${({ theme }) => theme.textTheme.bold};
          font-size: 1.15em;
        }
        .card-subtitle {
          color: #7b7e80;
          font-size: ${({ theme }) => theme.textTheme.fontSize.small};
        }
      }
    }
  }
`;

export default function Menu() {
  const { sessionLoan, user, token, setToken, setUser } =
    useContext(UserContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const history = useHistory();

  useResizeListener((width) => setScreenWidth(width));

  const urlToken = window.location.href.split('?');

  useEffect(() => {
    addGoogleAnalyticsEvent({
      category: CATEGORIES.HOME,
      action: ACTIONS.VISIT,
    });
  }, []);

  useEffect(() => {
    setUser(undefined);
  }, [setUser]);

  useEffect(() => {
    if (!urlToken[1] && !token) {
      window.location.href = process.env.REACT_APP_BILLPOCKET_LOGIN;
    } else if (!token) {
      setToken(urlToken[1]?.split('=')[1]);
    }
  }, [urlToken, token, setToken]);

  if (screenWidth > BREAKPOINTS.medium)
    return <Redirect to={ROUTES.REQUEST_LOAN} />;

  const requestEnabled = (
    <>
      <div className="subtitle">
        {sessionLoan && (
          <span className="long-text">
            Acabas de solicitar un préstamo por {sessionLoan}, puedes solicitar
            hasta
          </span>
        )}
        {!sessionLoan && <>Hoy puedes solicitar hasta</>}
      </div>
      <div className="available-amount">
        {currencyFormat(user?.availableAmount)}
      </div>
      <StyledButton
        solid
        onClick={() => {
          addGoogleAnalyticsEvent({
            category: CATEGORIES.HOME,
            action: ACTIONS.CLICK,
            label: 'go to CashAdvance',
          });
          history.push(ROUTES.REQUEST_LOAN);
        }}
      >
        Solicitar préstamo
      </StyledButton>
    </>
  );

  const requestDisabled = (
    <>
      <div className="subtitle">
        Por ahora{' '}
        <span className="bold">no tienes un preaprobado disponible</span>, sigue
        usando la plataforma de Billpocket para poder acceder a este beneficio
        con KEO.
      </div>
      <StyledButton
        className="button-dark"
        solid
        onClick={() => {
          history.push(ROUTES.HOW_WORKS);
        }}
      >
        <div>Regresar a Billpocket</div>
        <i className="material-icons">east</i>
      </StyledButton>
    </>
  );

  return (
    <MenuStyled>
      <HeaderMobile home help />
      <div className="header">
        {user &&
        user.availableAmount > Number(user.configs[0]?.minimal_loan_amount)
          ? requestEnabled
          : requestDisabled}
      </div>
      <div className="options">
        <div
          className="card"
          onClick={() => {
            addGoogleAnalyticsEvent({
              category: CATEGORIES.HOME,
              action: `go to ${CATEGORIES.CASH_ADVANCE_LIST}`,
            });
            history.push(ROUTES.LOANS);
          }}
        >
          <div className="icon">
            <img src={ICONS.arrows} alt="icon-option" />
          </div>
          <div className="card-content">
            <div className="card-title">Mis préstamos</div>
            <div className="card-subtitle">Conoce los detalles</div>
          </div>
        </div>
        <div
          className="card"
          onClick={() => {
            addGoogleAnalyticsEvent({
              category: CATEGORIES.HOME,
              action: `go to ${CATEGORIES.HOW_IT_WORKS}`,
            });
            history.push(ROUTES.HOW_WORKS);
          }}
        >
          <div className="icon">
            <img src={ICONS.info} alt="icon-option" />
          </div>
          <div className="card-content">
            <div className="card-title">¿Cómo funciona?</div>
            <div className="card-subtitle">Conoce los detalles</div>
          </div>
        </div>
        <div
          className="card"
          onClick={() => {
            addGoogleAnalyticsEvent({
              category: CATEGORIES.HOME,
              action: `go to ${CATEGORIES.FAQ}`,
            });
            history.push(ROUTES.FAQ);
          }}
        >
          <div className="icon">
            <img src={ICONS.faq} alt="icon-option" />
          </div>
          <div className="card-content">
            <div className="card-title">Preguntas frecuentes</div>
            <div className="card-subtitle">¿Dudas?</div>
          </div>
        </div>
        <div
          className="card"
          onClick={() => {
            addGoogleAnalyticsEvent({
              category: CATEGORIES.HOME,
              action: `go to ${CATEGORIES.WRITING_US}`,
            });
            history.push(ROUTES.CONTACT);
          }}
        >
          <div className="icon">
            <img src={ICONS.message} alt="icon-option" />
          </div>
          <div className="card-content">
            <div className="card-title">Contáctanos</div>
            <div className="card-subtitle">Salúdanos</div>
          </div>
        </div>
      </div>
    </MenuStyled>
  );
}
