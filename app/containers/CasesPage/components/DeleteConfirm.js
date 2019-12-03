import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { deleteCaseStart } from '../actions';
import Confirm from '../../../components/Core/Confirm';

const DeleteConfirm = ({ id, ...props }) => (
  <Confirm {...props} />
);

const mapDispatchToProps = (dispatch, props) => ({
  onConfirm: () => dispatch(deleteCaseStart(props.id))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(DeleteConfirm);
