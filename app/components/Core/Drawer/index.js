import React from 'react';
import { compose } from 'redux';
import extend from 'lodash/extend';
import { Drawer as AntDrawer } from 'antd';
import { connect } from 'react-redux';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import { hideDrawer } from './actions';

const prepare = (props) => extend({
  title: 'Drawer',
  width: 720,
  placement: 'right',
  maskClosable: false,
  style: {
    height: 'calc(100% - 105px)',
    overflow: 'auto',
    paddingBottom: 116,
  }
}, props);

const Drawer = (props) => (
  <AntDrawer {...prepare(props)}>
    {props.children}
  </AntDrawer>
);

const mapDispatchToProps = (dispatch, props) => ({
  onClose: () => dispatch(hideDrawer(props.name))
});

const mapStateToProps = (state, props) => ({
  visible: !!state.get('drawer').get(props.name)
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'drawer', reducer });

export default compose(withReducer, withConnect)(Drawer);
