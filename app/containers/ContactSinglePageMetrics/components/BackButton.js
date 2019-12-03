import React from 'react';
import { Icon } from 'antd';
import { NavLink } from 'react-router-dom';

const BackButton = (props) => (
  <NavLink to={props.contactId ? `/contact/${props.contactId}` : '/contacts'} className="m-r-a text-700 f-s-13">
    <Icon type="left" theme="outlined" />
    <span>Back To Contact Details</span>
  </NavLink>
);


export default BackButton;
