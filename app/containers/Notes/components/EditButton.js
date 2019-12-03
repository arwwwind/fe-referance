import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { singleNoteStart } from '../actions';

const EditButton = ({
  id,
  entityId,
  entityType,
  ...props
}) => (
  <Button type="primary" shape="circle" icon="edit" size="small" {...props} />
);

const mapDispatchToProps = (dispatch, { id, entityId, entityType }) => ({
  onClick: () => dispatch(singleNoteStart(entityId, entityType, id))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(EditButton);
