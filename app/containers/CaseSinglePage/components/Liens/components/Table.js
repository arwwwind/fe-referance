import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Input, Pagination } from 'antd';
import tableColumns from '../columns';
import Table from '../../../../../components/Table/Table';
import { fetchLienNewPage, fetchLienStart, searchLienStart, singleLienStart, resetLiensData } from '../actions';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../../../utils/injectSaga';
import { pageSaga as saga } from '../saga';
import { DAEMON } from '../../../../../utils/constants';
import LiensMetrics from './LiensMetrics';

class LiensTable extends React.Component {
  componentDidMount() {
    this.props.resetLiensData();
    this.props.fetchData();
  }

  /**
   * Get liens count
   * @function getLiensCount
   * @returns {number} number of liens
   */
  getLiensCount = () => {
    const pager = this.props.liens.get('fetch').get('pager');
    return pager ? pager.get('totalItems') : null;
  };

  onChangeSearch = (e) => this.props.onSearchStart(e.target.value);

  /**
   * Get liens data from search or fetch results
   * @function getData
   */
  getData = () => this.props.liens.get('data').toJS();

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => this.props.liens.toJS().fetch.loading;

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => this.props.liens.toJS().fetch.error;

  render() {
    const fetch = this.props.liens.get('fetch');
    const pager = fetch.get('pager');
    const currentPage = fetch.get('currentPage');

    return (
      <div>
        <div className="stats-header m-b-extra-md">
          <div className="title">Liens</div>
          <div className="juvo-table-search">
            <Input.Search
              maxLength="150"
              size="small"
              placeholder="Search"
              onSearch={this.props.onSearchStart}
              onChange={this.onChangeSearch}
            />
          </div>
          <LiensMetrics caseId={this.props.lien.caseId} />
          <div>
            <Button type="primary" icon="plus" size="large" onClick={this.props.singleLienStart}>Add Lien</Button>
          </div>
        </div>
        <Table
          columns={tableColumns}
          data={this.getData()}
          loading={this.loadingTable()}
          errors={this.fetchTableErrors()}
          name={false}
          count={this.getLiensCount()}
          onAdd={false}
          className="m-t-extra-sm"
          searchValue={this.props.liens.get('fetch').get('searchValue')}
          exportTo={false}
          {...this.props}
        />
        { (pager && this.getLiensCount()) ? <Pagination onChange={this.props.onPageChange} current={currentPage} total={pager.get('totalItems')} /> : null }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const lienServiceId = props.lien ? props.lien.id : undefined;

  return {
    resetLiensData: () => dispatch(resetLiensData()),
    onSearchStart: (searchValue) => dispatch(searchLienStart(lienServiceId, searchValue, props.entity, props.entityId)),
    fetchData: () => dispatch(fetchLienStart(lienServiceId, props.entity, props.entityId)),
    singleLienStart: () => dispatch(singleLienStart(null)),
    onPageChange: (page) => dispatch(fetchLienNewPage(lienServiceId, page, props.entity, props.entityId))
  };
};

const mapStateToProps = (state) => ({
  liens: state.get('liens')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'liens', reducer });
const withSaga = injectSaga({ key: 'liens', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(LiensTable);
