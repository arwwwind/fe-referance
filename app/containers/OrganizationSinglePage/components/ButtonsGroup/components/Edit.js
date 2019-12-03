import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { singleOrganizationStart } from '../../../../OrganizationsPage/actions';

const EditButton = ({ id, ...props }) => (
  <Button type="primary" size="large" {...props}>Edit</Button>
);

const mapDispatchToProps = (dispatch, props) => ({
  onClick: () => dispatch(singleOrganizationStart(props.id))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(EditButton);
