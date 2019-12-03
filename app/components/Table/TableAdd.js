import React from 'react';
import { Button } from 'antd';

const addBtn = (props) => (e) => {
  e.preventDefault();

  props.onAdd();
};

const TableAdd = (props) => (
  <div className="juvo-table-btn">
    <Button type="primary" icon="plus" size="large" onClick={addBtn(props)}>{props.addBtnTitle}</Button>
  </div>
);

export default TableAdd;
