import React from 'react';
import { Input, Button } from 'antd';
import Form from '../../../../components/Core/Form';
import ResourceSelect from '../../../../components/Core/ResourceSelect';
import Preloader from '../../../../components/Preloader';
import { AddVenueButton } from '../../Venues';

class DrawerForm extends React.Component {
  onSubmit = (values) => {
    this.props.onSend(values, this.props.form);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { single } = this.props;

    if (single.get('loading')) {
      return <Preloader />;
    }

    const initialValues = single.get('data') ? single.get('data').toJS() : {};
    initialValues.name = (initialValues.firstName || initialValues.lastName) ? `${initialValues.firstName} ${initialValues.lastName}` : '';

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: initialValues.name,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="Name" />)}
        </Form.Item>
        <Form.Item label="Venue">
          <div className="select-with-btn">
            {getFieldDecorator('venueId', {
              initialValue: initialValues.venueId ? `${initialValues.venueId}` : undefined,
              rules: [{ required: true, message: 'This field is required' }]
            })(
              <ResourceSelect name="venues" placeholder="Select or create a venue" size="large" linked={initialValues.venue} />
            )}
            <AddVenueButton />
          </div>
        </Form.Item>
        <Form.Item label="Judge Notes">
          {getFieldDecorator('judgeNotes', {
            initialValue: initialValues.judgeNotes
          })(<Input.TextArea size="large" placeholder="Judge Notes" rows={4} />)}
        </Form.Item>
        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Save Judge</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(DrawerForm);
