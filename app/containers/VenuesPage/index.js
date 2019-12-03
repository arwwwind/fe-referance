import React from 'react';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import PageContainer from '../Page';
import VenuesSubpage from './Venues';
import JudgesSubpage from './Judges';
import injectLoader from '../../utils/injectLoader';

const VenuesPage = () => (
  <PageContainer>
    <Helmet>
      <title>Venues & Judges</title>
    </Helmet>
    <div className="juvo-main-container">
      <div className="juvo-main-content">
        <VenuesSubpage />
        <JudgesSubpage />
      </div>
    </div>
  </PageContainer>
);

const withLoader = injectLoader();

export default compose(withLoader)(VenuesPage);
