import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import BaseList from '../components/List';
import { fetchNoteNewPage, fetchNoteStart, searchNoteStart } from '../actions';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../utils/injectSaga';
import saga from '../saga';
import { DAEMON } from '../../../utils/constants';

const List = (props) => (
  <BaseList {...props} />
);

const mapDispatchToProps = (dispatch, { entityId, entityType }) => ({
  onSearch: (value) => dispatch(searchNoteStart(entityId, entityType, value)),
  fetchData: () => dispatch(fetchNoteStart(entityId, entityType)),
  onPageChange: (number) => dispatch(fetchNoteNewPage(entityId, entityType, number))
});

const mapStateToProps = (state, { entityId, entityType }) => ({
  notes: state.get('notes').get(entityType).get(entityId)
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'notes', reducer });
const withSaga = injectSaga({ key: 'notes', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(List);
export { mapDispatchToProps };
