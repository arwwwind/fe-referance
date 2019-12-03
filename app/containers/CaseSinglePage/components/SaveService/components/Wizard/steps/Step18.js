import React from 'react';
import extend from 'lodash/extend';
import { Button, Checkbox, Col, Row, Select } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import { valueOrUndefined } from '../../../../../../../utils/common';
import { accountSettlementLanguage } from './Step19';

class Step extends React.Component {
  state = this.props.initialValues ? extend({
    medicalReportReference: this.props.initialValues.get('step') > this.props.step,
    confirmSignatureDate: this.props.initialValues.get('step') > this.props.step
  }, this.props.initialValues.toJS()) : {
    walkthrough: {},
    medicalReportReference: false,
    confirmSignatureDate: false
  };

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

  onSettlementLanguageChange = (settlementLanguage) => this.setState({ settlementLanguage });

  onChangeProgressCheck = (e) => this.setState({ [e.target.id]: e.target.checked });

  render() {
    const { form, visible, stepIsActive, step } = this.props;
    const { getFieldDecorator } = form;
    const style = visible ? {} : { display: 'none' };

    if (!stepIsActive(step)) {
      return null;
    }

    return (
      <Form form={form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit} style={style} shouldValidate={false}>
        {!this.props.initialValues ? (
          <Button className="btn-in-header" type="primary" size="large" htmlType="submit" onClick={this.props.onRequestedStatusChange} value="draft">Save Draft</Button>
        ) : null}
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Does settlement language comply with account requirements?">
              {getFieldDecorator('settlementLanguage', {
                initialValue: valueOrUndefined(this.state.settlementLanguage)
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select yes or no"
                  optionFilterProp="children"
                  onChange={this.onSettlementLanguageChange}
                >
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              )}
            </Form.Item>
            {accountSettlementLanguage(this.state.case) ? (
              <Form.Item>
                <p className="m-0 f-s-16 t-muted">
                  {accountSettlementLanguage(this.state.case)}
                </p>
              </Form.Item>
            ) : null}
            <Form.Item>
              {getFieldDecorator('medicalReportReference', {
                valuePropName: 'checked',
                initialValue: this.state.medicalReportReference,
              })(<Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Medical report referenced? Name and Date?</Checkbox>)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('confirmSignatureDate', {
                valuePropName: 'checked',
                initialValue: this.state.confirmSignatureDate,
              })(<Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Confirm Signature and date</Checkbox>)}
            </Form.Item>
          </Col>
        </Row>

        <Footer percent={37.5} goBack={this.props.goBack} step={step} lastStep={false} nextDisabled={!this.state.medicalReportReference || !this.state.confirmSignatureDate} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
