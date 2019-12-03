import React from 'react';
import { Form, Input, Button, Select, Drawer, DatePicker } from 'antd';

const pristineState = {
  noteType: undefined,
  subject: '',
  activityType: '',
  bodyContent: ''
};

class PersonEventForm extends React.Component {
  state = _.assign({ visible: false }, pristineState);

  onClose = () => {
    this.setState({ visible: false });
  };

  openDrawer = () => {
    this.setState({ visible: true });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        form.setFieldsValue(pristineState);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button type="primary" icon="plus" size="large" onClick={() => this.openDrawer()}>Create In Person Event</Button>
        <Drawer
          onClose={this.onClose}
          visible={this.state.visible}
          title="Add In Person Event"
          width={407}
          placement="right"
          maskClosable={false}
          style={{
            height: 'calc(100% - 212px)',
            overflow: 'auto',
          }}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
            <Form.Item label="Selected Service">
              {getFieldDecorator('selectedService', {
                initialValue: this.state.selectedService,
                rules: [{ required: true, message: 'This field is required' }]
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select service"
                  optionFilterProp="children"
                >
                  <Select.Option value="option1">Walk Through</Select.Option>
                  <Select.Option value="option2">Misc</Select.Option>
                  <Select.Option value="option2">Etc...</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Date - time">
              {getFieldDecorator('dateTime', {
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
            <div className="select-with-btn">
              <Form.Item label="Rep">
                {getFieldDecorator('rep', {
                  initialValue: this.state.rep,
                  rules: [{ required: true, message: 'This field is required' }]
                })(
                  <Select
                    size="large"
                    showSearch
                    showArrow={false}
                    style={{ width: '100%' }}
                    placeholder="Select or create Rep"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Select.Option value="option1">Option 1</Select.Option>
                    <Select.Option value="option2">Option 2</Select.Option>
                    <Select.Option value="option3">Option 3</Select.Option>
                  </Select>
                )}
                <Button type="primary" size="small">Add or Link</Button>
              </Form.Item>
            </div>
            <Form.Item label="Scheduled or Random">
              {getFieldDecorator('scheduledOrRandom', {
                initialValue: this.state.scheduledOrRandom,
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
            <Form.Item label="Rep Confirmed?">
              {getFieldDecorator('repConfirmed', {
                initialValue: this.state.repConfirmed,
                rules: [{ required: true, message: 'This field is required' }]
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select confirmed or not confirmed"
                  optionFilterProp="children"
                >
                  <Select.Option value="option1">Confirmed</Select.Option>
                  <Select.Option value="option2">Not Confirmed</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Body Content">
              {getFieldDecorator('bodyContent', {
                initialValue: this.state.bodyContent
              })(<Input.TextArea size="large" placeholder="Body Content" rows={4} />)}
            </Form.Item>
            <div className="text-title m-b-xxl">If Type Hearing</div>
            <div className="select-with-btn">
              <Form.Item label="Venue">
                {getFieldDecorator('venue', {
                  initialValue: this.state.venue,
                  rules: [{ required: true, message: 'This field is required' }]
                })(
                  <Select
                    size="large"
                    showSearch
                    showArrow={false}
                    style={{ width: '100%' }}
                    placeholder="Select or create Venue"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Select.Option value="option1">Deedham district Court</Select.Option>
                    <Select.Option value="option2">Option 2</Select.Option>
                    <Select.Option value="option3">Option 3</Select.Option>
                  </Select>
                )}
                <Button type="primary" size="small">Add or Link</Button>
              </Form.Item>
            </div>
            <div className="select-with-btn">
              <Form.Item label="Judge">
                {getFieldDecorator('judge', {
                  initialValue: this.state.judge,
                  rules: [{ required: true, message: 'This field is required' }]
                })(
                  <Select
                    size="large"
                    showSearch
                    showArrow={false}
                    style={{ width: '100%' }}
                    placeholder="Select or create Judge"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Select.Option value="option1">Judy Judge</Select.Option>
                    <Select.Option value="option2">Option 2</Select.Option>
                    <Select.Option value="option3">Option 3</Select.Option>
                  </Select>
                )}
                <Button type="primary" size="small">Add or Link</Button>
              </Form.Item>
            </div>
            <div className="drawer-footer">
              <Button className="btn-center" type="primary" size="large" htmlType="submit">Save</Button>
            </div>
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default Form.create()(PersonEventForm);
