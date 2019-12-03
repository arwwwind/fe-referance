import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Pagination } from 'antd';
import * as exports from '../../../../utils/exports';
import Drawer from './Drawer';
import Table from '../../../../components/Table';
import tableColumns from '../columns';
import {
  searchVenueStart,
  fetchVenueStart,
  singleVenueStart,
  fetchVenueNewPage
} from '../actions';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import reducer from '../reducer';
import { pageSaga as saga } from '../saga';

/**
 * Creates venues page component
 * @class
 */
class Page extends Component {
  /**
   * Get venues data from search or fetch results
   * @function getData
   */
  getData = () => {
    return this.props.venues.get('data').toJS();
  };

  /**
   * Get venues count
   * @function getVenuesCount
   * @returns {number} number of venues
   */
  getVenuesCount = () => {
    const pager = this.props.venues.get('fetch').get('pager');
    return pager ? pager.get('totalItems') : null;
  };

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => {
    const venues = this.props.venues.toJS();

    return venues.search.loading || venues.fetch.loading;
  };

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => {
    const venues = this.props.venues.toJS();
    const fetchErrors = venues.fetch.error;
    const searchErrors = venues.search.error;
    return (fetchErrors || searchErrors) ? Object.assign({}, fetchErrors, searchErrors) : null;
  };

  /**
   * Handle venue search
   * @function handleSearch
   * @param {String} value - search value
   * @returns {Function} onSearch from props
   */
  handleSearch = (value) => this.props.onSearch(value);

  /**
   * Render venues component
   * @function render
   */
  render() {
    const fetch = this.props.venues.get('fetch');
    const pager = fetch.get('pager');
    const currentPage = fetch.get('currentPage');

    return (
      <div className="venues-component">
        <Drawer />
        <Table
          addBtnTitle="Add Venue"
          name="Venues"
          count={this.getVenuesCount()}
          onAdd={this.props.singleVenueStart}
          onSearch={this.handleSearch}
          className="m-t-extra-sm"
          columns={tableColumns}
          data={this.getData()}
          loading={this.loadingTable()}
          errors={this.fetchTableErrors()}
          searchValue={this.props.venues.get('search').get('searchValue')}
          exportTo={exports.to('venue')}
        />
        { (pager && this.getVenuesCount()) ? <Pagination onChange={this.props.onPageChange} current={currentPage} total={pager.get('totalItems')} /> : null }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSearch: (value) => dispatch(searchVenueStart(value)),
  fetchData: () => dispatch(fetchVenueStart()),
  singleVenueStart: () => dispatch(singleVenueStart(null)),
  onPageChange: (number) => dispatch(fetchVenueNewPage(number))
});

const mapStateToProps = (state) => ({
  venues: state.get('venues')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'venues', reducer });
const withSaga = injectSaga({ key: 'venuesPage', saga });

export default compose(withReducer, withSaga, withConnect)(Page);
export { mapDispatchToProps };

