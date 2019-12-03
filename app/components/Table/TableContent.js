import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import TableLoader from './TableLoader';
import { TableNoData, getNoDataProps } from './TableNoData';
import config from '../../config';

const TableContent = (props) => (
  <div className="juvo-table-content">
    <ReactTable
      manual
      data={props.data}
      onFetchData={props.onFetchData}
      columns={props.columns}
      defaultPageSize={props.defaultPageSize ? props.defaultPageSize : config.itemsPerPage}
      loading={props.loading}
      LoadingComponent={TableLoader}
      noDataText={props.noDataText ? props.noDataText : 'No data found'}
      getNoDataProps={getNoDataProps}
      NoDataComponent={TableNoData}
      errors={props.errors}
      minRows={0}
      showPagination={!!props.showPagination}
      sortable={!!props.sortable}
      multiSort={false}
      resizable={true}
      filterable={false}
      getTrProps={props.getTrProps}
      SubComponent={props.SubComponent ? (row) => props.SubComponent.component(row) : undefined}
      expanded={props.SubComponent ? props.SubComponent.expanded : undefined}
      onExpandedChange={props.SubComponent ? props.SubComponent.onExpandedChange : undefined}
    />
  </div>
);

export default TableContent;
