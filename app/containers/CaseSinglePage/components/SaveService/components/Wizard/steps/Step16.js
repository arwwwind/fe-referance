import React from 'react';
import extend from 'lodash/extend';
import { Button, Checkbox, Col, Input, InputNumber, Row, Select } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import { valueOrUndefined } from '../../../../../../../utils/common';

class Step extends React.Component {
  state = this.props.initialValues ? extend({
    confirmPage6: this.props.initialValues.get('step') > this.props.step
  }, this.props.initialValues.toJS()) : {
    walkthrough: {},
    confirmPage6: false
  };

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

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
            <Form.Item label="PD Percentage">
              {getFieldDecorator('walkthrough.PDPercent', {
                initialValue: this.state.walkthrough.PDPercent
              })(
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                  optionFilterProp="children"
                  placeholder="PD Percentage"
                />
              )}
            </Form.Item>
            <Form.Item label="PD Value">
              {getFieldDecorator('walkthrough.PDValue', {
                initialValue: this.state.walkthrough.PDValue
              })(
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
                  optionFilterProp="children"
                  placeholder="PD Value"
                />
              )}
            </Form.Item>
            <Form.Item label="Is it FMC necessary?">
              {getFieldDecorator('walkthrough.IsItFMCNecessary', {
                initialValue: valueOrUndefined(this.state.walkthrough.IsItFMCNecessary)
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
              {getFieldDecorator('confirmPage6', {
                valuePropName: 'checked',
                initialValue: this.state.confirmPage6,
              })(<Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Confirm the rest of page 6 is correct</Checkbox>)}
            </Form.Item>
          </Col>
        </Row>

        <Footer percent={31.25} goBack={this.props.goBack} step={step} lastStep={false} nextDisabled={!this.state.confirmPage6} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
