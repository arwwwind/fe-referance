import React from 'react';
import { Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { caseRequestDelete } from '../../actions';

const CaseRequestDelete = (props) => (
  <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => props.requestDelete(props.id)}>
    <span className="text-danger">Request Delete</span>
  </Popconfirm>
);

const mapDispatchToProps = (dispatch) => ({
  requestDelete: (id) => dispatch(caseRequestDelete(id))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(CaseRequestDelete);
