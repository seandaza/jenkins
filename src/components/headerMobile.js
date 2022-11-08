import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import IMAGES, { ICONS } from '../assets/images/images';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../services/google-analytics-event';
import ROUTES from '../utilities/routes';
import StyledButton from './button';

const HeaderMobileStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ home }) => (home ? '0.5em 2em' : '0.5em')};
  font-size: ${({ theme }) => theme.textTheme.fontSize.normal};

  ${({ home }) => {
    if (home) {
      return css`
        background-color: white;
        padding-top: 1.5em;
      `;
    }
    return css`
      padding-top: 0.7em;
    `;
  }}

  .keo-billpocket {
    width: auto;
    height: 1.5rem;
  }

  .back-button {
    text-align: left;
    button {
      padding-top: 0.1em;
      background-color: ${({ theme }) => theme.colors.backgroundLight};
      border: none;
      display: flex;
      justify-content: center;
      img {
        margin-top: 0.2em;
      }
    }
  }

  .title {
    text-align: center;
    margin-top: 0.2em;
    margin-left: 2em;
    font-weight: ${({ theme }) => theme.textTheme.bold};
    font-size: ${({ theme }) => theme.textTheme.fontSize.p};
    word-break: break-word;
  }

  .help-button {
    text-align: right;
    button {
      min-width: 70px;
      padding: 0.2em;
      border-radius: 15px;
      background-color: ${({ theme }) => theme.colors.blueDark};
      color: ${({ theme }) => theme.colors.backgroundLight};
      font-size: ${({ theme }) => theme.textTheme.fontSize.small};
      font-weight: ${({ theme }) => theme.textTheme.bold};
    }
  }

  .help-button-padding {
    width: 4em;
  }

  .header-options {
    display: flex;
    .tooltip {
      display: none;
      position: relative;
      &.active {
        display: block;
        position: absolute;
        box-shadow: 0 16px 30px 0 rgba(18, 62, 119, 0.14);
        border-radius: 9px;
        margin: 2em 2.2em 0 -11em;
        padding: 0.2em 0.5em;
        min-width: 180px;
        text-align: center;
        color: #05a6e2;
        font-weight: bold;
      }
    }
  }

  .actions {
    display: flex;
    .header-options {
      margin-left: 0.5rem;
    }
  }

  @media (max-width: 330px) {
    padding: 0.7rem 1rem 0.5rem;
  }
`;

export default function HeaderMobile({
  title,
  backButtonAction,
  processFinished,
  home,
  help,
  ...rest
}) {
  const history = useHistory();
  const [tooltip, setTooltip] = useState(false);

  return (
    <HeaderMobileStyled home={home} {...rest}>
      {home && (
        <img
          className="keo-billpocket"
          src={IMAGES.KEO_BILLPOCKET}
          alt="keo-billpocket logo"
        />
      )}
      {!home && (
        <>
          <div className="back-button">
            {!processFinished && backButtonAction && (
              <button onClick={() => backButtonAction()}>
                <img src={ICONS.arrowBack} alt="arrow-back" />
              </button>
            )}
          </div>
          <div className="title">{!processFinished && title}</div>
        </>
      )}
      <div className="actions">
        {!help && <div className="help-button-padding" />}
        {help && (
          <div className="help-button">
            <StyledButton
              onClick={() => {
                addGoogleAnalyticsEvent({
                  category: CATEGORIES.HOME,
                  action: ACTIONS.CLICK,
                  label: `go to ${CATEGORIES.HELP}`,
                });
                history.push(ROUTES.HELP);
              }}
            >
              ¿Ayuda?
            </StyledButton>
          </div>
        )}
        {home && (
          <div className="header-options">
            <img
              className="options-button"
              src={ICONS.options}
              alt="options"
              onClick={() => setTooltip(!tooltip)}
            />
            <span
              className={`tooltip ${tooltip ? 'active' : ''}`}
              onClick={() => history.push(ROUTES.HOW_WORKS)}
            >
              Regresar a Billpocket
            </span>
          </div>
        )}
      </div>
    </HeaderMobileStyled>
  );
}
