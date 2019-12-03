import React from 'react';
import { Input, Button, DatePicker, Select } from 'antd';
import Form from '../../../../../components/Core/Form';
import ResourceSelect from '../../../../../components/Core/ResourceSelect';
import { AddVenueButton } from '../../../../VenuesPage/Venues';
import { AddJudgeButton } from '../../../../VenuesPage/Judges';
import Preloader from '../../../../../components/Preloader/Preloader';

const judgeSelectTextAccessor = (option) => (`${option.firstName} ${option.lastName}`);

class EventForm extends React.Component {
  onSubmit = (values) => {
    this.props.onSend(values, this.props.form);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { single } = this.props;
    const initialValues = {};

    if (single.loading) {
      return <Preloader />;
    }

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        <div className="select-with-btn">
          <Form.Item label="Selected Service">
            {getFieldDecorator('selectedService', {
              initialValue: initialValues.selectedService,
              rules: [{ required: true, message: 'This field is required' }]
            })(
              <Select
                size="large"
                showSearch
                showArrow={false}
                style={{ width: '100%' }}
                placeholder="Select or create a service"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Select.Option value="option1">Service 1</Select.Option>
                <Select.Option value="option2">Service 2</Select.Option>
                <Select.Option value="option3">Service 3</Select.Option>
              </Select>
            )}
            <Button type="primary" size="small">Add or Link</Button>
          </Form.Item>
          <Form.Item label="Service">
            <div className="select-with-btn">
              {getFieldDecorator('serviceId', {
                initialValue: initialValues.serviceId ? `${initialValues.serviceId}` : undefined,
                rules: [{ required: true, message: 'This field is required' }]
              })(
                <ResourceSelect name="services" placeholder="Select or create a service" size="large" linked={initialValues.judge} textAccesor={judgeSelectTextAccessor} />
              )}
              <AddJudgeButton />
            </div>
          </Form.Item>
        </div>
        <Form.Item label="Date Time">
          {getFieldDecorator('dateTime', {
            initialValue: initialValues.dateTime,
            rules: [{ required: true, message: 'This field is required' }]
          })(<DatePicker format="YYYY-MM-DD HH:mm:ss" showTime style={{ width: '100%' }} placeholder="Date Time" />)}
        </Form.Item>
        <Form.Item label="Type">
          {getFieldDecorator('type', {
            initialValue: initialValues.type,
            rules: [{ required: true, message: 'This field is required' }]
          })(
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder="Select type"
              optionFilterProp="children"
            >
              <Select.Option value="option1">Hearing</Select.Option>
              <Select.Option value="option2">Type 2</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Scheduled or Random">
          {getFieldDecorator('scheduledOrRandom', {
            initialValue: initialValues.scheduledOrRandom,
            rules: [{ required: true, message: 'This field is required' }]
          })(
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder="Select scheduled or random"
              optionFilterProp="children"
            >
              <Select.Option value="option1">Scheduled</Select.Option>
              <Select.Option value="option2">Random</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Rep Confirmed">
          {getFieldDecorator('repConfirmed', {
            initialValue: initialValues.repConfirmed,
            rules: [{ required: true, message: 'This field is required' }]
          })(
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder="Select rep confirmed"
              optionFilterProp="children"
            >
              <Select.Option value="option1">Confirmed</Select.Option>
              <Select.Option value="option2">Not confirmed</Select.Option>
            </Select>
          )}
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
        <Form.Item label="Judge">
          <div className="select-with-btn">
            {getFieldDecorator('judgeId', {
              initialValue: initialValues.judgeId ? `${initialValues.judgeId}` : undefined,
              rules: [{ required: true, message: 'This field is required' }]
            })(
              <ResourceSelect name="judges" placeholder="Select or create a judge" size="large" linked={initialValues.judge} textAccesor={judgeSelectTextAccessor} />
            )}
            <AddJudgeButton />
          </div>
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            initialValue: initialValues.description
          })(<Input.TextArea size="large" placeholder="Description" rows={4} />)}
        </Form.Item>
        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Save</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(EventForm);
