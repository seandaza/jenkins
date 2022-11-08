import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { faqinfolong } from '../assets/data';
import CardList from '../components/cardList';
import HeaderMobile from '../components/headerMobile';
import { BREAKPOINTS } from '../models/breakpoints';
import { UserContext } from '../providers/user-provider';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../services/google-analytics-event';
import { useResizeListener } from '../utilities/resize-listener';
import ROUTES from '../utilities/routes';

export default function Faqs() {
  const { user } = useContext(UserContext);
  const history = useHistory();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    addGoogleAnalyticsEvent({
      category: CATEGORIES.FAQ,
      action: ACTIONS.VISIT,
    });
  }, []);

  useResizeListener((width) => setScreenWidth(width));

  return (
    <React.Fragment>
      {screenWidth > BREAKPOINTS.medium && (
        <Header signedIn={!!user}>
          {user && <span className="bold">Preguntas Frecuentes</span>}
          {!user && (
            <>
              Inicio{' '}
              <span className="bold">
                {'>'} <span className="underlined">Preguntas Frecuentes</span>
              </span>
            </>
          )}
        </Header>
      )}
      {screenWidth <= BREAKPOINTS.medium && (
        <HeaderMobile
          backButtonAction={() => history.push(ROUTES.ROOT)}
          title={`Preguntas Frecuentes`}
          help
        />
      )}
      <CardList data={faqinfolong} />
    </React.Fragment>
  );
}

const Header = styled.div`
  font-size: ${({ theme }) => theme.textTheme.fontSize.h2};
  color: #00326e;
  ${({ signedIn }) => {
    if (signedIn) {
      return css`
        padding: 1.25em 18.5% 0;
      `;
    }
    return css`
      padding: 1.25em 23.5% 0;
    `;
  }}

  .bold {
    font-weight: ${({ theme }) => theme.textTheme.bold};
  }
  .underlined {
    text-decoration: underline;
  }

  @media (max-width: 875px) {
    text-align: center;
  }
`;
