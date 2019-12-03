import React from 'react';
import { Button, DatePicker } from 'antd';
import Form from '../../../../components/Core/Form';

class DrawerForm extends React.Component {
  onSubmit = (values) => {
    this.props.onSend(values, this.props.form);
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        <Form.Item label="Start Date">
          {getFieldDecorator('startDate', {
            rules: [{ required: true, message: 'This field is required' }]
          })(<DatePicker style={{ width: '100%' }} placeholder="Start Date" />)}
        </Form.Item>
        <Form.Item label="End Date">
          {getFieldDecorator('endDate', {
            rules: [{ required: true, message: 'This field is required' }]
          })(<DatePicker style={{ width: '100%' }} placeholder="End Date" />)}
        </Form.Item>
        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Generate Report</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(DrawerForm);
