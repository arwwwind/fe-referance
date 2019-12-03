import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

const MetricsButton = (props) => (
  <NavLink to={`/contact/${props.contactId}/metrics`} className="m-r-md">
    <Button type="primary" size="large">Metrics</Button>
  </NavLink>
);

export default MetricsButton;
