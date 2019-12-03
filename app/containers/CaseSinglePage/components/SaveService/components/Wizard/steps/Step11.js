import React from 'react';
import extend from 'lodash/extend';
import { Button, Checkbox, Col, Input, Row, Select, DatePicker } from 'antd';
import moment from 'moment';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import { valueOrUndefined } from '../../../../../../../utils/common';

class Step extends React.Component {
  state = this.props.initialValues ? extend({
    uanOnDraft: this.props.initialValues.get('step') > this.props.step,
    claimEnterDOI: this.props.initialValues.get('step') > this.props.step,
    confirmRestPage3: this.props.initialValues.get('step') > this.props.step,
    claims: this.props.claims
  }, this.props.initialValues.toJS()) : {
    walkthrough: {},
    uanOnDraft: false,
    claimEnterDOI: false,
    confirmRestPage3: false,
    claims: this.props.claims
  };

  onClaimsChange = (values) => {
    this.setState({
      claims: values
    });
  };

  onSubmit = (values) => this.props.onSubmit(extend({ claims: this.state.claims }, values), this.props.form);

  onChangeProgressCheck = (e) => this.setState({ [e.target.id]: e.target.checked });

  onChangeUANTick = (isInsuranceCarrierInformationComplete) => this.setState({ walkthrough: extend(this.state.walkthrough, { isInsuranceCarrierInformationComplete }) });

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
            <Form.Item label="Is UAN information correct?">
              {getFieldDecorator('walkthrough.isInsuranceCarrierInformationComplete', {
                initialValue: valueOrUndefined(this.state.walkthrough.isInsuranceCarrierInformationComplete)
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select yes or no"
                  optionFilterProp="children"
                  onChange={this.onChangeUANTick}
                >
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              )}
            </Form.Item>
            {(this.state.walkthrough.isInsuranceCarrierInformationComplete === 0) ? (
              <Form.Item>
                {getFieldDecorator('uanOnDraft', {
                  valuePropName: 'checked',
                  initialValue: this.state.uanOnDraft
                })(
                  <Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Enter correct UAN on Draft</Checkbox>
                )}
              </Form.Item>
            ) : null}
            <Form.Item label="Does DOB make sense?">
              {getFieldDecorator('walkthrough.DOBMakeSense', {
                initialValue: valueOrUndefined(this.state.walkthrough.DOBMakeSense)
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select yes or no"
                  optionFilterProp="children"
                >
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('claimEnterDOI', {
                valuePropName: 'checked',
                initialValue: this.state.claimEnterDOI
              })(<Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Confirm / Enter Claim DOI</Checkbox>)}
            </Form.Item>
            <Form.Item label="Claim Number">
              {getFieldDecorator('walkthroughClaimNumber', {
                initialValue: this.state.walkthroughClaimNumber
              })(<Input size="large" placeholder="Claim Number" />)}
            </Form.Item>
            <Form.Item label="ADJ Number">
              {getFieldDecorator('walkthroughAdjNumber', {
                initialValue: this.state.walkthroughAdjNumber
              })(<Input size="large" placeholder="ADJ Number" />)}
            </Form.Item>
            <Form.Item label="Injury Start Date">
              {getFieldDecorator('walkthroughInjuryStartDate', {
                initialValue: this.state.walkthroughInjuryStartDate ? moment(this.state.walkthroughInjuryStartDate) : undefined
              })(<DatePicker style={{ width: '100%' }} placeholder="Injury Start Date" format="DD/MM/YYYY" />)}
            </Form.Item>
            <Form.Item label="Body Parts">
              {getFieldDecorator('walkthrough.bodyParts', {
                initialValue: this.state.walkthrough.bodyParts
              })(<Input.TextArea size="large" placeholder="Body Parts" rows={4} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('confirmRestPage3', {
                valuePropName: 'checked',
                initialValue: this.state.confirmRestPage3
              })(<Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Confirm Rest of Page 3</Checkbox>)}
            </Form.Item>
          </Col>
        </Row>

        <Footer percent={18.75} goBack={this.props.goBack} step={step} lastStep={false} nextDisabled={(!this.state.uanOnDraft && this.state.walkthrough.isInsuranceCarrierInformationComplete === 0) || !this.state.claimEnterDOI || !this.state.confirmRestPage3} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
