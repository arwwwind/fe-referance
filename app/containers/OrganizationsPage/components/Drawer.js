import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../components/Core/Drawer';
import DrawerForm from './DrawerForm';
import { saveOrganizationStart } from '../actions';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import reducer from '../reducer';
import { drawerSaga as saga } from '../saga';
import { DAEMON } from '../../../utils/constants';

const Drawer = (props) => (
  <CoreDrawer title={props.id ? 'Edit Organization' : 'Add Organization'} name="organizations" width={407}>
    <DrawerForm onSend={props.onSend} single={props.single} isAdmin={props.isAdmin} />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch) => ({
  onSend: (data, form) => dispatch(saveOrganizationStart(data, form))
});

const mapStateToProps = (state) => ({
  single: state.get('organizations').get('single'),
  id: state.get('organizations').get('id'),
  isAdmin: state.get('app').get('user').get('userType') === 'admin'
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'organizations', reducer });
const withSaga = injectSaga({ key: 'organizationsDrawer', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Drawer);
export { mapDispatchToProps };
