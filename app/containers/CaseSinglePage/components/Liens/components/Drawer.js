import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../../../components/Core/Drawer';
import DrawerForm from './DrawerForm';
import { saveLienStart } from '../actions';
import injectReducer from '../../../../../utils/injectReducer';
import injectSaga from '../../../../../utils/injectSaga';
import reducer from '../reducer';
import { drawerSaga as saga } from '../saga';
import { Drawer as ContactDrawer } from '../../../../ContactsPage';
import { DAEMON } from '../../../../../utils/constants';

const Drawer = (props) => (
  <CoreDrawer title={props.id ? 'Edit Lien' : 'Add Lien'} name="liens" width={834} className="service-form">
    <DrawerForm onSend={props.onSend} single={props.single} isAdmin={props.isAdmin} step={props.step} />
    <ContactDrawer />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch, { lien }) => ({
  onSend: (data, form, lienId) => dispatch(saveLienStart(data, form, lienId, lien.id))
});

const mapStateToProps = (state) => ({
  save: state.get('liens').get('save'),
  single: state.get('liens').get('single'),
  id: state.get('liens').get('id'),
  step: state.get('liens').get('step')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'liens', reducer });
const withSaga = injectSaga({ key: 'liensDrawer', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Drawer);
export { mapDispatchToProps };
