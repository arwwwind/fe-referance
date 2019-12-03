import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Pagination } from 'antd';
import * as exports from '../../../utils/exports';
import PageContainer from '../../Page';
import Drawer from './Drawer';
import Table from '../../../components/Table';
import tableColumns from '../columns';
import {
  searchOrganizationStart,
  fetchOrganizationStart,
  singleOrganizationStart,
  fetchOrganizationNewPage,
} from '../actions';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import reducer from '../reducer';
import { pageSaga as saga } from '../saga';
import injectLoader from '../../../utils/injectLoader';

/**
 * Creates organizations page component
 * @class
 */
class Page extends Component {
  /**
   * Load organizations data
   * @function componentDidMount
   */
  componentDidMount() {
    this.props.fetchData();
  }

  /**
   * Get organizations data from search or fetch results
   * @function getData
   */
  getData = () => {
    return this.props.organizations.get('data').toJS();
  };

  /**
   * Get organizations count
   * @function getOrganizationsCount
   * @returns {number} number of organizations
   */
  getOrganizationsCount = () => {
    const pager = this.props.organizations.get('fetch').get('pager');
    return pager ? pager.get('totalItems') : null;
  };

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => {
    const organizations = this.props.organizations.toJS();

    return organizations.search.loading || organizations.fetch.loading;
  };

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => {
    const organizations = this.props.organizations.toJS();
    const fetchErrors = organizations.fetch.error;
    const searchErrors = organizations.search.error;
    return (fetchErrors || searchErrors) ? Object.assign({}, fetchErrors, searchErrors) : null;
  };

  /**
   * Handle organization search
   * @function handleSearch
   * @param {String} value - search value
   * @returns {Function} onSearch from props
   */
  handleSearch = (value) => this.props.onSearch(value);

  /**
   * Render organizations component
   * @function render
   */
  render() {
    const fetch = this.props.organizations.get('fetch');
    const pager = fetch.get('pager');
    const currentPage = fetch.get('currentPage');

    return (
      <PageContainer>
        <Helmet>
          <title>Organizations</title>
        </Helmet>
        <div className="juvo-main-container">
          <div className="juvo-main-content">
            <Drawer />
            <Table
              addBtnTitle="Add Organization"
              name="Organizations"
              count={this.getOrganizationsCount()}
              onAdd={this.props.singleOrganizationStart}
              onSearch={this.handleSearch}
              className="m-t-extra-sm"
              columns={tableColumns}
              data={this.getData()}
              loading={this.loadingTable()}
              errors={this.fetchTableErrors()}
              searchValue={this.props.organizations.get('search').get('searchValue')}
              exportTo={exports.to('organisation')}
              sortable
            />
            { (pager && this.getOrganizationsCount()) ? <Pagination onChange={this.props.onPageChange} current={currentPage} total={pager.get('totalItems')} /> : null }
          </div>
        </div>
      </PageContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSearch: (value) => dispatch(searchOrganizationStart(value)),
  fetchData: () => dispatch(fetchOrganizationStart()),
  singleOrganizationStart: () => dispatch(singleOrganizationStart(null)),
  onPageChange: (number) => dispatch(fetchOrganizationNewPage(number))
});

const mapStateToProps = (state) => ({
  organizations: state.get('organizations')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'organizations', reducer });
const withSaga = injectSaga({ key: 'organizationsPage', saga });
const withLoader = injectLoader();

export default compose(withReducer, withSaga, withConnect, withLoader)(Page);
export { mapDispatchToProps };
