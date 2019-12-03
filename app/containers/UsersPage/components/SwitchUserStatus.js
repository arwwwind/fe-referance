import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Tooltip } from 'antd';
import { switchUserStatusStart } from '../actions';
import Confirm from '../../../components/Core/Confirm';

const SwitchUserStatus = ({ id, status, ...props }) => (
  <Tooltip placement="top" title={!props.disabled ? status ? 'Deactivate' : 'Activate' : null}>
    <Confirm type="primary" icon={status ? 'disconnect' : 'link'} {...props} />
  </Tooltip>
);

const mapDispatchToProps = (dispatch, props) => ({
  onConfirm: () => dispatch(switchUserStatusStart(props.id, props.status))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(SwitchUserStatus);
