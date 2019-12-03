import React, { Component } from 'react';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import PageContainer from '../../Page';
import Drawer from './Drawer';
import TableCases from './Table';
import injectLoader from '../../../utils/injectLoader';

/**
 * Creates cases page component
 * @class
 */
class Page extends Component {
  render() {
    return (
      <PageContainer>
        <Helmet>
          <title>Cases</title>
        </Helmet>
        <div className="juvo-main-container">
          <div className="juvo-main-content">
            <Drawer />
            <TableCases showQuickView />
          </div>
        </div>
      </PageContainer>
    );
  }
}

const withLoader = injectLoader();

export default compose(withLoader)(Page);
