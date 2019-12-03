import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Pagination } from 'antd';
import moment from 'moment';
import PageContainer from '../../Page';
import Table from '../../../components/Table/Table';
import { fetchNotificationsNewPage } from '../actions';
import reducer from '../reducer';
import { saga } from '../saga';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';

const columns = [
  {
    Header: () => null,
    id: 'notification',
    accessor: (row) => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{row.name}</div>
        <div>{moment(row.createdAt).format('L, HH:MM:SS')}</div>
      </div>
    )
  }
];

const SubComponent = {
  component: (row) => (<iframe className="note-email-iframe" title="note-email-content" src={`data:text/html, ${encodeURIComponent(row.original.content)}`} />)
};

class Notifications extends React.Component {
  /**
   * Get notifications data from search or fetch results
   * @function getData
   */
  getData = () => this.props.notifications.get('data').toJS();

  /**
   * Get notifications count
   * @function getNotificationsCount
   * @returns {number} number of notifications
   */
  getNotificationsCount = () => {
    const pager = this.props.notifications.get('fetch').get('pager');
    return pager ? pager.get('totalItems') : null;
  };

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => {
    const notifications = this.props.notifications.toJS();

    return notifications.fetch.loading;
  };

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => {
    const notifications = this.props.notifications.toJS();
    const fetchErrors = notifications.fetch.error;
    return fetchErrors || null;
  };

  render() {
    const fetch = this.props.notifications.get('fetch');
    const pager = fetch.get('pager');
    const currentPage = fetch.get('currentPage');

    return (
      <PageContainer>
        <Helmet>
          <title>Notifications</title>
        </Helmet>
        <div className="juvo-main-container">
          <div className="juvo-main-content">
            <Table
              noDataText="No notifications recorded"
              className="notifications-table m-t-extra-sm"
              columns={columns}
              data={this.getData()}
              SubComponent={SubComponent}
              errors={this.fetchTableErrors()}
              loading={this.loadingTable()}
              count={this.getNotificationsCount()}
            />
            { (pager && this.getNotificationsCount()) ? <Pagination onChange={this.props.onPageChange} current={currentPage} total={pager.get('totalItems')} /> : null }
          </div>
        </div>
      </PageContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onPageChange: (page) => dispatch(fetchNotificationsNewPage(page))
});

const mapStateToProps = (state) => ({
  notifications: state.get('notifications')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'notifications', reducer });
const withSaga = injectSaga({ key: 'notifications', saga });

export default compose(withReducer, withSaga, withConnect)(Notifications);
