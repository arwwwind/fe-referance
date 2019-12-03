import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { deleteOrganizationStart } from '../actions';
import Confirm from '../../../components/Core/Confirm';

const DeleteConfirm = ({ id, ...props }) => (
  <Confirm {...props} />
);

const mapDispatchToProps = (dispatch, props) => ({
  onConfirm: () => dispatch(deleteOrganizationStart(props.id))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(DeleteConfirm);
