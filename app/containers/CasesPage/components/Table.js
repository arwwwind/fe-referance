import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Pagination } from 'antd';
import tableColumns from '../columns';
import Table from '../../../components/Table/Table';
import { fetchCaseNewPage, fetchCaseStart, searchCaseStart, singleCaseStart, resetCasesData } from '../actions';
import * as exports from '../../../utils/exports';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../utils/injectSaga';
import { pageSaga as saga } from '../saga';
import { DAEMON } from '../../../utils/constants';
import QuickView from './QuickView';

class CasesTable extends React.Component {
  componentDidMount() {
    this.props.resetCasesData();
    this.props.fetchData();
  }

  /**
   * Get cases count
   * @function getCasesCount
   * @returns {number} number of cases
   */
  getCasesCount = () => {
    const pager = this.props.cases.get('fetch').get('pager');
    return pager ? pager.get('totalItems') : null;
  };

  /**
   * Get cases data from search or fetch results
   * @function getData
   */
  getData = () => this.props.cases.get('data').toJS();

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => this.props.cases.toJS().fetch.loading;

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => this.props.cases.toJS().fetch.error;

  render() {
    const fetch = this.props.cases.get('fetch');
    const pager = fetch.get('pager');
    const currentPage = fetch.get('currentPage');

    return (
      <div>
        <Table
          quickView={this.props.showQuickView ? <QuickView /> : null}
          columns={tableColumns}
          data={this.getData()}
          loading={this.loadingTable()}
          errors={this.fetchTableErrors()}
          addBtnTitle="Add Case"
          name="Cases"
          count={this.getCasesCount()}
          onAdd={this.props.singleCaseStart}
          className="m-t-extra-sm"
          searchValue={this.props.cases.get('fetch').get('searchValue')}
          exportTo={exports.to('case')}
          {...this.props}
        />
        { (pager && this.getCasesCount()) ? <Pagination onChange={this.props.onPageChange} current={currentPage} total={pager.get('totalItems')} /> : null }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  resetCasesData: () => dispatch(resetCasesData()),
  onSearch: (searchValue) => dispatch(searchCaseStart(searchValue, props.entity, props.entityId)),
  fetchData: () => dispatch(fetchCaseStart(props.entity, props.entityId)),
  singleCaseStart: () => dispatch(singleCaseStart(null)),
  onPageChange: (page) => dispatch(fetchCaseNewPage(page, props.entity, props.entityId))
});

const mapStateToProps = (state) => ({
  cases: state.get('cases')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'cases', reducer });
const withSaga = injectSaga({ key: 'cases', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(CasesTable);
