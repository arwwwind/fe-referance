import React from 'react';
import { Icon } from 'antd';
import { NavLink } from 'react-router-dom';

const BackToJudgesButton = () => (
  <NavLink to="/venues" className="text-700 f-s-13 m-t-extra-xs m-b-xl block">
    <Icon type="left" theme="outlined" />
    <span>Back To Judges Table</span>
  </NavLink>
);

export default BackToJudgesButton;
