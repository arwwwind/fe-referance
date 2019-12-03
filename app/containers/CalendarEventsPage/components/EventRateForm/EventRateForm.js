import React from 'react';
import { Input, Button, Select, Rate } from 'antd';
import Form from '../../../../components/Core/Form';
import Preloader from '../../../../components/Preloader/Preloader';
import { checkValidValue } from '../../../../utils/common';

class EventRateForm extends React.Component {
  onSubmit = (values) => {
    this.props.onSend(values, this.props.form);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { single } = this.props;

    const initialValues = single.data ? single.data : {};

    if (single.loading) {
      return <Preloader />;
    }

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        <Form.Item label="Rating">
          {getFieldDecorator('rating', {
            initialValue: checkValidValue(initialValues.rating) ? `${initialValues.rating}` : undefined,
            rules: [{ required: true, message: 'This field is required' }]
          })(
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder="Select rate"
              optionFilterProp="children"
            >
              <Select.Option value="1"><Rate disabled value={1} /></Select.Option>
              <Select.Option value="2"><Rate disabled value={2} /></Select.Option>
              <Select.Option value="3"><Rate disabled value={3} /></Select.Option>
              <Select.Option value="4"><Rate disabled value={4} /></Select.Option>
              <Select.Option value="5"><Rate disabled value={5} /></Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('ratingReason', {
            initialValue: checkValidValue(initialValues.ratingReason) ? initialValues.ratingReason : undefined
          })(<Input.TextArea size="large" placeholder="Description" rows={4} />)}
        </Form.Item>
        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Save</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(EventRateForm);
