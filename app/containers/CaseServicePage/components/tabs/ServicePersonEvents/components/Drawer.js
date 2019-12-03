import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../../../../components/Core/Drawer';
import DrawerForm from './DrawerForm';
import { savePersonEventsStart } from '../actions';
import injectReducer from '../../../../../../utils/injectReducer';
import injectSaga from '../../../../../../utils/injectSaga';
import reducer from '../reducer';
import { drawerSaga as saga } from '../saga';
import { Drawer as ContactDrawer } from '../../../../../ContactsPage';
import { DAEMON } from '../../../../../../utils/constants';
import { Drawer as VenueDrawer } from '../../../../../VenuesPage/Venues';
import { Drawer as JudgeDrawer } from '../../../../../VenuesPage/Judges';

const Drawer = (props) => (
  <CoreDrawer title={props.id ? 'Edit In Person Event' : 'Add In Person Event'} width={407} name="personEvents">
    <DrawerForm onSend={props.onSend} single={props.single} onCalendar={props.onCalendar}/>
    <ContactDrawer />
    <VenueDrawer />
    <JudgeDrawer />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch) => ({
  onSend: (data, form) => dispatch(savePersonEventsStart(data, form))
});

const mapStateToProps = (state) => ({
  single: state.get('personEvents').get('single'),
  id: state.get('personEvents').get('id')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'personEvents', reducer });
const withSaga = injectSaga({ key: 'personEventsDrawer', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Drawer);
export { mapDispatchToProps };
