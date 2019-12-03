import React from 'react';
import { Helmet } from 'react-helmet';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from '../../../components/Preloader';
import ButtonsGroup from '../../CaseSinglePage/components/ButtonsGroup';
import ServiceView from './tabs/ServiceView';
import ServicePerformance from './tabs/ServicePerformance';
import ServicePersonEvents from './tabs/ServicePersonEvents/';
import ServicePartnerCompanies from './tabs/ServicePartnerCompanies/';
import ServiceClientUpdates from './tabs/ServiceClientUpdates';
import CaseWrapper from '../../CaseWrapper';
import BackButton from './BackButton';
import { fetchServiceStart } from '../actions';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../utils/injectSaga';
import saga from '../saga';
import { getServiceId } from '../../../utils/router';
import injectLoader from '../../../utils/injectLoader';
import RedDot from './tabs/ClientUpdates/components/RedDotClientUpdates';

class Page extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <CaseWrapper sidebarOptions="service" className="p-l-0 p-r-0">
        <Helmet>
          <title>Service profile</title>
        </Helmet>
        <ButtonsGroup editService className="p-l-md p-r-md">
          <BackButton />
        </ButtonsGroup>
        {
          this.props.invalid ?
            <Preloader /> :
            <Tabs defaultActiveKey="1" className="service-tabs">
              <Tabs.TabPane tab="Service View" key="1">
                <ServiceView service={this.props.data} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Performance" key="2">
                <ServicePerformance caseId={this.props.data.get('caseId')} serviceId={this.props.data.get('id')} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="In Person Events" key="3">
                <ServicePersonEvents />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Partner Companies" key="4">
                <ServicePartnerCompanies />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span><RedDot />Client Updates</span>} key="5">
                <ServiceClientUpdates />
              </Tabs.TabPane>
            </Tabs>
        }
      </CaseWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchServiceStart())
});

const mapStateToProps = (state) => ({
  data: state.get('service').get('data'),
  loading: state.get('service').get('fetch').get('loading'),
  invalid: !state.get('service').get('data') || (state.get('service').get('data').get('id') !== parseInt(getServiceId(state.get('route').get('location').get('pathname')), 10))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'service', reducer });
const withSaga = injectSaga({ key: 'service', saga });
const withLoader = injectLoader();

export default compose(withReducer, withSaga, withConnect, withLoader)(Page);
