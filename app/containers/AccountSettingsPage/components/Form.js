import React from 'react';
import { Form, Input, Button } from 'antd';

class AccountSettingsForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;

    form.validateFields((err, values) => {
      if ((values.password || values.passwordConfirmation) && (values.password !== values.passwordConfirmation)) {
        form.setFields({
          passwordConfirmation: { value: '', errors: [new Error('The passwords do not match')] }
        });
      } else if (!err) {
        this.props.onSubmit(values, form);
        form.setFields({
          password: { value: undefined },
          passwordConfirmation: { value: undefined }
        });
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
    const { user } = this.props.profile;

    return (
      <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
        <Form.Item label="First Name">
          {getFieldDecorator('firstName', {
            initialValue: user.profile.firstName,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="First Name" />)}
        </Form.Item>
        <Form.Item label="Last Name">
          {getFieldDecorator('lastName', {
            initialValue: user.profile.lastName,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="Last Name" />)}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('loginEmail', {
            initialValue: user.loginEmail,
            rules: [
              { type: 'email', message: 'Please enter a valid email address' },
              { required: true, message: 'This field is required' }
            ]
          })(<Input size="large" placeholder="Email" type="email" />)}
        </Form.Item>
        <Form.Item label="Google Email">
          {getFieldDecorator('googleEmailLogin', {
            initialValue: user.googleEmailLogin,
            rules: [{ type: 'email', message: 'Please enter a valid email address' }]
          })(<Input size="large" placeholder="Google Email" type="email" />)}
        </Form.Item>
        <Form.Item label="New Password">
          {getFieldDecorator('password', {
            rules: [{ required: false, message: 'Please input your new password' }, { validator: this.validateToNextPassword }],
          })(
            <Input type="password" placeholder="New Password" />
          )}
        </Form.Item>
        <Form.Item label="Confirm Password">
          {getFieldDecorator('passwordConfirmation', {
            rules: [{ required: false, message: 'Please confirm your new password' }, { validator: this.compareToFirstPassword }],
          })(
            <Input type="password" placeholder="Confirm new password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <div className="account-settings-save">
          <Button className="btn-center" type="primary" size="large" htmlType="submit" loading={this.props.profile.loading}>Save</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(AccountSettingsForm);
