import React from 'react';
import _ from 'lodash';
import { Input, InputNumber, Button, Select, DatePicker } from 'antd';
import Form from '../../../../../../components/Core/Form';
import Preloader from '../../../../../../components/Preloader';
import { convertToMoment } from '../../../../../../utils/common';

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

    const initialValues = single.get('data') ? single.get('data').toJS() : {};

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        <Form.Item label="Company">
          {getFieldDecorator('partnerName', {
            initialValue: initialValues.partnerName,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="Company" />)}
        </Form.Item>
        <Form.Item label="Status">
          {getFieldDecorator('status', {
            initialValue: initialValues.status,
            rules: [{ required: true, message: 'This field is required' }]
          })(
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder="Status"
              optionFilterProp="children"
            >
              <Select.Option value="success">Success</Select.Option>
              <Select.Option value="failure">Failure</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Initial Offer">
          {getFieldDecorator('offerDate', {
            initialValue: initialValues.offerDate ? convertToMoment(initialValues.offerDate) : undefined,
            rules: [{ required: true, message: 'This field is required' }]
          })(<DatePicker style={{ width: '100%' }} placeholder="Initial Offer" />)}
        </Form.Item>
        <Form.Item label="Future Medical Amount">
          {getFieldDecorator('medicalAmount', {
            initialValue: initialValues.medicalAmount,
            rules: [{ required: true, message: 'This field is required' }]
          })(
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
              optionFilterProp="children"
            />
          )}
        </Form.Item>
        <Form.Item label="Contract Sign Date">
          {getFieldDecorator('signDate', {
            initialValue: initialValues.signDate ? convertToMoment(initialValues.signDate) : undefined,
            rules: [{ required: true, message: 'This field is required' }]
          })(<DatePicker style={{ width: '100%' }} placeholder="Contract Sign Date" />)}
        </Form.Item>
        <Form.Item label="Decline Reason">
          {getFieldDecorator('declineReason', {
            initialValue: initialValues.declineReason
          })(<Input size="large" placeholder="Decline Reason" />)}
        </Form.Item>

        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Save Partner Company</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(DrawerForm);
