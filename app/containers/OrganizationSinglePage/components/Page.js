import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageContainer from '../../Page';
import Sidebar from '../../../components/Sidebar';
import BackToOrganizations from './BackToOrganizationsButton';
import ButtonsGroup from './ButtonsGroup';
import Overview from './Overview';
import Details from './Details';
import { CasesTable } from '../../CasesPage';
import { casesColumnsForEntities as casesColumns } from '../../CasesPage/columns';
import { getOrganizationId } from '../../../utils/router';
import { fetchSingleOrganizationStart, organizationOverviewStart } from '../actions';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../utils/injectSaga';
import saga from '../saga';
import Preloader from '../../../components/Preloader';
import injectLoader from '../../../utils/injectLoader';

class OrganizationSinglePage extends React.Component {
  componentDidMount() {
    this.props.fetchData();
    this.props.getOrganizationOverview(this.props.organizationId);
  }

  render() {
    return (
      <PageContainer>
        <Helmet>
          <title>Organization profile</title>
        </Helmet>
        <Sidebar cssClass="left">
          <BackToOrganizations />
          {!this.props.data || (this.props.data.id !== this.props.organizationId) ? (
            <Preloader />
          ) : (
            <Details data={this.props.data} />
          )}
        </Sidebar>
        <div className="juvo-main-container with-one-sidebar">
          <div className="juvo-main-content profile-case p-t-xl">
            <ButtonsGroup organizationId={this.props.data.id} />
            {!this.props.overview.data || (this.props.overview.id !== this.props.organizationId) ? (
              <Preloader />
            ) : (
              <Overview {...this.props.overview} />
            )}
            <CasesTable
              entity="organisation"
              entityId={this.props.organizationId}
              columns={casesColumns}
              addBtnTitle={false}
              name="Cases"
              onAdd={false}
              className="m-t-extra-sm entity-cases"
              exportTo={false}
            />
          </div>
        </div>
      </PageContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchSingleOrganizationStart()),
  getOrganizationOverview: (organizationId) => dispatch(organizationOverviewStart(organizationId))
});

const mapStateToProps = (state) => ({
  organizationId: parseInt(getOrganizationId(state.get('route').get('location').get('pathname')), 10),
  data: state.get('singleOrganization').get('data').toJS(),
  overview: { ...state.get('singleOrganization').get('overview').toJS() },
  loading: state.get('singleOrganization').get('fetch').get('loading')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'singleOrganization', reducer });
const withSaga = injectSaga({ key: 'singleOrganization', saga });
const withLoader = injectLoader();

export default compose(withReducer, withSaga, withConnect, withLoader)(OrganizationSinglePage);
