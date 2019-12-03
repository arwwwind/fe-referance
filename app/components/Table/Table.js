import React from 'react';
import classNames from 'classnames';
import TableSearch from './TableSearch';
import TableContent from './TableContent';
import TableHeader from './TableHeader';

const Table = (props) => (
  <div className={classNames(props.className, 'juvo-table')}>
    <TableHeader
      name={props.name}
      count={props.count}
      exportTo={props.exportTo}
      onAdd={props.onAdd}
      addBtnTitle={props.addBtnTitle}
      quickView={props.quickView}
    />
    <TableSearch onSearch={props.onSearch} searchValue={props.searchValue} />
    <TableContent
      sortable={props.sortable}
      onFetchData={props.onFetchData}
      data={props.data}
      columns={props.columns}
      noDataText={props.noDataText}
      defaultPageSize={props.defaultPageSize}
      showPagination={props.showPagination}
      loading={props.loading && !props.data.length}
      errors={props.errors}
      getTrProps={props.getTrProps}
      SubComponent={props.SubComponent}
    />
  </div>
);

export default Table;
