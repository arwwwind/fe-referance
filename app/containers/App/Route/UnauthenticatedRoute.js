import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, Route } from 'react-router-dom';

const UnauthenticatedRoute = ({ token, appLoading, ...props }) => (
  (!token || appLoading) ? <Route {...props} /> : <Redirect to="/" />
);

const mapStateToProps = (state) => ({
  appLoading: state.get('app').get('loading'),
  token: state.get('app').get('token')
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(UnauthenticatedRoute);
