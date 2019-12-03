import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Input, Button, Select, DatePicker } from 'antd';
import Form from '../../../../../../components/Core/Form';
import Preloader from '../../../../../../components/Preloader';
import ResourceSelect from '../../../../../../components/Core/ResourceSelect';
import AddVenueButton from '../../../../../VenuesPage/Venues/components/AddVenueButton';
import AddJudgeButton from '../../../../../VenuesPage/Judges/components/AddJudgeButton';
import { AddContactButton } from '../../../../../ContactsPage';
import { serviceSelectTextAccessor } from '../../../../../../utils/common';

class DrawerForm extends React.Component {
  state = {
    typeValue: ''
  };

  onSubmit = (values) => {
    this.props.onSend(_.extend({ manager: false }, values), this.props.form);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { single } = this.props;
    const contactSelectTextAccessor = (option) => (`${option.firstName} ${option.lastName}`);
    const judgeSelectTextAccessor = (option) => (`${option.firstName} ${option.lastName}`);
    if (single.get('loading')) {
      return <Preloader />;
    }

    const initialValues = single.get('data') ? single.get('data').toJS() : {};

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>

        {this.props.onCalendar ? (
          <Form.Item label="Selected Service">
            <div className="select-with-btn">
              {getFieldDecorator('serviceId', {
                initialValue: initialValues.service ? `${initialValues.service.id}` : undefined,
                rules: [{ required: true, message: 'This field is required' }]
              })(
                <ResourceSelect name="services" placeholder="Select a service" size="large" linked={initialValues.service} textAccesor={serviceSelectTextAccessor} />
              )}
            </div>
          </Form.Item>
        ) : null}
        <Form.Item label="Date - time">
          {getFieldDecorator('dateTime', {
            initialValue: initialValues.dateTime ? moment(initialValues.dateTime) : undefined,
            rules: [{ required: true, message: 'This field is required' }]
          })(
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime
              style={{ width: '100%' }}
              placeholder="Date - time"
            />
          )}
        </Form.Item>
        <Form.Item label="Type">
          {getFieldDecorator('type', {
            initialValue: initialValues.type ? initialValues.type : undefined,
            onChange: (val) => this.setState({ typeValue: val })
          })(
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder="Select type"
              optionFilterProp="children"
            >
              <Select.Option value="hearing">Hearing</Select.Option>
              <Select.Option value="type2">Type 2</Select.Option>
            </Select>
          )}
        </Form.Item>
        {this.state.typeValue === 'hearing' ? (
          <Form.Item label="Venue">
            <div className="select-with-btn">
              {getFieldDecorator('venueId', {
                initialValue: initialValues.venue ? `${initialValues.venue.id}` : undefined
              })(
                <ResourceSelect name="venues" placeholder="Select or create venue" size="large" linked={initialValues.venue} />
              )}
              <AddVenueButton />
            </div>
          </Form.Item>
        ) : null}

        {this.state.typeValue === 'hearing' ? (
          <Form.Item label="Judge">
            <div className="select-with-btn">
              {getFieldDecorator('judgeId', {
                initialValue: initialValues.judge ? `${initialValues.judge.id}` : undefined
              })(
                <ResourceSelect name="judges" placeholder="Select or create judge" size="large" linked={initialValues.judge} textAccesor={judgeSelectTextAccessor} />
              )}
              <AddJudgeButton />
            </div>
          </Form.Item>
        ) : null}

        <Form.Item label="Scheduled or Random">
          {getFieldDecorator('scheduledOrRandom', {
            initialValue: initialValues.scheduledOrRandom ? initialValues.scheduledOrRandom : undefined
          })(
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder="Select scheduled or random"
              optionFilterProp="children"
            >
              <Select.Option value="scheduled">Scheduled</Select.Option>
              <Select.Option value="random">Random</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Rep">
          <div className="select-with-btn">
            {getFieldDecorator('repId', {
              initialValue: initialValues.rep ? `${initialValues.rep.id}` : undefined
            })(
              <ResourceSelect name="contact-profiles" placeholder="Select or create a rep" size="large" optionFilterProp="children" linked={initialValues.rep} textAccesor={contactSelectTextAccessor} />
            )}
            <AddContactButton />
          </div>
        </Form.Item>

        <Form.Item label="Rep Confirmed">
          {getFieldDecorator('resourceConfirmed', {
            initialValue: _.isBoolean(initialValues.resourceConfirmed) ? `${initialValues.resourceConfirmed}` : undefined
          })(
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder="Select confirmed or not confirmed"
              optionFilterProp="children"
            >
              <Select.Option value="true">Confirmed</Select.Option>
              <Select.Option value="false">Not Confirmed</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Description">
          {getFieldDecorator('description', {
            initialValue: initialValues.description ? initialValues.description : undefined
          })(<Input.TextArea size="large" placeholder="Description" rows={4} />)}
        </Form.Item>

        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Save Person Event</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(DrawerForm);
