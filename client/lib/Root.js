/* global __DEVTOOLS__ */

//import '../assets/stylesheets/index.css';

import React, { PropTypes } from 'react';
import {
  Redirect,
  Route,
  IndexRoute
} from 'react-router';
import { ReduxRouter } from 'redux-router';
import { connect } from 'react-redux';
import {
  IntlProvider
} from 'react-intl';
import configureStore from './utils/configure-store';
import * as storage from './persistence/storage';
import * as components from './components';
import * as constants from './constants';
import * as i18n from './i18n';
import 'whatwg-fetch';
import { pingAuth } from './actions/application';

const {
  About,
  Account,
  AccountHome,
  Application,
  Home,
  Login,
  SuperSecretArea,
  ControlPanel,
  UsersRegistration,
  XlsPage
} = components;

const initialState = {
  application: {
    token : storage.get('token'),
    locale: storage.get('locale') || 'en',
    user  : { permissions: [/*'manage_account'*/] },
    pinged: false,
  }
};

export const store = configureStore(initialState);

function getRootChildren (props) {
  const intlData = {
    locale  : props.application.locale,
    messages: i18n[props.application.locale]
  };
  const rootChildren = [
    <IntlProvider key="intl" {...intlData}>
      {renderRoutes() }
    </IntlProvider>
  ];

  if (__DEVTOOLS__) {
    const DevTools = require('./components/DevTools').default;
    rootChildren.push(<DevTools key="devtools"/>);
  }
  return rootChildren;
}

function renderRoutes () {
  return (
    <ReduxRouter>
      <Route component={Application}>
        <Route path="/" component={Home} onEnter={requireAuth}/>
        <Redirect from="/account" to="/account/profile"/>
        <Route path="dashboard" component={ControlPanel}  onEnter={requireAuth}>
          <IndexRoute component={UsersRegistration}/>
          <Route path="register" component={UsersRegistration}/>
          <Route path="tables" component={XlsPage}/>
        </Route>
        <Route path="about" component={About} onEnter={requireAuth}/>
        <Route path="account" component={Account} onEnter={requireAuth}>
          <Route path="profile" component={AccountHome}/>
          <Route path="secret-area" component={SuperSecretArea}/>
        </Route>
        <Route path="login" component={Login}/>
        <Route path="logout" onEnter={logout}/>
      </Route>
    </ReduxRouter>
  );
}

function requireAuth (nextState, replaceState) {
  const state = store.getState();
  const isLoggedIn = !!state.application.token;
  const isChecked = !state.application.pinged;
  if (!isLoggedIn) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
  if (isLoggedIn && isChecked)
    pingAuth(state);
}

function logout (nextState, replaceState) {
  store.dispatch({ type: constants.LOG_OUT });
  replaceState({}, '/login');
}

class Root extends React.Component {
  static propTypes = {
    application: PropTypes.object.isRequired
  };

  render () {

    return (
      <div>{getRootChildren(this.props) }</div>
    );
  }
}

export default connect(({ application }) => ({ application }))(Root);
