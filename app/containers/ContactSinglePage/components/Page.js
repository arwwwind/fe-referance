import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageContainer from '../../Page';
import Sidebar from '../../../components/Sidebar';
import BackToContacts from './BackToContactsButton';
import Details from './Details';
import ButtonsGroup from './ButtonsGroup';
import Overview from './Overview';
import Preloader from '../../../components/Preloader';
import { CasesTable } from '../../CasesPage';
import { casesColumnsForEntities as casesColumns } from '../../CasesPage/columns';
import { getContactId } from '../../../utils/router';
import { fetchSingleContactStart, contactOverviewStart } from '../actions';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../utils/injectSaga';
import saga from '../saga';
import injectLoader from '../../../utils/injectLoader';

class ContactSinglePage extends React.Component {
  componentDidMount() {
    this.props.fetchData(this.props.contactId);
    this.props.getContactOverview(this.props.contactId);
  }

  render() {
    return (
      <PageContainer>
        <Helmet>
          <title>Contact profile</title>
        </Helmet>
        <Sidebar cssClass="left">
          <BackToContacts />
          {!this.props.data || (this.props.data.id !== this.props.contactId) ? (
            <Preloader />
          ) : (
            <Details data={this.props.data} />
          )}
        </Sidebar>
        <div className="juvo-main-container with-one-sidebar">
          <div className="juvo-main-content profile-case p-t-xl">
            <ButtonsGroup contactId={this.props.data.id} />
            {!this.props.overview.data || (this.props.overview.id !== this.props.contactId) ? (
              <Preloader />
            ) : (
              <Overview {...this.props.overview} />
            )}
            <CasesTable
              entity="contact"
              entityId={this.props.contactId}
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
  fetchData: (contactId) => dispatch(fetchSingleContactStart(contactId)),
  getContactOverview: (contactId) => dispatch(contactOverviewStart(contactId))
});

const mapStateToProps = (state) => ({
  contactId: parseInt(getContactId(state.get('route').get('location').get('pathname')), 10),
  data: state.get('singleContact').get('data').toJS(),
  overview: { ...state.get('singleContact').get('overview').toJS() },
  loading: state.get('singleContact').get('fetch').get('loading')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'singleContact', reducer });
const withSaga = injectSaga({ key: 'singleContact', saga });
const withLoader = injectLoader();

export default compose(withReducer, withSaga, withConnect, withLoader)(ContactSinglePage);
