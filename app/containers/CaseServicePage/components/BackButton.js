import React from 'react';
import { Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getCaseId } from '../../../utils/router';

const BackButton = (props) => (
  <NavLink to={props.caseId ? `/case/${props.caseId}` : '/cases'} className="m-r-a text-700 f-s-13">
    <Icon type="left" theme="outlined" />
    <span>Back To Case View</span>
  </NavLink>
);

const mapStateToProps = (state) => ({
  caseId: getCaseId(state.get('route').get('location').get('pathname'))
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(BackButton);
