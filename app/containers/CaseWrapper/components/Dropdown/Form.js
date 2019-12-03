import React from 'react';
import { Input, Button } from 'antd';
import Form from '../../../../components/Core/Form';

class DrawerForm extends React.Component {
  onSubmit = (values) => {
    this.props.onSend(values, this.props.form);
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        <Form.Item label="Reason">
          {getFieldDecorator('reason', {
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input.TextArea size="large" placeholder="Reason" rows={6} />)}
        </Form.Item>
        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Submit</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(DrawerForm);
