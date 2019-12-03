import React from 'react';
import { Button, Col, DatePicker, Input, InputNumber, Row, Select } from 'antd';
import Form from '../../../../../../components/Core/Form';
import Footer from '../../../SaveService/components/Wizard/Footer';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {};

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

  onChangeFlagged = (flagged) => this.setState({ flagged });

  render() {
    const { form, visible, stepIsActive, step } = this.props;
    const { getFieldDecorator } = form;
    const style = visible ? {} : { display: 'none' };

    if (!stepIsActive(step)) {
      return null;
    }

    return (
      <Form form={form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit} style={style}>
        {!this.props.initialValues ? (
          <Button className="btn-in-header" type="primary" size="large" htmlType="submit" onClick={this.props.onRequestedStatusChange} value="draft">Save Draft</Button>
        ) : null}
        <Row gutter={20} className="p-b-extra-xs">
          <Col span={12}>
            <Form.Item label="Balance">
              {getFieldDecorator('balance', {
                initialValue: this.state.balance,
                rules: [{ required: true, message: 'This field is required' }]
              })(
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
                  optionFilterProp="children"
                  placeholder="Balance"
                />
              )}
            </Form.Item>
            <Form.Item label="Demand">
              {getFieldDecorator('demand', {
                initialValue: this.state.demand,
                rules: [{ required: true, message: 'This field is required' }]
              })(
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
                  optionFilterProp="children"
                  placeholder="Demand"
                />
              )}
            </Form.Item>
            <Form.Item label="Date of Service Start">
              {getFieldDecorator('dateOfServiceStart', {
                initialValue: this.state.dateOfServiceStart,
                rules: [{ required: true, message: 'This field is required' }]
              })(<DatePicker style={{ width: '100%' }} placeholder="Date of Service Start" />)}
            </Form.Item>
            <Form.Item label="Date of Service End">
              {getFieldDecorator('dateOfServiceEnd', {
                initialValue: this.state.dateOfServiceEnd,
                rules: [{ required: true, message: 'This field is required' }]
              })(<DatePicker style={{ width: '100%' }} placeholder="Date of Service End" />)}
            </Form.Item>
            <Form.Item label="Flag">
              {getFieldDecorator('flagged', {
                initialValue: this.state.flagged,
                rules: [{ required: true, message: 'This field is required' }]
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select yes or no"
                  optionFilterProp="children"
                  onChange={this.onChangeFlagged}
                >
                  <Select.Option value="true">Yes</Select.Option>
                  <Select.Option value="false">No</Select.Option>
                </Select>
              )}
            </Form.Item>
            {this.state.flagged === 'true' ? (
              <Form.Item label="Flag Reason">
                {getFieldDecorator('flagReason', {
                  initialValue: this.state.flagReason,
                  rules: [{ required: true, message: 'This field is required' }]
                })(<Input size="large" placeholder="Flag Reason" />)}
              </Form.Item>
            ) : null}
            <Form.Item label="Defences">
              {getFieldDecorator('defenses', {
                initialValue: this.state.defenses,
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input size="large" placeholder="Defences" />)}
            </Form.Item>
          </Col>
        </Row>

        <Footer percent={100} goBack={this.props.goBack} step={step} lastStep onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
