import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Pagination } from 'antd';
import * as exports from '../../../../../../utils/exports';
import Drawer from './Drawer';
import Table from '../../../../../../components/Table';
import tableColumns from '../columns';
import {
  searchPartnerCompanyStart,
  fetchPartnerCompanyStart,
  singlePartnerCompanyStart,
  fetchPartnerCompanyNewPage
} from '../actions';
import injectReducer from '../../../../../../utils/injectReducer';
import injectSaga from '../../../../../../utils/injectSaga';
import reducer from '../reducer';
import { pageSaga as saga } from '../saga';

/**
 * Creates partnerCompanies page component
 * @class
 */
class Page extends Component {
  /**
   * Load partnerCompanies data
   * @function componentDidMount
   */
  componentDidMount() {
    this.props.fetchData();
  }

  /**
   * Get partnerCompanies data from search or fetch results
   * @function getData
   */
  getData = () => {
    return this.props.partnerCompanies.get('data').toJS();
  };

  /**
   * Get partnerCompanies count
   * @function getPartnerCompaniesCount
   * @returns {number} number of partnerCompanies
   */
  getPartnerCompaniesCount = () => {
    const pager = this.props.partnerCompanies.get('fetch').get('pager');
    return pager ? pager.get('totalItems') : null;
  };

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => {
    const partnerCompanies = this.props.partnerCompanies.toJS();

    return partnerCompanies.search.loading || partnerCompanies.fetch.loading;
  };

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => {
    const partnerCompanies = this.props.partnerCompanies.toJS();
    const fetchErrors = partnerCompanies.fetch.error;
    const searchErrors = partnerCompanies.search.error;
    return (fetchErrors || searchErrors) ? Object.assign({}, fetchErrors, searchErrors) : null;
  };

  /**
   * Handle partnerCompany search
   * @function handleSearch
   * @param {String} value - search value
   * @returns {Function} onSearch from props
   */
  handleSearch = (value) => this.props.onSearch(value);

  /**
   * Render partnerCompanies component
   * @function render
   */
  render() {
    const fetch = this.props.partnerCompanies.get('fetch');
    const pager = fetch.get('pager');
    const currentPage = fetch.get('currentPage');

    return (
      <div className="partnerCompanies-component">
        <Drawer />
        <Table
          addBtnTitle="Add Partner Company"
          count={this.getPartnerCompaniesCount()}
          onAdd={this.props.singlePartnerCompanyStart}
          onSearch={this.handleSearch}
          className="juvo-simple-table p-md"
          columns={tableColumns}
          data={this.getData()}
          loading={this.loadingTable()}
          errors={this.fetchTableErrors()}
          searchValue={this.props.partnerCompanies.get('search').get('searchValue')}
        />
        { (pager && this.getPartnerCompaniesCount()) ? <Pagination style={{paddingLeft: '15px'}} onChange={this.props.onPageChange} current={currentPage} total={pager.get('totalItems')} /> : null }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSearch: (value) => dispatch(searchPartnerCompanyStart(value)),
  fetchData: () => dispatch(fetchPartnerCompanyStart()),
  singlePartnerCompanyStart: () => dispatch(singlePartnerCompanyStart(null)),
  onPageChange: (number) => dispatch(fetchPartnerCompanyNewPage(number))
});

const mapStateToProps = (state) => ({
  partnerCompanies: state.get('partnerCompanies')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'partnerCompanies', reducer });
const withSaga = injectSaga({ key: 'partnerCompaniesPage', saga });

export default compose(withReducer, withSaga, withConnect)(Page);
export { mapDispatchToProps };

