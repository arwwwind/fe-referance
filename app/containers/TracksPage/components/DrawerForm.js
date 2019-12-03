import React from 'react';
import { Input, Select, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';
import ResourceSelect from '../../../components/Core/ResourceSelect';
import Form from '../../../components/Core/Form';
import Preloader from '../../../components/Preloader';
import { valueOrUndefined } from '../../../utils/common';

class DrawerForm extends React.Component {
  onSubmit = (values) => {
    this.props.onSend({ ...values, preAssignedTo: parseInt(values.preAssignedToUser, 10) }, this.props.form);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { single } = this.props;

    if (single.get('loading')) {
      return <Preloader />;
    }

    const contactSelectTextAccessor = (option) => (`${option.firstName} ${option.lastName}`);
    const initialValues = single.get('data') ? single.get('data').toJS() : {};
    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Task Name">
              {getFieldDecorator('name', {
                initialValue: initialValues.name,
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input size="large" placeholder="Task Name" />)}
            </Form.Item>

            <Form.Item label="Pre-assigned To Whom">
              <div className="select-with-btn">
                {getFieldDecorator('preAssignedToUser', {
                  initialValue: initialValues.preAssignedToUser ? `${initialValues.preAssignedToUser.id}` : undefined,
                  rules: [{ required: true, message: 'This field is required' }]
                })(
                  <ResourceSelect name="contact-profiles" placeholder="Select or create an referred" size="large" optionFilterProp="children" linked={initialValues.preAssignedToUser} textAccesor={contactSelectTextAccessor} />
                )}
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

            <Form.Item label="Priority">
              {getFieldDecorator('priority', {
                initialValue: valueOrUndefined(initialValues.priority)
              })(
                <Select
                  size="large"
                  showSearch
                  showArrow={false}
                  style={{ width: '100%' }}
                  placeholder="Select priority"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Select.Option value="high">High</Select.Option>
                  <Select.Option value="medium">Medium</Select.Option>
                  <Select.Option value="low">Low</Select.Option>
                </Select>
              )}
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
                  placeholder="Task Type"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Select.Option value="meetings">Meetings</Select.Option>
                  <Select.Option value="done">Done</Select.Option>
                  <Select.Option value="inProgress">In Progress</Select.Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label="">
              {getFieldDecorator('description', {
                initialValue: valueOrUndefined(initialValues.description)
              })(<Input.TextArea size="large" rows={5} placeholder="Description" />)}
            </Form.Item>

          </Col>
        </Row>
        <div className="drawer-footer">
          <Row gutter={20}>
            {this.props.isEdit ?
              <Col span={12}>
                <Button className="btn-center" type="danger" size="large" onClick={this.props.onDelete} ghost>Delete Task</Button>
              </Col>
              : null}
            <Col span={12}>
              <Button className="btn-center" type="primary" size="large" htmlType="submit">Save Task</Button>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

export default Form.create()(DrawerForm);
