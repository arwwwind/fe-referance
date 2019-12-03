import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import Drawer from '../Drawer';
import { singleTaskStart } from '../Drawer/actions';

const Header = (props) => (
  <div className="events-tasks-widget-header">
    <div>{`${props.title} ${props.count !== undefined ? `(${props.count})` : ''}`}</div>
    <Button type="primary" shape="circle" icon="plus" size="large" onClick={props.openDrawer} />
    <Drawer />
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  openDrawer: () => dispatch(singleTaskStart(null))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(Header);
