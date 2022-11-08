import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Header from '../components/header';
import HelpMobile from '../components/help-mobile';
import ROUTES from '../utilities/routes';
import Contact from './contact';
import Faq from './faq';
import Landing from './landing-views/landing';
import Loans from './loans/loans';
import Menu from './menu';
import RequestLoan from './request-loan/requestLoan';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path={ROUTES.ROOT} component={Menu} />
        <Route exact path={ROUTES.FAQ} component={Faq} />
        <Route exact path={ROUTES.CONTACT} component={Contact} />
        <Route exact path={ROUTES.HOW_WORKS} component={Landing} />
        <Route exact path={ROUTES.REQUEST_LOAN} component={RequestLoan} />
        <Route exact path={ROUTES.LOANS} component={Loans} />
        <Route exact path={ROUTES.HELP} component={HelpMobile} />
        {<Redirect to={ROUTES.ROOT} />}
      </Switch>
    </React.Fragment>
  );
};

const AppWithRouter = withRouter(App);

export default AppWithRouter;
