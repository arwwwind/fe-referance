import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../../../components/Core/Drawer';
import { DAEMON } from '../../../../../utils/constants';
import injectReducer from '../../../../../utils/injectReducer';
import injectSaga from '../../../../../utils/injectSaga';
import reducer from '../reducer';
import saga from '../saga';
import { saveEventStart } from '../actions';
import { Drawer as VenueDrawer } from '../../../../VenuesPage/Venues';
import { Drawer as JudgeDrawer } from '../../../../VenuesPage/Judges';
import EventForm from './EventForm';

const EventDrawerForm = (props) => (
  <CoreDrawer title="Add In Person Event" name="event-form" width={407}>
    <EventForm onSend={props.onSend} single={props.single} save={props.save} />
    <VenueDrawer />
    <JudgeDrawer />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch, props) => ({
  onSend: (data, form) => dispatch(saveEventStart(data, form, props.eventId))
});

const mapStateToProps = (state) => ({
  single: { ...state.get('eventForm').get('single').toJS() },
  save: { ...state.get('eventForm').get('save').toJS() }
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'eventForm', reducer });
const withSaga = injectSaga({ key: 'eventForm', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(EventDrawerForm);
