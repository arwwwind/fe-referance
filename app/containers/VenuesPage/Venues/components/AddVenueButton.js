import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { singleVenueStart } from '../actions';

const AddVenueButton = ({ id, ...props }) => (
  <Button type="primary" size="small" {...props}>Add or Link</Button>
);

const mapDispatchToProps = (dispatch, props) => ({
  onClick: () => dispatch(singleVenueStart(props.id))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(AddVenueButton);
