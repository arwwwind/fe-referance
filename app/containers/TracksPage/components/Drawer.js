import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../components/Core/Drawer';
import DrawerForm from './DrawerForm';
import { saveTracksStart, deleteTracksStart } from '../actions';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import reducer from '../reducer';
import { drawerSaga as saga } from '../saga';
import { Drawer as ContactDrawer } from '../../ContactsPage';
import { DAEMON } from '../../../utils/constants';

const Drawer = (props) => (
  <CoreDrawer title={props.id && props.boardID ? 'Edit Track Task' : 'Add Track Task'} name="tracks" width={834}>
    <DrawerForm onSend={props.onSend} onDelete={props.onDelete} single={props.single} isEdit={props.id && props.boardID} />
    <ContactDrawer />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch) => ({
  onSend: (data, form) => dispatch(saveTracksStart(data, form)),
  onDelete: () => dispatch(deleteTracksStart())
});

const mapStateToProps = (state) => ({
  single: state.get('tracks').get('single'),
  id: state.get('tracks').get('id'),
  boardID: state.get('tracks').get('boardID')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'tracks', reducer });
const withSaga = injectSaga({ key: 'tracksDrawer', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Drawer);
export { mapDispatchToProps };
