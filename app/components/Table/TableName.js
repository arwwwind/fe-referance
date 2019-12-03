import React from 'react';

const TableName = (props) => (
  <div className="juvo-table-title">{props.name} {props.count ? `(${props.count})` : ''}</div>
);

export default TableName;
