import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class ChangePasswordForm extends React.Component {
  state = {
    confirmDirty: false
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const { form, onResetPassword } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onResetPassword(values);
      }
    });
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['passwordConfirmation'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('The passwords do not match');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="juvo-login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" type="email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your new password' }, { validator: this.validateToNextPassword }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="New password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('passwordConfirmation', {
            rules: [{ required: true, message: 'Please confirm your new password' }, { validator: this.compareToFirstPassword }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm new password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem>
          <NavLink className="login-form-forgot" to="/login">Back to login</NavLink>
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={loading}>
            { loading ? 'Loading...' : 'Change password'}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ChangePasswordForm);
