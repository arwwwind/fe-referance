import React from 'react';
import { Input } from 'antd';
import debounce from 'lodash/debounce';

const onSearch = (props) => (value) => props.onSearch(value);

const onDebouncedChange = debounce((props, value) => {
  props.onSearch(value);
}, 200);

const onChange = (props) => (e) => onDebouncedChange(props, e.target.value);

const TableSearch = (props) => props.onSearch ? ( // eslint-disable-line no-confusing-arrow
  <div className="juvo-table-search m-b-md">
    <Input.Search
      maxLength="150"
      size="large"
      placeholder="Search"
      onSearch={onSearch(props)}
      onChange={onChange(props)}
      defaultValue={props.searchValue}
    />
  </div>
) : null;

export default TableSearch;
