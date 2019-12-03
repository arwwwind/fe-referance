import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { singlePersonEventsStart } from '../actions';

const EditButton = ({ id, ...props }) => (
  <Button type="primary" shape="circle" icon="edit" size="small" {...props} />
);

const mapDispatchToProps = (dispatch, props) => ({
  onClick: () => dispatch(singlePersonEventsStart(props.id))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(EditButton);
