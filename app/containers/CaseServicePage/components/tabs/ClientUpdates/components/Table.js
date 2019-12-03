import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Input, Pagination } from 'antd';
import tableColumns from '../columns';
import Table from '../../../../../../components/Table/Table';
import { fetchClientUpdateNewPage, fetchClientUpdateStart, searchClientUpdateStart, resetClientUpdatesData } from '../actions';
import injectReducer from '../../../../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../../../../utils/injectSaga';
import { pageSaga as saga } from '../saga';
import { DAEMON } from '../../../../../../utils/constants';
import AddClientUpdatesButton from './AddClientUpdatesButton';
import { stringToText } from '../../../../../../utils/common';

class ClientUpdatesTable extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  onChangeSearch = (e) => this.props.onSearchStart(e.target.value);

  /**
   * Get client updates count
   * @function getClientUpdatesCount
   * @returns {number} number of liens
   */
  getClientUpdatesCount = () => {
    const pager = this.props.clientUpdates.get('fetch').get('pager');
    return pager ? pager.get('totalItems') : null;
  };

  /**
   * Get client updates data from search or fetch results
   * @function getData
   */
  getData = () => this.props.clientUpdates.get('data').toJS();

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => {
    const { caseId, serviceId } = this.props.clientUpdates.toJS();

    if (this.props.caseId !== caseId || this.props.serviceId !== serviceId) {
      this.props.resetClientUpdatesData();
      return true;
    }
    return false;
  };

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => this.props.clientUpdates.toJS().fetch.error;

  render() {
    const fetch = this.props.clientUpdates.get('fetch');
    const pager = fetch.get('pager');
    const currentPage = fetch.get('currentPage');

    return (
      <div>
        <div className="stats-header m-b-extra-md">
          <div className="juvo-table-search flex-1">
            <Input.Search
              maxLength="150"
              size="small"
              placeholder="Search"
              onSearch={this.props.onSearchStart}
              onChange={this.onChangeSearch}
            />
          </div>
          <div className="group">
            <div>
              <div className="value small">{stringToText(this.props.lastUpdate)}</div>
              <div className="f-s-13">Last update</div>
            </div>
            <div>
              <div className="value small">{stringToText(this.props.nextUpdate)}</div>
              <div className="f-s-13">Next Update</div>
            </div>
            <div>
              <div className="value text-danger small">{stringToText(this.props.daysOverdue)}</div>
              <div className="f-s-13">Days Overdue</div>
            </div>
          </div>
          <AddClientUpdatesButton caseId={this.props.caseId} serviceId={this.props.serviceId} />
        </div>
        <Table
          columns={tableColumns}
          data={this.getData()}
          loading={this.loadingTable()}
          errors={this.fetchTableErrors()}
          name={false}
          count={this.getClientUpdatesCount()}
          onAdd={false}
          className="m-t-extra-sm"
          searchValue={this.props.clientUpdates.get('fetch').get('searchValue')}
          exportTo={false}
          {...this.props}
        />
        { (pager && this.getClientUpdatesCount()) ? <Pagination onChange={this.props.onPageChange} current={currentPage} total={pager.get('totalItems')} /> : null }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  resetClientUpdatesData: () => dispatch(resetClientUpdatesData()),
  onSearchStart: (searchValue) => dispatch(searchClientUpdateStart(props.caseId, props.serviceId, searchValue, props.entity, props.entityId)),
  fetchData: () => dispatch(fetchClientUpdateStart(props.caseId, props.serviceId, props.entity, props.entityId)),
  onPageChange: (page) => dispatch(fetchClientUpdateNewPage(props.caseId, props.serviceId, page, props.entity, props.entityId))
});

const mapStateToProps = (state) => {
  const statusClientUpdates = state.get('statusClientUpdates');
  return {
    lastUpdate: statusClientUpdates.get('lastUpdate'),
    nextUpdate: statusClientUpdates.get('nextUpdate'),
    daysOverdue: statusClientUpdates.get('daysOverdue'),
    clientUpdates: state.get('clientUpdates')
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'clientUpdates', reducer });
const withSaga = injectSaga({ key: 'clientUpdates', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(ClientUpdatesTable);
