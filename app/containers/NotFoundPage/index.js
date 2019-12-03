import React from 'react';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import Page from '../Page';
import injectLoader from '../../utils/injectLoader';

const NotFound = () => (
  <Page>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <div className="juvo-main-container">
      <div className="juvo-main-content">
        <h1>Page not found.</h1>
      </div>
    </div>
  </Page>
);

const withLoader = injectLoader();

export default compose(withLoader)(NotFound);
