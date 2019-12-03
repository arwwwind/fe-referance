import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const AdminRoute = ({ token, isAdmin, appLoading, ...props }) => {
  if (appLoading) {
    return <Route {...props} />;
  }

  return (
    token ? isAdmin ? <Route {...props} /> : <Redirect to="" /> : <Redirect to="/login" />
  );
};

const mapStateToProps = (state) => {
  const app = state.get('app');
  return {
    appLoading: state.get('app').get('loading'),
    token: app.get('token'),
    isAdmin: app.get('user') ? app.get('user').get('userType') === 'admin' : false
  };
};

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(AdminRoute);
