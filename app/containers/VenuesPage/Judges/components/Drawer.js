import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../../components/Core/Drawer';
import DrawerForm from './DrawerForm';
import { saveJudgeStart } from '../actions';
import injectReducer from '../../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../../utils/injectSaga';
import { drawerSaga as saga } from '../saga';
import { Drawer as VenueDrawer } from '../../Venues';
import { DAEMON } from '../../../../utils/constants';

const Drawer = (props) => (
  <CoreDrawer title={props.id ? 'Edit Judge' : 'Add Judge'} width={407} name="judges">
    <DrawerForm onSend={props.onSend} single={props.single} />
    <VenueDrawer />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch) => ({
  onSend: (data, form) => dispatch(saveJudgeStart(data, form))
});

const mapStateToProps = (state) => ({
  single: state.get('judges').get('single'),
  id: state.get('judges').get('id')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'judges', reducer });
const withSaga = injectSaga({ key: 'judgesDrawer', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Drawer);
export { mapDispatchToProps };
