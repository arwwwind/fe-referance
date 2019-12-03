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
  searchContactStart,
  fetchContactStart,
  singleContactStart,
  fetchContactNewPage
} from '../actions';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import reducer from '../reducer';
import { pageSaga as saga } from '../saga';
import injectLoader from '../../../utils/injectLoader';
import QuickView from '../components/QuickView';

/**
 * Creates contacts page component
 * @class
 */
class Page extends Component {
  state = {
    sortId: undefined,
    sortOrder: undefined
  };

  /**
   * Get contacts data from search or fetch results
   * @function getData
   */
  getData = () => {
    return this.props.contacts.get('data').toJS();
  };

  /**
   * Get contacts count
   * @function getContactsCount
   * @returns {number} number of contacts
   */
  getContactsCount = () => {
    const pager = this.props.contacts.get('fetch').get('pager');
    return pager ? pager.get('totalItems') : null;
  };

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => {
    const contacts = this.props.contacts.toJS();

    return contacts.search.loading || contacts.fetch.loading;
  };

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => {
    const contacts = this.props.contacts.toJS();
    const fetchErrors = contacts.fetch.error;
    const searchErrors = contacts.search.error;
    return (fetchErrors || searchErrors) ? Object.assign({}, fetchErrors, searchErrors) : null;
  };

  /**
   * Handle contact search
   * @function handleSearch
   * @param {String} value - search value
   * @returns {Function} onSearch from props
   */
  handleSearch = (value) => this.props.onSearch(value, this.sortId, this.sortOrder);

  onFetchData = ({ pageSize, page, sorted }) => {
    if (sorted && sorted.length) {
      this.sortId = sorted[0].id;
      this.sortOrder = sorted[0].desc ? 'DESC' : 'ASC';

      this.setState({
        sortId: this.sortId,
        sortOrder: this.sortOrder
      });
    }

    this.props.fetchData(this.sortId, this.sortOrder);
  };

  handlePageChange = (number) => this.props.onPageChange(number, this.sortId, this.sortOrder);

  /**
   * Render contacts component
   * @function render
   */
  render() {
    const fetch = this.props.contacts.get('fetch');
    const pager = fetch.get('pager');
    const currentPage = fetch.get('currentPage');

    return (
      <PageContainer>
        <Helmet>
          <title>Contacts</title>
        </Helmet>
        <div className="juvo-main-container">
          <div className="juvo-main-content">
            <Drawer />
            <Table
              quickView={<QuickView sortId={this.state.sortId} sortOrder={this.state.sortOrder} />}
              addBtnTitle="Add Contact"
              name="Contacts"
              onFetchData={this.onFetchData}
              count={this.getContactsCount()}
              onAdd={this.props.singleContactStart}
              onSearch={this.handleSearch}
              className="m-t-extra-sm"
              columns={tableColumns}
              data={this.getData()}
              loading={this.loadingTable()}
              errors={this.fetchTableErrors()}
              searchValue={this.props.contacts.get('search').get('searchValue')}
              exportTo={exports.to('contact')}
              sortable
            />
            { (pager && this.getContactsCount()) ? <Pagination onChange={this.handlePageChange} current={currentPage} total={pager.get('totalItems')} /> : null }
          </div>
        </div>
      </PageContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSearch: (value, sortId, sortOrder) => dispatch(searchContactStart(value, sortId, sortOrder)),
  fetchData: (sortId, sortOrder) => dispatch(fetchContactStart(sortId, sortOrder)),
  singleContactStart: () => dispatch(singleContactStart(null)),
  onPageChange: (number, sortId, sortOrder) => dispatch(fetchContactNewPage(number, sortId, sortOrder))
});

const mapStateToProps = (state) => ({
  contacts: state.get('contacts')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'contacts', reducer });
const withSaga = injectSaga({ key: 'contactsPage', saga });
const withLoader = injectLoader();

export default compose(withReducer, withSaga, withConnect, withLoader)(Page);
export { mapDispatchToProps };
