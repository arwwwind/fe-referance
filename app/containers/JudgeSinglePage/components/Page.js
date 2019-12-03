import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageContainer from '../../Page';
import BackToJudges from './BackToJudgesButton';
import Details from './Details';
import ButtonsGroup from './ButtonsGroup';
import Overview from './Overview';
import { CasesTable } from '../../CasesPage';
import { casesColumnsForEntities as casesColumns } from '../../CasesPage/columns';
import { getJudgeId } from '../../../utils/router';
import { fetchSingleJudgeStart, judgeOverviewStart } from '../actions';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../utils/injectSaga';
import saga from '../saga';
import Preloader from '../../../components/Preloader';
import injectLoader from '../../../utils/injectLoader';

class JudgeSinglePage extends React.Component {
  componentDidMount() {
    this.props.fetchData();
    this.props.getJudgeOverview(this.props.judgeId);
  }

  render() {
    return (
      <PageContainer>
        <Helmet>
          <title>Judge Profile</title>
        </Helmet>
        <div className="juvo-main-container">
          <div className="juvo-main-content">
            <div style={{ display: 'flex' }}>
              <div style={{ minWidth: '200px' }}>
                <BackToJudges />
                <Details />
              </div>
              <div style={{ width: '100%' }} className="p-t-xl profile-case">
                <ButtonsGroup judgeId={this.props.data.id} />
                {!this.props.overview.data || (this.props.overview.id !== this.props.judgeId) ? (
                  <Preloader />
                ) : (
                  <Overview {...this.props.overview} />
                )}
              </div>
            </div>
            <CasesTable
              entity="judge"
              entityId={this.props.judgeId}
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
  fetchData: () => dispatch(fetchSingleJudgeStart()),
  getJudgeOverview: (contactId) => dispatch(judgeOverviewStart(contactId))
});

const mapStateToProps = (state) => ({
  judgeId: parseInt(getJudgeId(state.get('route').get('location').get('pathname')), 10),
  data: state.get('singleJudge').get('data').toJS(),
  loading: state.get('singleJudge').get('fetch').get('loading'),
  overview: { ...state.get('singleJudge').get('overview').toJS() },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'singleJudge', reducer });
const withSaga = injectSaga({ key: 'singleJudge', saga });
const withLoader = injectLoader();

export default compose(withReducer, withSaga, withConnect, withLoader)(JudgeSinglePage);
