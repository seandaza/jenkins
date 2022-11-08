import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './index.css';
import UserProvider from './providers/user-provider';
import theme from './theme/theme';
import App from './views/app';

TagManager.initialize({ gtmId: process.env.REACT_APP_GTM_ID });
ReactGA.initialize(`${process.env.REACT_APP_GA_ID}`);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
