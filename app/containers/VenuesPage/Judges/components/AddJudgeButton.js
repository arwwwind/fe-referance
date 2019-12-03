import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { singleJudgeStart } from '../actions';

const AddJudgeButton = ({ id, ...props }) => (
  <Button type="primary" size="small" {...props}>Add or Link</Button>
);

const mapDispatchToProps = (dispatch, props) => ({
  onClick: () => dispatch(singleJudgeStart(props.id))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(AddJudgeButton);
