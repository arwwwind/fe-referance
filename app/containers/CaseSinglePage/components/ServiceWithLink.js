import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Service from './Service';
import { getCaseId } from '../../../utils/router';

const ServiceWithLink = (props) => (
  <Service {...props}>
    <NavLink className="overlay-link" to={`/case/${props.caseId}/service/${props.serviceId}`} />
  </Service>
);

const mapStateToProps = (state) => ({
  caseId: getCaseId(state.get('route').get('location').get('pathname'))
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ServiceWithLink);
