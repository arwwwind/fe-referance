import React from 'react';
import TableName from './TableName';
import TableExport from './TableExport';
import TableAdd from './TableAdd';

const TableHeader = (props) => {
  const tableName = props.name ? (<div className="m-r-extra-md"><TableName name={props.name} count={props.count} /></div>) : null;
  const exportTo = props.exportTo ? (<TableExport exportTo={props.exportTo} />) : null;
  const onAdd = props.onAdd ? (<TableAdd onAdd={props.onAdd} addBtnTitle={props.addBtnTitle} />) : null;
  return (tableName || exportTo || onAdd) ? (
    <div className="juvo-table-actions m-b-xxl">
      <div className="left flex align-items-center">
        {tableName}
        {props.quickView ? (<div className="quick-view">{props.quickView}</div>) : null}
      </div>
      <div className="right">
        {exportTo}
        {onAdd}
      </div>
    </div>
  ) : null;
};

export default TableHeader;
