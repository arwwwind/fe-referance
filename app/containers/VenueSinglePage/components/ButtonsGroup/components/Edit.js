import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { singleVenueStart } from '../../../../VenuesPage/Venues/actions';

const EditButton = ({ id, ...props }) => (
  <Button type="primary" size="large" {...props}>Edit</Button>
);

const mapDispatchToProps = (dispatch, props) => ({
  onClick: () => dispatch(singleVenueStart(props.id))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(EditButton);
