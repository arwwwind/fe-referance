import React, { Component } from 'react';
import { Button } from 'antd';
import Table from '../../../components/Table/Table';
import tableColumns from '../columns';
import Search from './Search';
import Pagination from './Pagination';
import File from '../../../components/Core/File';

const isHTML = (str) => {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
};

const GenerateContent = (props) => (isHTML(props.content) ? (<iframe className="note-email-iframe" title="note-email-content" src={`data:text/html, ${encodeURIComponent(props.content)}`} />) : <div>{props.content}</div>);

const Text = (data) => (
  <div className="note-details p-md">
    {data.original.content ? (
      <div className="m-b-md">
        <GenerateContent content={data.original.content} />
      </div>
    ) : null}
    {data.original.files ? data.original.files.length ? data.original.files.map((file) => (<File name={file.fileName} key={file.id} id={file.id} />)) : null : null}
  </div>
);

/**
 * Creates notes page component
 * @class
 */
class List extends Component {
  state = {
    expanded: {}
  };

  /**
   * Load notes data
   * @function componentDidMount
   */
  componentDidMount() {
    this.props.fetchData();
  }

  /**
   * Get notes data from search or fetch results
   * @function getData
   */
  getData = () => {
    return this.props.notes.get('data').toJS();
  };

  /**
   * Get notes count
   * @function getNotesCount
   * @returns {number} number of notes
   */
  getNotesCount = () => {
    const pager = this.props.notes.get('fetch').get('pager');
    return pager ? pager.get('totalItems') : null;
  };

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => {
    const notes = this.props.notes.toJS();

    return notes.search.loading || notes.fetch.loading;
  };

  /**
   * Show errors on the table
   * @function fetchTableErrors
   */
  fetchTableErrors = () => {
    const notes = this.props.notes.toJS();
    const fetchErrors = notes.fetch.error;
    const searchErrors = notes.search.error;
    return (fetchErrors || searchErrors) ? Object.assign({}, fetchErrors, searchErrors) : null;
  };

  /**
   * Handle note search
   * @function handleSearch
   * @param {String} value - search value
   * @returns {Function} onSearch from props
   */
  handleSearch = (value) => this.props.onSearch(value);

  expandAll = () => {
    const expanded = this.getData().reduce((ret, item, key) => {
      ret[key] = true;
      return ret;
    }, {});
    this.setState({ expanded });
  };

  /**
   * Render notes component
   * @function render
   */
  render() {
    const SubComponent = {
      component: (row) => Text(row),
      onExpandedChange: (expanded) => {
        this.setState({ expanded });
      },
      expanded: this.state.expanded
    };

    return (
      <div className="p-md">
        <div className="flex space-between align-items-center p-b-md">
          <Search onSearch={this.handleSearch} />
          <Button type="primary" size="large" onClick={this.expandAll}>Expand All Row</Button>
        </div>
        <Table
          columns={tableColumns}
          data={this.getData()}
          SubComponent={SubComponent}
          errors={this.fetchTableErrors()}
          count={this.getNotesCount()}
          loading={this.loadingTable()}
        />
        <Pagination entityId={this.props.entityId} entityType={this.props.entityType} />
      </div>
    );
  }
}

export default List;
