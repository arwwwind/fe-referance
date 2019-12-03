import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as exports from '../../../utils/exports';
import PageContainer from '../../Page';
import Drawer from './Drawer';
import Table from '../../../components/Table';
import tableColumns from '../columns';
import { searchUserStart, fetchUserStart, singleUserStart } from '../actions';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import reducer from '../reducer';
import { pageSaga as saga } from '../saga';
import injectLoader from '../../../utils/injectLoader';

/**
 * Creates users page component
 * @class
 */
class Page extends Component {
  /**
   * Load users data
   * @function componentDidMount
   */
  componentDidMount() {
    this.props.fetchData();
  }

  /**
   * Get users data from search or fetch results
   * @function getData
   */
  getData = () => {
    const { users } = this.props;
    const hasSearchValue = !!users.get('search').get('searchValue');

    return (hasSearchValue ? users.get('search').get('results') : users.get('data')).toJS();
  };

  /**
   * Get users count
   * @function getUsersCount
   * @returns {number} number of users
   */
  getUsersCount = () => {
    const { users } = this.props;

    return users.get('data').size;
  };

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => {
    const users = this.props.users.toJS();

    return users.search.loading || users.fetch.loading;
  };

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => {
    const users = this.props.users.toJS();
    const fetchErrors = users.fetch.error;
    const searchErrors = users.search.error;
    return (fetchErrors || searchErrors) ? Object.assign({}, fetchErrors, searchErrors) : null;
  };

  /**
   * Handle user search
   * @function handleSearch
   * @param {String} value - search value
   * @returns {Function} onSearch from props
   */
  handleSearch = (value) => this.props.onSearch(value);

  /**
   * Render users component
   * @function render
   */
  render() {
    return (
      <PageContainer>
        <Helmet>
          <title>Users</title>
        </Helmet>
        <div className="juvo-main-container">
          <div className="juvo-main-content">
            <Drawer />
            <Table
              addBtnTitle="Add User"
              name="Users"
              count={this.getUsersCount()}
              onAdd={this.props.singleUserStart}
              onSearch={this.handleSearch}
              className="m-t-extra-sm"
              columns={tableColumns}
              data={this.getData()}
              loading={this.loadingTable()}
              errors={this.fetchTableErrors()}
              searchValue={this.props.users.get('search').get('searchValue')}
              exportTo={exports.to('user')}
            />
          </div>
        </div>
      </PageContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSearch: (value) => dispatch(searchUserStart(value)),
  fetchData: () => dispatch(fetchUserStart()),
  singleUserStart: () => dispatch(singleUserStart(null))
});

const mapStateToProps = (state) => ({
  users: state.get('users')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'usersPage', saga });
const withLoader = injectLoader();

export default compose(withReducer, withSaga, withConnect, withLoader)(Page);
export { mapDispatchToProps };

