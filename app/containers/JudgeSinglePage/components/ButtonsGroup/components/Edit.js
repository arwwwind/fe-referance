import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { singleJudgeStart } from '../../../../VenuesPage/Judges/actions';

const EditButton = ({ id, ...props }) => (
  <Button type="primary" size="large" {...props}>Edit</Button>
);

const mapDispatchToProps = (dispatch, props) => ({
  onClick: () => dispatch(singleJudgeStart(props.id))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(EditButton);
