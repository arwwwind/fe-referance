import React from 'react';
import classesName from 'classnames';

const style = (props) => ({
  width: props.visible ? (props.width ? props.width : 'auto') : 157,
  height: props.height ? props.height : 750,
  bottom: props.visible ? 0 : props.height ? -props.height : -750
});

const Modal = (props) => (
  <div className={classesName({ visible: props.visible, 'juvo-window': true, 'animate-right': true })} style={style(props)}>
    {props.children}
  </div>
);

export default Modal;
