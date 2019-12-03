import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { deleteNoteStart } from '../actions';
import Confirm from '../../../components/Core/Confirm';

const DeleteConfirm = ({
  id,
  entityId,
  entityType,
  ...props
}) => (
  <Confirm {...props} />
);

const mapDispatchToProps = (dispatch, { id, entityId, entityType }) => ({
  onConfirm: () => dispatch(deleteNoteStart(entityId, entityType, id))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(DeleteConfirm);
