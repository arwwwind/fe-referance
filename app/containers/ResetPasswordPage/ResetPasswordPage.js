import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Errors from '../../components/Errors';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import logoSquare from '../../images/logo_square.svg';

class ResetPassword extends Component {
  /**
   * Check and validate token length
   * @function componentDidMount
   */
  componentDidMount() {
    if (this.props.match.params.token.length !== 60) {
      this.props.history.push('/');
    }
  }

  /**
   * Render reset password component
   * @function render
   */
  render() {
    return (
      <div className="login-page">
        <Helmet>
          <title>Reset password</title>
        </Helmet>
        <img className="logo-square" src={logoSquare} alt="Juvo" />
        <Errors errors={this.props.errors} />
        <ChangePasswordForm onResetPassword={this.props.onResetPassword} loading={this.props.loading} />
      </div>
    );
  }
}

export default ResetPassword;
