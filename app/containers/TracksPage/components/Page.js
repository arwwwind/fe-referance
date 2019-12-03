import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import PageContainer from '../../Page';
import TracksHeader from './TracksHeader';
import TracksContent from './TracksContent';
import injectLoader from '../../../utils/injectLoader';

class Page extends React.Component {
  render() {
    return (
      <PageContainer>
        <Helmet>
          <title>Tracks</title>
        </Helmet>
        <div className="juvo-main-container">
          <div className="juvo-main-content">
            <div className={'m-t-extra-sm juvo-table'}>
              <TracksHeader name="Tracks" />
              <TracksContent />
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
}

const withLoader = injectLoader();

export default compose(withLoader)(Page);
