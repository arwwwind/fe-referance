import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Icon } from 'antd';
import Modal from './Modal';
import ItemContent from './ItemContent';
import { showWindow, hideWindow, closeWindow } from '../actions';

const getTabTitle = ({ type, ...options }) => {
  switch (type) {
    case 'listNotes': return 'View Notes';
    case 'addClientUpdates': return (options.id !== 'add') ? 'Edit Note' : 'Add Note';
    case 'addNotes': return (options.id !== 'add') ? 'Edit Note' : 'Add Note';
    default: return 'Tab';
  }
};

const onTabClick = (showTabWindow) => (e) => {
  e.preventDefault();
  showTabWindow();
};

const tabWidth = (type) => {
  switch (type) {
    case 'addClientUpdates':
    case 'addNotes': return 407;
    case 'listNotes': return 1100;
    default: return 'auto';
  }
};

const tabHeight = (type) => {
  switch (type) {
    case 'addClientUpdates':
    case 'addNotes': return 710;
    case 'listNotes': return 780;
    default: return 'auto';
  }
};

const Item = (props) => (
  <div>
    <div className="juvo-active-tab">
      <a className="trigger-show-more" href="" onClick={onTabClick(props.showWindow)}>{getTabTitle(props.options)}</a>
      <Icon className="trigger-show-more" type="close" theme="outlined" onClick={onTabClick(props.closeWindow)} />
    </div>
    <Modal visible={props.state === 'visible'} width={tabWidth(props.options.type)} height={tabHeight(props.options.type)}>
      <div className="minimize-modal-header">
        <div className="text-title">{getTabTitle(props.options)}</div>
        <div className="actions">
          <a href="#" onClick={onTabClick(props.hideWindow)}>
            <Icon type="minus" theme="outlined" />
          </a>
          <a href="#" onClick={onTabClick(props.closeWindow)}>
            <Icon type="close" theme="outlined" />
          </a>
        </div>
      </div>
      <div className="minimize-modal-content">
        <ItemContent {...props.options} />
      </div>
    </Modal>
  </div>
);

const mapDispatchToProps = (dispatch, { options, tabKey }) => ({
  showWindow: () => dispatch(showWindow(tabKey, options)),
  hideWindow: () => dispatch(hideWindow(tabKey)),
  closeWindow: () => dispatch(closeWindow(tabKey))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(Item);
