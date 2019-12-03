import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageContainer from '../../Page';
import Sidebar from '../../../components/Sidebar';
import BackToVenues from './BackToVenuesButton';
import Details from './Details';
import ButtonsGroup from './ButtonsGroup';
import Overview from './Overview';
import { CasesTable } from '../../CasesPage';
import JudgesTable from '../components/JudgesTable';
import { casesColumnsForEntities as casesColumns } from '../../CasesPage/columns';
import { getVenueId } from '../../../utils/router';
import { fetchSingleVenueStart, venueOverviewStart } from '../actions';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../utils/injectSaga';
import saga from '../saga';
import judgesColumns from '../judgesColumns';
import Preloader from '../../../components/Preloader';
import injectLoader from '../../../utils/injectLoader';

class VenueSinglePage extends React.Component {
  componentDidMount() {
    this.props.fetchData();
    this.props.getVenueOverview(this.props.venueId);
  }

  render() {
    return (
      <PageContainer>
        <Helmet>
          <title>Venue profile</title>
        </Helmet>
        <Sidebar cssClass="left">
          <BackToVenues />
          <Details />
        </Sidebar>
        <div className="juvo-main-container with-one-sidebar">
          <div className="juvo-main-content profile-case p-t-xl">
            <ButtonsGroup venueId={this.props.data.id} />
            {!this.props.overview.data || (this.props.overview.id !== this.props.venueId) ? (
              <Preloader />
            ) : (
              <Overview {...this.props.overview} />
            )}
            <CasesTable
              entity="venue"
              entityId={this.props.venueId}
              columns={casesColumns}
              addBtnTitle={false}
              name="Cases"
              onAdd={false}
              className="m-t-extra-sm entity-cases"
              exportTo={false}
            />
            <JudgesTable
              entity="venue"
              entityId={this.props.venueId}
              columns={judgesColumns}
              addBtnTitle={false}
              name="Judges"
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
  fetchData: () => dispatch(fetchSingleVenueStart()),
  getVenueOverview: (contactId) => dispatch(venueOverviewStart(contactId))
});

const mapStateToProps = (state) => ({
  venueId: getVenueId(state.get('route').get('location').get('pathname')),
  data: state.get('singleVenue').get('data').toJS(),
  loading: state.get('singleVenue').get('fetch').get('loading'),
  overview: { ...state.get('singleVenue').get('overview').toJS() },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'singleVenue', reducer });
const withSaga = injectSaga({ key: 'singleVenue', saga });
const withLoader = injectLoader();

export default compose(withReducer, withSaga, withConnect, withLoader)(VenueSinglePage);
