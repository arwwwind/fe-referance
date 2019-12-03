import React from 'react';
import { Helmet } from 'react-helmet';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import logoSquare from '../../images/logo_square.svg';

const ForgotPassword = (props) => (
  <div className="login-page">
    <Helmet>
      <title>Forgot password</title>
    </Helmet>
    <img className="logo-square" src={logoSquare} alt="Juvo" />
    <ForgotPasswordForm onForgotPassword={props.onForgotPassword} loading={props.loading} />
  </div>
);

export default ForgotPassword;
