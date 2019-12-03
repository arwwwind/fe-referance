import React from 'react';
import _ from 'lodash';
import { Input, Select, Button } from 'antd';
import Form from '../../../components/Core/Form';
import Preloader from '../../../components/Preloader';

const { Option } = Select;

class DrawerForm extends React.Component {
  onSubmit = (values) => {
    this.props.onSend(_.extend({ manager: false }, values), this.props.form);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { single } = this.props;

    if (single.get('loading')) {
      return <Preloader />;
    }

    const initialValues = _.extend({
      loginEmail: undefined,
      googleEmailLogin: undefined,
      userType: 'user',
      active: 'true'
    }, single.get('data') ? single.get('data').toJS() : {});
    initialValues.firstName = initialValues.profile ? `${initialValues.profile.firstName}` : undefined;
    initialValues.lastName = initialValues.profile ? `${initialValues.profile.lastName}` : undefined;

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        <Form.Item label="First Name">
          {getFieldDecorator('firstName', {
            initialValue: initialValues.firstName,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="First Name" />)}
        </Form.Item>
        <Form.Item label="Last Name">
          {getFieldDecorator('lastName', {
            initialValue: initialValues.lastName,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="Last Name" />)}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('loginEmail', {
            initialValue: initialValues.loginEmail,
            rules: [
              { type: 'email', message: 'Please enter a valid email address' },
              { required: true, message: 'This field is required' }
            ]
          })(<Input size="large" placeholder="Email" type="email" />)}
        </Form.Item>
        <Form.Item label="Google Email">
          {getFieldDecorator('googleEmailLogin', {
            initialValue: initialValues.googleEmailLogin,
            rules: [{ type: 'email', message: 'Please enter a valid email address' }]
          })(<Input size="large" placeholder="Google Email" type="email" />)}
        </Form.Item>
        <Form.Item label="User Type">
          {getFieldDecorator('userType', {
            initialValue: initialValues.userType,
            rules: [{ required: true, message: 'This field is required' }],
          })(
            <Select
              size="large"
              placeholder="Select user type"
              onChange={this.handleSelectChange}
            >
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Active">
          {getFieldDecorator('active', {
            initialValue: initialValues.active ? 'true' : 'false',
            rules: [{ required: true, message: 'This field is required' }],
          })(
            <Select
              size="large"
              placeholder="Active"
              onChange={this.handleSelectChange}
            >
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
          )}
        </Form.Item>
        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Save User</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(DrawerForm);
