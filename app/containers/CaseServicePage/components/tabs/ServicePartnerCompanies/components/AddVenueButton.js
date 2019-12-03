import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { singlePartnerCompanyStart } from '../actions';

const AddPartnerCompanyButton = ({ id, ...props }) => (
  <Button type="primary" size="small" {...props}>Add or Link</Button>
);

const mapDispatchToProps = (dispatch, props) => ({
  onClick: () => dispatch(singlePartnerCompanyStart(props.id))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(AddPartnerCompanyButton);
