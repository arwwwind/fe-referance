import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../../../components/Core/Drawer';
import Form from './Form';
import { DAEMON } from '../../../../../utils/constants';
import injectReducer from '../../../../../utils/injectReducer';
import injectSaga from '../../../../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { singleServiceViewStart, saveServiceViewStart } from './actions';
import { Drawer as JudgeDrawer } from '../../../../VenuesPage/Judges';
import { Drawer as VenueDrawer } from '../../../../VenuesPage/Venues';

const openDrawer = (props) => (e) => {
  e.preventDefault();
  props.showServiceViewDrawer();
};

const ServiceViewForm = (props) => (
  <div>
    <a className="m-l-xs" href="#" onClick={openDrawer(props)}>Edit</a>
    <CoreDrawer title={props.name} name={`serviceViewForm-${props.name}`} width={407}>
      <Form onSend={props.onSend} single={props.single} name={props.name} />
      <JudgeDrawer />
      <VenueDrawer />
    </CoreDrawer>
  </div>
);

const mapDispatchToProps = (dispatch, props) => ({
  showServiceViewDrawer: () => dispatch(singleServiceViewStart(props.serviceId, props.caseId, props.name)),
  onSend: (data, form) => dispatch(saveServiceViewStart(props.serviceType, data, form, props.serviceId, props.caseId, props.name))
});

const mapStateToProps = (state) => ({
  single: { ...state.get('serviceViewForm').get('single').toJS() },
  save: { ...state.get('serviceViewForm').get('save').toJS() },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'serviceViewForm', reducer });
const withSaga = injectSaga({ key: 'serviceViewForm', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(ServiceViewForm);
