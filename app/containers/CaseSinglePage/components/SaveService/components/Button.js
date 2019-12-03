import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button as AntButton } from 'antd';
import Drawer from './Drawer';
import { singleServiceStart, saveServiceStart } from '../actions';
import injectReducer from '../../../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../../../utils/injectSaga';
import { drawerSaga as saga } from '../saga';
import { DAEMON } from '../../../../../utils/constants';

const Button = ({ serviceId, onClick, ...props }) => (
  <div>
    {serviceId ? (
      <AntButton type="primary" size="large" onClick={onClick}>Edit</AntButton>
    ) : (
      <AntButton type="primary" icon="plus" size="large" onClick={onClick}>Add Service</AntButton>
    )}
    <Drawer {...props} id={serviceId} />
  </div>
);

const mapDispatchToProps = (dispatch, { serviceId, caseId }) => ({
  onSend: (data, form) => dispatch(saveServiceStart(serviceId, caseId, data, form)),
  onClick: () => dispatch(singleServiceStart(serviceId, caseId))
});

const mapStateToProps = (state) => ({
  single: state.get('saveService').get('single'),
  isAdmin: state.get('app').get('user').get('userType') === 'admin',
  step: state.get('saveService').get('step')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'saveService', reducer });
const withSaga = injectSaga({ key: 'saveService', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Button);
