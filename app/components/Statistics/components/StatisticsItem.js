import React from 'react';
import { NavLink } from 'react-router-dom';
import { checkValidValue, formatMetricsValue } from '../../../utils/common';

const StatisticsItem = (props) => (
  <div className="juvo-statistics-item">
    <div className="value">{checkValidValue(props.value) ? formatMetricsValue(props.value) : 0}</div>
    <div className="content">
      <div className="title">{props.title}</div>
      <NavLink className="link" to={props.link}>{props.linkText}</NavLink>
    </div>
  </div>
);

export default StatisticsItem;
