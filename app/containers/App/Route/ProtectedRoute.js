import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ token, appLoading, ...props }) => (
  (token || appLoading) ? <Route {...props} /> : <Redirect to="/login" />
);

const mapStateToProps = (state) => ({
  token: state.get('app').get('token'),
  appLoading: state.get('app').get('loading')
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(ProtectedRoute);
