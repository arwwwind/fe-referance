import React from 'react';
import extend from 'lodash/extend';
import { Button, Checkbox, Col, Row, Select, InputNumber } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import { valueOrUndefined } from '../../../../../../../utils/common';

class Step extends React.Component {
  state = this.props.initialValues ? extend({
    confirmAmountsPaid: this.props.initialValues.get('step') > this.props.step
  }, this.props.initialValues.toJS()) : {
    walkthrough: {},
    confirmAmountsPaid: false
  };

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

  onConfirmBenefitChange = (benefitPrintout) => this.setState({ walkthrough: extend(this.state.walkthrough, { benefitPrintout }) });

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
            <Form.Item label="Confirm Benefit Printout">
              {getFieldDecorator('walkthrough.benefitPrintout', {
                initialValue: valueOrUndefined(this.state.walkthrough.benefitPrintout)
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select yes or no"
                  optionFilterProp="children"
                  onChange={this.onConfirmBenefitChange}
                >
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              )}
            </Form.Item>
            {(this.state.walkthrough.benefitPrintout === 1) ? (
              <Form.Item>
                {getFieldDecorator('confirmAmountsPaid', {
                  valuePropName: 'checked',
                  initialValue: this.state.confirmAmountsPaid,
                })(<Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Confirm amounts paid</Checkbox>)}
              </Form.Item>
            ) : null}
            <Form.Item label="TD Paid">
              {getFieldDecorator('walkthrough.TDPaid', {
                initialValue: valueOrUndefined(this.state.walkthrough.TDPaid)
              })(
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
                  optionFilterProp="children"
                  placeholder="TD Paid"
                />
              )}
            </Form.Item>
            <Form.Item label="PD Paid">
              {getFieldDecorator('walkthrough.PDPaid', {
                initialValue: valueOrUndefined(this.state.walkthrough.PDPaid)
              })(
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
                  optionFilterProp="children"
                  placeholder="PD Paid"
                />
              )}
            </Form.Item>
            <Form.Item label="Medical Paid">
              {getFieldDecorator('walkthrough.medicalBillsPaid', {
                initialValue: this.state.walkthrough.medicalBillsPaid
              })(
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
                  optionFilterProp="children"
                  placeholder="Medical Paid"
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Footer percent={68.75} goBack={this.props.goBack} step={step} lastStep={false} nextDisabled={!this.state.confirmAmountsPaid && this.state.walkthrough.benefitPrintout === 1} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
