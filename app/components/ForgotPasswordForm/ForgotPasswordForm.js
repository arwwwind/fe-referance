import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class ForgotPasswordForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const { form, onForgotPassword } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onForgotPassword(values);
      }
    });
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
          <NavLink className="login-form-forgot" to="/login">Back to login</NavLink>
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={loading}>
            { loading ? 'Loading...' : 'Reset password'}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ForgotPasswordForm);
