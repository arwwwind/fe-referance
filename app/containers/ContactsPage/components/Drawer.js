import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../components/Core/Drawer';
import DrawerForm from './DrawerForm';
import { saveContactStart } from '../actions';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import reducer from '../reducer';
import { drawerSaga as saga } from '../saga';
import { Drawer as OrganisationDrawer } from '../../OrganizationsPage';
import { DAEMON } from '../../../utils/constants';

const Drawer = (props) => (
  <CoreDrawer title={props.id ? 'Edit Contact' : 'Add Contact'} name="contacts" width={407}>
    <DrawerForm onSend={props.onSend} single={props.single} />
    <OrganisationDrawer />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch) => ({
  onSend: (data, form) => dispatch(saveContactStart(data, form))
});

const mapStateToProps = (state) => ({
  single: state.get('contacts').get('single'),
  id: state.get('contacts').get('id')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'contacts', reducer });
const withSaga = injectSaga({ key: 'contactsDrawer', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Drawer);
export { mapDispatchToProps };
