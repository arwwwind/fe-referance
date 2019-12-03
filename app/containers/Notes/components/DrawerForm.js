import React from 'react';
import { Input, Select, Button } from 'antd';
import { UploadMultipleFiles } from '../../../components/Upload';
import Form from '../../../components/Core/Form';
import Preloader from '../../../components/Preloader';
import { noteTypes } from '../config';

class DrawerForm extends React.Component {
  state = {
    filesToRemove: []
  };

  onSubmit = (values) => {
    const filesToRemove = this.state.filesToRemove.map((file) => file.id);
    this.props.onSend({ ...values, idsToRemove: filesToRemove }, this.props.form);
  };

  getRemovedFiles = (list) => {
    this.setState({ filesToRemove: list });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { single, save } = this.props;

    if (single.get('loading') || save.get('loading')) {
      return <Preloader />;
    }

    const initialValues = single.get('data') ? single.get('data').toJS() : {};

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        <Form.Item label="Note Type">
          {getFieldDecorator('type', {
            initialValue: initialValues.type,
            rules: [{ required: true, message: 'This field is required' }]
          })(
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder="Select note type"
              optionFilterProp="children"
            >
              {noteTypes.map((type) => (<Select.Option key={type.value} value={type.value}>{type.name}</Select.Option>))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Subject">
          {getFieldDecorator('subject', {
            initialValue: initialValues.subject,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="Subject" />)}
        </Form.Item>
        <Form.Item label="Activity Type">
          {getFieldDecorator('activityType', {
            initialValue: initialValues.activityType,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="Activity Type" />)}
        </Form.Item>
        <Form.Item label="Body Content">
          {getFieldDecorator('content', {
            initialValue: initialValues.content
          })(<Input.TextArea size="large" placeholder="Body Content" rows={4} />)}
        </Form.Item>
        <Form.Item label="Attachments">
          {getFieldDecorator('files', {})(<UploadMultipleFiles files={initialValues.files} removeList={this.getRemovedFiles} />)}
        </Form.Item>
        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Save</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(DrawerForm);
