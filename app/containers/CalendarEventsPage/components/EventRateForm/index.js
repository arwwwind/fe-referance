import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../../components/Core/Drawer';
import { DAEMON } from '../../../../utils/constants';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { saveEventRateStart } from './actions';
import EventRateForm from './EventRateForm';

const EventRateDrawerForm = (props) => (
  <CoreDrawer title="In Person Event Rate" name={`event-rate-form-${props.eventId}`} width={407}>
    <EventRateForm onSend={props.onSend} single={props.single} save={props.save} />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch, props) => ({
  onSend: (data, form) => dispatch(saveEventRateStart(data, form, props.eventId))
});

const mapStateToProps = (state) => ({
  single: { ...state.get('eventRateForm').get('single').toJS() },
  save: { ...state.get('eventRateForm').get('save').toJS() }
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'eventRateForm', reducer });
const withSaga = injectSaga({ key: 'eventRateForm', saga, mode: DAEMON });
export default compose(withReducer, withSaga, withConnect)(EventRateDrawerForm);
