import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../components/Core/Drawer';
import DrawerForm from './DrawerForm';
import { saveCaseStart } from '../actions';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import reducer from '../reducer';
import { drawerSaga as saga } from '../saga';
import { Drawer as ContactDrawer } from '../../ContactsPage';
import { Drawer as OrganizationDrawer } from '../../OrganizationsPage';
import { DAEMON } from '../../../utils/constants';

const Drawer = (props) => (
  <CoreDrawer title={props.id ? 'Edit Case' : 'Add Case'} name="cases" width={834} destroyOnClose>
    <DrawerForm onSend={props.onSend} single={props.single} save={props.save} />
    <ContactDrawer />
    <OrganizationDrawer />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch) => ({
  onSend: (data, form, caseId, addServices) => dispatch(saveCaseStart(data, form, caseId, addServices))
});

const mapStateToProps = (state) => ({
  save: state.get('cases').get('save'),
  single: state.get('cases').get('single'),
  id: state.get('cases').get('id')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'cases', reducer });
const withSaga = injectSaga({ key: 'casesDrawer', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Drawer);
export { mapDispatchToProps };
