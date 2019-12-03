import React from 'react';
import moment from 'moment';
import { Input, Button, DatePicker, Select } from 'antd';
import Form from '../../../components/Core/Form';
import Preloader from '../../../components/Preloader';
import ResourceSelect from '../../../components/Core/ResourceSelect';
import { AddContactButton } from '../../ContactsPage';
import { valueOrUndefined, serviceSelectTextAccessor } from '../../../utils/common';
import { generateCaseName } from '../../CasesPage/methods';

const getDataFromPath = (currentPath) => {
  const destructPath = currentPath.split('/');
  return {
    caseId: destructPath[2],
    serviceId: destructPath[4],
    selectedCaseId: destructPath[2]
  };
};

class DrawerForm extends React.Component {
  state = {
    selectedCaseId: undefined,
    caseId: undefined,
    serviceId: undefined,
    ...getDataFromPath(this.props.currentPath)
  };

  onSubmit = (values) => {
    this.props.onSend({ ...values, serviceId: values.serviceId ? values.serviceId : this.state.serviceId }, this.props.form);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { single } = this.props;
    const caseSelectTextAccessor = (option) => generateCaseName(option.injuredWorker, option.claims, option.referralId);

    if (single.get('loading')) {
      return <Preloader />;
    }

    const initialValues = single.get('data') ? single.get('data').toJS() : {
      claims: []
    };

    const contactSelectTextAccessor = (option) => (`${option.firstName} ${option.lastName}`);

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        {!this.state.caseId ? (
          <Form.Item label="Selected Case">
            <div className="select-with-btn">
              {getFieldDecorator('caseId', {
                initialValue: initialValues.resource && initialValues.resource.service ? `${initialValues.resource.service.caseId}` : this.state.selectedCaseId ? `${this.state.selectedCaseId}` : undefined,
                onChange: (val, opt) => this.setState({ selectedCaseId: opt.key })
              })(
                <ResourceSelect name="cases" placeholder="Select a case" size="large" textAccesor={caseSelectTextAccessor} />
              )}
            </div>
          </Form.Item>
        ) : null}
        {(!this.state.serviceId && (this.state.selectedCaseId || this.props.isEdit)) ? (
          <Form.Item label="Selected Service">
            <div className="select-with-btn">
              {getFieldDecorator('serviceId', {
                initialValue: (initialValues.resource && initialValues.resource.serviceId) ? `${initialValues.resource.serviceId}` : undefined
              })(
                <ResourceSelect name={`services?caseId=${this.state.selectedCaseId}`} placeholder="Select a service" size="large" textAccesor={serviceSelectTextAccessor} />
              )}
            </div>
          </Form.Item>
        ) : null}
        <Form.Item label="Task Name">
          {getFieldDecorator('name', {
            initialValue: initialValues.name,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="Task Name" />)}
        </Form.Item>
        <Form.Item label="Assign To Whom">
          <div className="select-with-btn">
            {getFieldDecorator('workerId', {
              initialValue: initialValues.worker ? `${initialValues.worker.id}` : undefined,
              rules: [{ required: true, message: 'This field is required' }]
            })(
              <ResourceSelect name="contact-profiles" placeholder="Select or create assign" size="large" optionFilterProp="children" linked={initialValues.worker} textAccesor={contactSelectTextAccessor} />
            )}
            <AddContactButton />
          </div>
        </Form.Item>
        <Form.Item label="Task Due Date">
          {getFieldDecorator('dueDate', {
            initialValue: initialValues.dueDate ? moment(initialValues.dueDate) : undefined,
            rules: [{ required: true, message: 'This field is required' }]
          })(<DatePicker style={{ width: '100%' }} placeholder="Task Due Date" />)}
        </Form.Item>
        <Form.Item label="Summary">
          {getFieldDecorator('summary', {
            initialValue: valueOrUndefined(initialValues.summary)
          })(<Input size="large" placeholder="Summary" />)}
        </Form.Item>
        <Form.Item label="Task Type">
          {getFieldDecorator('taskType', {
            initialValue: valueOrUndefined(initialValues.taskType)
          })(
            <Select
              size="large"
              showSearch
              showArrow={false}
              style={{ width: '100%' }}
              placeholder="Select task type"
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Select.Option value="meetings">Meetings</Select.Option>
              <Select.Option value="done">Done</Select.Option>
              <Select.Option value="inProgress">In progress</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            initialValue: valueOrUndefined(initialValues.description)
          })(<Input.TextArea size="large" placeholder="Description" rows={4} />)}
        </Form.Item>
        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Save Task</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(DrawerForm);
