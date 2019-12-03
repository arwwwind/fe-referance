import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Dropdown, Icon, Menu } from 'antd';
import CaseRequestDelete from './CaseRequestDelete';
import ServiceRequestDelete from './ServiceRequestDelete';
import { showDropdown, hideDropdown } from '../../../App/actions';
import { getCaseId, getServiceId } from '../../../../utils/router';
import { openDeleteModal, serviceReasonOpenDrawer, serviceRestoreStatus } from '../../actions';
import { showDrawer } from '../../../../components/Core/Drawer/actions';
import DrawerServiceReason from './Drawer';

const mapStateToProps = (state) => {
  const pathname = state.get('route').get('location').get('pathname');

  return {
    visible: state.get('app').get('dropdown'),
    caseId: getCaseId(pathname),
    serviceId: getServiceId(pathname),
    isAdmin: state.get('app').get('user').get('userType') === 'admin',
    service: state.get('service') ? state.get('service').get('data') : null
  };
};

const mapDispatchToProps = (dispatch) => ({
  openModal: (id, entity) => dispatch(openDeleteModal(id, entity)),
  openDrawer: () => dispatch(showDrawer('serviceReasonDrawer')),
  serviceUpdateReasonType: (reasonType) => dispatch(serviceReasonOpenDrawer(reasonType)),
  serviceRestore: (id, statusType) => dispatch(serviceRestoreStatus(id, statusType)),
  onShow: () => dispatch(showDropdown()),
  onHide: () => dispatch(hideDropdown())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const closeDropDownAndOpenDeleteModal = (props, entity) => {
  const id = (entity === 'service') ? props.serviceId : props.caseId;
  props.onHide();
  props.openModal(id, entity);
};

const closeDropDownAndOpenDrawer = (props, reasonType) => {
  props.onHide();
  props.serviceUpdateReasonType(reasonType);
  props.openDrawer();
};

const closeDropDownAndRestoreService = (props, statusType) => {
  props.onHide();
  props.serviceRestore(props.serviceId, statusType);
};

const serviceOptions = (props) => (
  <Menu>
    <DrawerServiceReason />
    {props.service.get('status') === 'cancelled' ? null : props.service.get('suspended') ? (
      <Menu.Item key="0" onClick={() => closeDropDownAndRestoreService(props, 'unsuspend')}>
        <span className="text-link">Unsuspend Service</span>
      </Menu.Item>
    ) : (
      <Menu.Item key="0" onClick={() => closeDropDownAndOpenDrawer(props, 'suspend')}>
        <span className="text-danger">Suspend Service</span>
      </Menu.Item>
    )}
    {props.service.get('status') === 'cancelled' ? null : props.service.get('onHold') ? (
      <Menu.Item key="1" onClick={() => closeDropDownAndRestoreService(props, 'unhold')}>
        <span className="text-link">Unhold Service</span>
      </Menu.Item>
    ) : (
      <Menu.Item key="1" onClick={() => closeDropDownAndOpenDrawer(props, 'hold')}>
        <span className="text-danger">Hold Service</span>
      </Menu.Item>
    )}
    {props.service.get('status') === 'cancelled' ? (
      <Menu.Item key="2" onClick={() => closeDropDownAndRestoreService(props, 'activate')}>
        <span className="text-link">Activate Service</span>
      </Menu.Item>
    ) : (
      <Menu.Item key="2" onClick={() => closeDropDownAndOpenDrawer(props, 'cancel')}>
        <span className="text-danger">Cancel Service</span>
      </Menu.Item>
    )}
    {props.isAdmin ? (
      <Menu.Item key="3" onClick={() => closeDropDownAndOpenDeleteModal(props, 'service')}>
        <span className="text-danger">Delete</span>
      </Menu.Item>
    ) : (
      <Menu.Item key="3">
        <ServiceRequestDelete id={props.serviceId} />
      </Menu.Item>
    )}
  </Menu>
);

const caseOptions = (props) => (
  <Menu>
    {props.isAdmin ? (
      <Menu.Item key="0" onClick={() => closeDropDownAndOpenDeleteModal(props, 'case')}>
        <span className="text-danger">Delete</span>
      </Menu.Item>
    ) : (
      <Menu.Item key="0">
        <CaseRequestDelete id={props.caseId} />
      </Menu.Item>
    )}
  </Menu>
);

const onTrigger = ({ visible, onShow, onHide }) => (e) => {
  e.preventDefault();

  if (!visible) {
    onShow();
  } else {
    onHide();
  }
};

const CaseDropdown = compose(withConnect)((props) => (
  <Dropdown className="case-management" overlay={caseOptions(props)} visible={props.visible}>
    <a className="ant-dropdown-link" href="#" onClick={onTrigger(props)}>
      <Icon type="ellipsis" />
    </a>
  </Dropdown>
));

const ServiceDropdown = compose(withConnect)((props) => (
  <Dropdown className="case-management" overlay={serviceOptions(props)} visible={props.visible}>
    <a className="ant-dropdown-link" href="#" onClick={onTrigger(props)}>
      <Icon type="ellipsis" />
    </a>
  </Dropdown>
));

export { CaseDropdown, ServiceDropdown };
