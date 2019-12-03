import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from '../../components/LoginForm';
import Errors from '../../components/Errors';
import logoSquare from '../../images/logo_square.svg';

const Login = (props) => {
  const { onLogin, app } = props;
  const errors = app.get('error') ? app.get('error').toJS() : null;
  return (
    <div className="login-page">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <img className="logo-square" src={logoSquare} alt="Juvo" />
      <Errors errors={errors} />
      <LoginForm onLogin={onLogin} app={app} errors={errors} />
    </div>
  );
};

export default Login;
