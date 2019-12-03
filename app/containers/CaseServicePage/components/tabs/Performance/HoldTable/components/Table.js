import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Input, Pagination } from 'antd';
import tableColumns from '../columns';
import Table from '../../../../../../../components/Table/Table';
import { fetchHoldServiceNewPage, fetchHoldServiceStart, searchHoldServiceStart, resetHoldServicesData } from '../actions';
import injectReducer from '../../../../../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../../../../../utils/injectSaga';
import { pageSaga as saga } from '../saga';
import { DAEMON } from '../../../../../../../utils/constants';

class HoldServicesTable extends React.Component {
  componentDidMount() {
    this.props.resetHoldServicesData();
    this.props.fetchData();
  }

  /**
   * Get client updates count
   * @function getHoldServicesCount
   * @returns {number} number of liens
   */
  getHoldServicesCount = () => {
    const pager = this.props.holdServices.get('fetch').get('pager');
    return pager ? pager.get('totalItems') : null;
  };

  onChangeSearch = (e) => this.props.onSearchStart(e.target.value);

  /**
   * Get client updates data from search or fetch results
   * @function getData
   */
  getData = () => this.props.holdServices.get('data').toJS();

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => this.props.holdServices.toJS().fetch.loading;

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => this.props.holdServices.toJS().fetch.error;

  render() {
    const fetch = this.props.holdServices.get('fetch');
    const pager = fetch.get('pager');
    const currentPage = fetch.get('currentPage');

    return (
      <div>
        <div className="m-t-xxl p-md">
          <div className="juvo-table-search m-b-xxl">
            <Input.Search
              maxLength="150"
              size="small"
              placeholder="Search"
              onSearch={this.props.onSearchStart}
              onChange={this.onChangeSearch}
            />
          </div>
          <Table
            columns={tableColumns}
            data={this.getData()}
            loading={this.loadingTable()}
            errors={this.fetchTableErrors()}
            name={false}
            count={this.getHoldServicesCount()}
            onAdd={false}
            className="m-t-extra-sm"
            searchValue={this.props.holdServices.get('fetch').get('searchValue')}
            exportTo={false}
            {...this.props}
          />
        </div>
        { (pager && this.getHoldServicesCount()) ? <Pagination onChange={this.props.onPageChange} current={currentPage} total={pager.get('totalItems')} /> : null }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ( {
  resetHoldServicesData: () => dispatch(resetHoldServicesData()),
  onSearchStart: (searchValue) => dispatch(searchHoldServiceStart(props.caseId, props.serviceId, searchValue, props.entity, props.entityId)),
  fetchData: () => dispatch(fetchHoldServiceStart(props.caseId, props.serviceId, props.entity, props.entityId)),
  onPageChange: (page) => dispatch(fetchHoldServiceNewPage(props.caseId, props.serviceId, page, props.entity, props.entityId))
});

const mapStateToProps = (state) => ({
  holdServices: state.get('holdServices')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'holdServices', reducer });
const withSaga = injectSaga({ key: 'holdServices', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(HoldServicesTable);
