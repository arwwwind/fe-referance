import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageContainer from '../../Page';
import BackButton from './BackButton';
import Metrics from './Metrics';
import ButtonsGroup from '../../ContactSinglePage/components/ButtonsGroup';
import { getContactId } from '../../../utils/router';
import injectLoader from '../../../utils/injectLoader';


class ContactSinglePageMetrics extends React.Component {
  render() {
    return (
      <PageContainer>
        <Helmet>
          <title>Contact Metrics</title>
        </Helmet>
        <div className="juvo-main-container">
          <div className="juvo-main-content profile-case">
            <div className="flex space-between align-items-center p-t-xl">
              <BackButton contactId={this.props.contactId} />
              <ButtonsGroup contactId={this.props.contactId} />
            </div>
            <Metrics />
          </div>
        </div>
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  contactId: getContactId(state.get('route').get('location').get('pathname'))
});

const withConnect = connect(mapStateToProps, null);
const withLoader = injectLoader();

export default compose(withConnect, withLoader)(ContactSinglePageMetrics);
