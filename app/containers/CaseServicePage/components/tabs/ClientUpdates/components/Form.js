import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form as AntForm, Input, Button, Select } from 'antd';
import TextEditor from '../../../../../../components/Core/TextEditor';
import { saveClientUpdateStart } from '../actions';

class Form extends React.Component {
  state = {
    body: undefined
  };

  onBodyChange = (body) => this.setState({ body });

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.submit({ ...values, body: this.state.body }, form);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <AntForm layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
        <AntForm.Item label="Email">
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="Email" type="email" />)}
        </AntForm.Item>
        <AntForm.Item label="Subject">
          {getFieldDecorator('subject', {
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="Subject" type="text" />)}
        </AntForm.Item>
        <AntForm.Item label="Activity Type">
          {getFieldDecorator('activityType', {
            rules: [{ required: true, message: 'This field is required' }]
          })(
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder="Select activity type"
              optionFilterProp="children"
            >
              <Select.Option value="option1">Email</Select.Option>
              <Select.Option value="option2">Option 2</Select.Option>
              <Select.Option value="option3">Option 3</Select.Option>
            </Select>
          )}
        </AntForm.Item>
        <AntForm.Item label="Body Content">
          <TextEditor placeholder="Body Content" onChange={this.onBodyChange} />
        </AntForm.Item>
        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Save</Button>
        </div>
      </AntForm>
    );
  }
}

const mapDispatchToProps = (dispatch, { caseId, serviceId }) => ({
  submit: (data, form) => dispatch(saveClientUpdateStart(caseId, serviceId, data, form))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(AntForm.create()(Form));
