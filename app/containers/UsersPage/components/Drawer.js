import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../components/Core/Drawer';
import DrawerForm from './DrawerForm';
import { saveUserStart } from '../actions';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import reducer from '../reducer';
import { drawerSaga as saga } from '../saga';
import { DAEMON } from '../../../utils/constants';

const Drawer = (props) => (
  <CoreDrawer title={props.id ? 'Edit User' : 'Add User'} width={407} name="users">
    <DrawerForm onSend={props.onSend} single={props.single} />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch) => ({
  onSend: (data, form) => dispatch(saveUserStart(data, form))
});

const mapStateToProps = (state) => ({
  single: state.get('users').get('single'),
  id: state.get('users').get('id'),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'usersDrawer', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Drawer);
export { mapDispatchToProps };
