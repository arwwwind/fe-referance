import React from 'react';
import classNames from 'classnames';

const Sidebar = (props) => (
  <div className={classNames(props.cssClass, 'juvo-main-sidebar')}>
    {props.children}
  </div>
);

export default Sidebar;
