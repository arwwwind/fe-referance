import React from 'react';
import { Input } from 'antd';

const Search = (props) => (
  <div className="juvo-table-search">
    <Input.Search
      size="small"
      placeholder="Search"
      onSearch={props.onSearch}
      onChange={(e) => props.onSearch(e.target.value)}
      maxLength="150"
    />
  </div>
);

export default Search;
