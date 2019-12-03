import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import Avatar from '../../containers/AccountSettingsPage/components/Avatar';

const onLogoutClick = (props) => (e) => {
  e.preventDefault();

  props.onLogout();
};

const accountMenu = (props) => (
  <Menu className="juvo-header-dropdown">
    <Menu.Item key="0" className="juvo-header-dropdown-profile">
      <div className="profile-icon">
        <Avatar />
      </div>
      <div className="profile-information">
        <div className="name">
          {props.user.profile.firstName} {props.user.profile.lastName}
        </div>
        <div className="email">
          <a href="mailto:{props.user.loginEmail}" rel="noopener noreferrer">
            {props.user.loginEmail}
          </a>
        </div>
      </div>
    </Menu.Item>
    <Menu.Item key="1">
      <NavLink className="link" to="/account-settings">
        <span className="t-upper">Account settings</span>
      </NavLink>
    </Menu.Item>
    <Menu.Item key="2">
      <NavLink className="link" to="/notifications">
        <span className="t-upper">Notifications</span>
      </NavLink>
    </Menu.Item>
    <Menu.Item key="3">
      <NavLink className="link" to="/login" onClick={onLogoutClick(props)}>
        <span className="t-upper text-danger">Sign out</span>
      </NavLink>
    </Menu.Item>
  </Menu>
);

const Account = (props) => (
  <div className="juvo-account-dropdown">
    <Dropdown overlay={accountMenu(props)} trigger={['click']} placement="bottomRight">
      <div className="profile-account">
        <div className="profile-icon">
          <Avatar />
        </div>
        <div className="profile-name">
          {props.user.profile.firstName} {props.user.profile.lastName}
        </div>
        <Icon type="caret-down" />
      </div>
    </Dropdown>
  </div>
);

export default Account;
