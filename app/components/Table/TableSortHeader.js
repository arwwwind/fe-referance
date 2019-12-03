import React from 'react';
import sortActiveIcon from '../../images/icons/sort-active.png';
import sortInactiveIcon from '../../images/icons/sort-inactive.png';

const TableSortHeader = (props) => (
  <div className="table-filter-header">
    <div className="table-filter-header-name">
      {props.name}
    </div>
    <div className="sort-icon">
      <img className="sort-inactive" src={sortInactiveIcon} alt="sort-inactive" />
      <img className="sort-active" src={sortActiveIcon} alt="sort-active" />
    </div>
  </div>
);

export default TableSortHeader;
