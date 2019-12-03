import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Pagination } from 'antd';
import tableColumns from '../judgesColumns';
import Table from '../../../components/Table/Table';
import { fetchJudgeNewPage, fetchJudgeStart, searchJudgeStart, singleJudgeStart, resetJudgesData } from '../actions';
import * as exports from '../../../utils/exports';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../utils/injectSaga';
import saga from '../saga';
import { DAEMON } from '../../../utils/constants';

class JudgesTable extends React.Component {
  componentDidMount() {
    this.props.resetJudgesData();
    this.props.fetchData();
  }

  /**
   * Get judges count
   * @function getJudgesCount
   * @returns {number} number of judges
   */
  getJudgesCount = () => {
    const pager = this.props.judges.get('judgesFetch').get('pager');
    return pager ? pager.get('totalItems') : null;
  };

  /**
   * Get judges data from search or fetch results
   * @function getData
   */
  getData = () => this.props.judges.get('judgesFetch').get('data').toJS();

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => this.props.judges.toJS().fetch.loading;

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => this.props.judges.toJS().fetch.error;

  render() {
    const fetch = this.props.judges.get('judgesFetch');
    const pager = fetch.get('pager');
    const currentPage = fetch.get('currentPage');

    return (
      <div>
        <Table
          columns={tableColumns}
          data={this.getData()}
          loading={this.loadingTable()}
          errors={this.fetchTableErrors()}
          addBtnTitle="Add Judge"
          name="Judges"
          count={this.getJudgesCount()}
          onAdd={this.props.singleJudgeStart}
          className="m-t-extra-sm"
          searchValue={this.props.judges.get('judgesFetch').get('searchValue')}
          exportTo={exports.to('judge')}
          {...this.props}
        />
        { (pager && this.getJudgesCount()) ? <Pagination onChange={this.props.onPageChange} current={currentPage} total={pager.get('totalItems')} /> : null }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  resetJudgesData: () => dispatch(resetJudgesData()),
  onSearch: (searchValue) => dispatch(searchJudgeStart(searchValue, props.entity, props.entityId)),
  fetchData: () => dispatch(fetchJudgeStart(props.entity, props.entityId)),
  singleJudgeStart: () => dispatch(singleJudgeStart(null)),
  onPageChange: (page) => dispatch(fetchJudgeNewPage(page, props.entity, props.entityId))
});

const mapStateToProps = (state) => ({
  judges: state.get('singleVenue')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'singleVenue', reducer });
const withSaga = injectSaga({ key: 'singleVenue', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(JudgesTable);
