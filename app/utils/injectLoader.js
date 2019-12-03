import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Icon, Spin } from 'antd';

export const WITH_LOADER = 'WITH_LOADER';
export const WITHOUT_LOADER = 'WITHOUT_LOADER';

const spinIcon = <Icon type="loading" spin />;

const Preloader = () => (
  <Spin className="global-loading" indicator={spinIcon} />
);

const mapStateToProps = (state) => ({
  appLoading: state.get('app').get('loading')
});

const withConnect = connect(mapStateToProps);

export default (options = { mode: WITH_LOADER }) => (WrappedComponent) => compose(withConnect)(({ appLoading, ...props }) => {
  if (appLoading) {
    if (options.mode !== WITHOUT_LOADER) {
      return <Preloader />;
    }

    return null;
  }

  return <WrappedComponent {...props} />;
});
