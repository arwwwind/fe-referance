import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../components/Core/Drawer';
import DrawerForm from './DrawerForm';
import { saveTaskStart } from './actions';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import reducer from '../reducer';
import { drawerSaga as saga } from './saga';
import { DAEMON } from '../../../utils/constants';
import { Drawer as ContactDrawer } from '../../ContactsPage';

const Drawer = (props) => (
  <CoreDrawer title={props.id ? 'Edit Task' : 'Add Task'} name="tasks" width={407}>
    <DrawerForm isEdit={!!props.id} onSend={props.onSend} single={props.single} currentPath={props.currentPath} />
    <ContactDrawer />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch) => ({
  onSend: (data, form) => dispatch(saveTaskStart(data, form))
});

const mapStateToProps = (state) => ({
  single: state.get('tasks').get('single'),
  id: state.get('tasks').get('id'),
  currentPath: state.get('route').get('location').get('pathname')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'tasks', reducer });
const withSaga = injectSaga({ key: 'tasksDrawer', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Drawer);
export { mapDispatchToProps };
