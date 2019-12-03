import React from 'react';
import { Icon } from 'antd';
import { NavLink } from 'react-router-dom';

const BackToOrganizationsButton = () => (
  <NavLink to="/organizations" className="text-700 f-s-13 m-t-extra-xs m-b-xl block">
    <Icon type="left" theme="outlined" />
    <span>Back To Organizations View</span>
  </NavLink>
);

export default BackToOrganizationsButton;
