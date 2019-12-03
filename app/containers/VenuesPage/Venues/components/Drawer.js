import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../../components/Core/Drawer';
import DrawerForm from './DrawerForm';
import { saveVenueStart } from '../actions';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import reducer from '../reducer';
import { drawerSaga as saga } from '../saga';
import { Drawer as ContactDrawer } from '../../../ContactsPage';
import { DAEMON } from '../../../../utils/constants';

const Drawer = (props) => (
  <CoreDrawer title={props.id ? 'Edit Venue' : 'Add Venue'} width={407} name="venues">
    <DrawerForm onSend={props.onSend} single={props.single} />
    <ContactDrawer />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch) => ({
  onSend: (data, form) => dispatch(saveVenueStart(data, form))
});

const mapStateToProps = (state) => ({
  single: state.get('venues').get('single'),
  id: state.get('venues').get('id')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'venues', reducer });
const withSaga = injectSaga({ key: 'venuesDrawer', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Drawer);
export { mapDispatchToProps };
