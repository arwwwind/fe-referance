import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import BaseDrawer from '../components/Drawer';
import { saveNoteStart } from '../actions';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../utils/injectSaga';
import saga from '../saga';
import { DAEMON } from '../../../utils/constants';

const Drawer = (props) => (
  <BaseDrawer {...props} />
);

const mapDispatchToProps = (dispatch, { entityId, entityType, id }) => ({
  onSend: (data, form) => dispatch(saveNoteStart(entityId, entityType, id, data, form))
});

const mapStateToProps = (state, { entityId, entityType, id }) => ({
  single: state.get('notes').get(entityType).get(entityId)
    .get('single')
    .get(id),
  isAdmin: state.get('app').get('user').get('userType') === 'admin'
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'notes', reducer });
const withSaga = injectSaga({ key: 'notes', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Drawer);
export { mapDispatchToProps };
