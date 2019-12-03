// import config file
import config from 'config';

// Needed for redux-saga es6 generator support
import 'babel-polyfill';
import Raven from 'raven-js';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Load the favicon
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.png';
/* eslint-enable import/no-webpack-loader-syntax */

// Import CSS reset and Global Styles
import 'styles/theme.scss';

import configureStore from './configureStore';

import axios, { NOT_AUTHENTICATED } from './axios';
import { is401 } from './utils/errors';

// Install Sentry
Raven.config(config.raven.ravenUrl, {
  whitelistUrls: config.raven.whitelistUrls
}).install();


// Observe loading of Lato font
const openSansObserver = new FontFaceObserver('Lato', {});

// When Lato is loaded, add a font-family using Lato to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

axios.interceptors.response.use((response) => (response), (error) => {
  if (is401(error)) {
    store.dispatch({
      type: NOT_AUTHENTICATED,
      payload: error,
    });
  }

  return Promise.reject(error);
});

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      {/* <LanguageProvider messages={messages}> */}
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
      {/* </LanguageProvider> */}
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
