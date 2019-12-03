import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Input, Select, Pagination as AntPagination } from 'antd';
import { fetchNoteNewLimit, fetchNoteNewPage } from '../../actions';

const pageChange = (onPageChange, maxPages, value) => {
  if (value && value <= maxPages && value > 0) {
    onPageChange(value);
  }
};

const pageInputChange = (onPageChange, maxPages) => (e) => pageChange(onPageChange, maxPages, parseInt(e.target.value, 10));

const pageIncrementChange = (onPageChange, maxPages, current, value) => (e) => {
  e.preventDefault();
  pageChange(onPageChange, maxPages, current + value);
};

const renderer = (onPageChange, currentPage, maxPages) => (current, type, originalElement) => {
  if (type === 'prev') {
    return <a href="" onClick={pageIncrementChange(onPageChange, maxPages, currentPage, -1)}>Previous</a>;
  } if (type === 'next') {
    return <a href="" onClick={pageIncrementChange(onPageChange, maxPages, currentPage, 1)}>Next</a>;
  }
  return originalElement;
};

const Pagination = (props) => {
  const limit = props.notes.get('limit');
  const fetch = props.notes.get('fetch');
  const pager = fetch.get('pager');
  const currentPage = fetch.get('currentPage');
  const count = pager ? pager.get('totalItems') : null;
  const maxPages = Math.ceil(count / limit);

  if (!pager || !count) {
    return null;
  }

  return (
    <div className="juvo-custom-pagination m-t-xxl">
      <div className="short-pagination m-r-extra-xxl">
        <span className="m-r-xs">Page</span>
        <Input className="m-r-xs" value={currentPage} onChange={pageInputChange(props.onPageChange, maxPages)} />
        <span>of {maxPages}</span>
      </div>
      <div className="select-table-rows" id="pagination-per-page">
        <Select value={`${limit}`} onChange={props.onLimitChange} getPopupContainer={() => document.getElementById('pagination-per-page')}>
          <Select.Option value="10">10 Rows</Select.Option>
          <Select.Option value="20">20 Rows</Select.Option>
          <Select.Option value="30">30 Rows</Select.Option>
          <Select.Option value="40">40 Rows</Select.Option>
          <Select.Option value="50">50 Rows</Select.Option>
        </Select>
      </div>
      <div className="m-l-a">
        <AntPagination
          className="juvo-pagination-secondary"
          current={currentPage}
          total={pager.get('totalItems')}
          itemRender={renderer(props.onPageChange, currentPage, maxPages)}
          onChange={props.onPageChange}
          pageSize={limit}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { entityId, entityType }) => ({
  onPageChange: (number) => dispatch(fetchNoteNewPage(entityId, entityType, number)),
  onLimitChange: (number) => dispatch(fetchNoteNewLimit(entityId, entityType, parseInt(number, 10)))
});

const mapStateToProps = (state, { entityId, entityType }) => ({
  notes: state.get('notes').get(entityType).get(entityId)
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Pagination);
