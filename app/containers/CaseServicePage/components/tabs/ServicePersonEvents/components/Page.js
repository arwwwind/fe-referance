import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Pagination } from 'antd';
import * as exports from '../../../../../../utils/exports';
import Drawer from './Drawer';
import Table from '../../../../../../components/Table';
import tableColumns from '../columns';
import {
  searchPersonEventsStart,
  fetchPersonEventsStart,
  singlePersonEventsStart,
  fetchPersonEventsNewPage
} from '../actions';
import injectReducer from '../../../../../../utils/injectReducer';
import injectSaga from '../../../../../../utils/injectSaga';
import reducer from '../reducer';
import { pageSaga as saga } from '../saga';

/**
 * Creates personEvents page component
 * @class
 */
class Page extends Component {
  /**
   * Load personEvents data
   * @function componentDidMount
   */
  componentDidMount() {
    this.props.fetchData();
  }

  /**
   * Get personEvents data from search or fetch results
   * @function getData
   */
  getData = () => {
    return this.props.personEvents.get('data').toJS();
  };

  /**
   * Get personEvents count
   * @function getPersonEventsCount
   * @returns {number} number of personEvents
   */
  getPersonEventsCount = () => {
    const pager = this.props.personEvents.get('fetch').get('pager');
    return pager ? pager.get('totalItems') : null;
  };

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => {
    const personEvents = this.props.personEvents.toJS();

    return personEvents.search.loading || personEvents.fetch.loading;
  };

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => {
    const personEvents = this.props.personEvents.toJS();
    const fetchErrors = personEvents.fetch.error;
    const searchErrors = personEvents.search.error;
    return (fetchErrors || searchErrors) ? Object.assign({}, fetchErrors, searchErrors) : null;
  };

  /**
   * Handle personEvents search
   * @function handleSearch
   * @param {String} value - search value
   * @returns {Function} onSearch from props
   */
  handleSearch = (value) => this.props.onSearch(value);

  /**
   * Render personEvents component
   * @function render
   */
  render() {
    const fetch = this.props.personEvents.get('fetch');
    const pager = fetch.get('pager');
    const currentPage = fetch.get('currentPage');

    return (
      <div className="personEvents-component">
        <Drawer onCalendar={false} />
        <Table
          addBtnTitle="Add Person Event"
          count={this.getPersonEventsCount()}
          onAdd={this.props.singlePersonEventsStart}
          onSearch={this.handleSearch}
          className="juvo-simple-table p-md"
          columns={tableColumns}
          data={this.getData()}
          loading={this.loadingTable()}
          errors={this.fetchTableErrors()}
          searchValue={this.props.personEvents.get('search').get('searchValue')}
        />
        { (pager && this.getPersonEventsCount()) ? <Pagination style={{paddingLeft: '15px'}} onChange={this.props.onPageChange} current={currentPage} total={pager.get('totalItems')} /> : null }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSearch: (value) => dispatch(searchPersonEventsStart(value)),
  fetchData: () => dispatch(fetchPersonEventsStart()),
  singlePersonEventsStart: () => dispatch(singlePersonEventsStart(null)),
  onPageChange: (number) => dispatch(fetchPersonEventsNewPage(number))
});

const mapStateToProps = (state) => ({
  personEvents: state.get('personEvents')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'personEvents', reducer });
const withSaga = injectSaga({ key: 'personEventsPage', saga });

export default compose(withReducer, withSaga, withConnect)(Page);
export { mapDispatchToProps };

