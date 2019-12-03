import React, { Component } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as exports from '../../../../utils/exports';
import Drawer from './Drawer';
import Table from '../../../../components/Table';
import tableColumns from '../columns';
import {
  searchJudgeStart,
  fetchJudgeStart,
  singleJudgeStart,
  fetchJudgeNewPage
} from '../actions';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import reducer from '../reducer';
import { pageSaga as saga } from '../saga';

/**
 * Creates judges page component
 * @class
 */
class Page extends Component {
  /**
   * Get judges data from search or fetch results
   * @function getData
   */
  getData = () => {
    return this.props.judges.get('data').toJS();
  };

  /**
   * Get judges count
   * @function getJudgesCount
   * @returns {number} number of judges
   */
  getJudgesCount = () => {
    const pager = this.props.judges.get('fetch').get('pager');
    return pager ? pager.get('totalItems') : null;
  };

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => {
    const judges = this.props.judges.toJS();

    return judges.search.loading || judges.fetch.loading;
  };

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => {
    const judges = this.props.judges.toJS();
    const fetchErrors = judges.fetch.error;
    const searchErrors = judges.search.error;
    return (fetchErrors || searchErrors) ? Object.assign({}, fetchErrors, searchErrors) : null;
  };

  /**
   * Handle judge search
   * @function handleSearch
   * @param {String} value - search value
   * @returns {Function} onSearch from props
   */
  handleSearch = (value) => this.props.onSearch(value);

  /**
   * Render judges component
   * @function render
   */
  render() {
    const fetch = this.props.judges.get('fetch');
    const pager = fetch.get('pager');
    const currentPage = fetch.get('currentPage');

    return (
      <div className="judges-component p-t-md">
        <Drawer />
        <Table
          addBtnTitle="Add Judge"
          name="Judges"
          count={this.getJudgesCount()}
          onAdd={this.props.singleJudgeStart}
          onSearch={this.handleSearch}
          className="m-t-extra-sm"
          columns={tableColumns}
          data={this.getData()}
          loading={this.loadingTable()}
          errors={this.fetchTableErrors()}
          searchValue={this.props.judges.get('search').get('searchValue')}
          exportTo={exports.to('judge')}
        />
        { (pager && this.getJudgesCount()) ? <Pagination onChange={this.props.onPageChange} current={currentPage} total={pager.get('totalItems')} /> : null }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSearch: (value) => dispatch(searchJudgeStart(value)),
  fetchData: () => dispatch(fetchJudgeStart()),
  singleJudgeStart: () => dispatch(singleJudgeStart(null)),
  onPageChange: (number) => dispatch(fetchJudgeNewPage(number))
});

const mapStateToProps = (state) => ({
  judges: state.get('judges')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'judges', reducer });
const withSaga = injectSaga({ key: 'judgesPage', saga });

export default compose(withReducer, withSaga, withConnect)(Page);
export { mapDispatchToProps };
