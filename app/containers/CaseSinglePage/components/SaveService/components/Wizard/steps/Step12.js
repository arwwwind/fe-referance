import React from 'react';
import extend from 'lodash/extend';
import { Button, Checkbox, Col, Row, Select } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import { valueOrUndefined } from '../../../../../../../utils/common';

class Step extends React.Component {
  state = this.props.initialValues ? extend({
    confirmRestPage4: this.props.initialValues.get('step') > this.props.step,
    uanOnDraft: this.props.initialValues.get('step') > this.props.step
  }, this.props.initialValues.toJS()) : {
    walkthrough: {},
    confirmRestPage4: false,
    uanOnDraft: false
  };

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

  onChangeUANTick = (confirmUAN) => this.setState({ walkthrough: extend(this.state.walkthrough, { confirmUAN }) });

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
              {getFieldDecorator('confirmRestPage4', {
                valuePropName: 'checked',
                initialValue: this.state.confirmRestPage4,
              })(
                <Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Confirm rest of page 4</Checkbox>
              )}
            </Form.Item>
            <Form.Item label="Confirm UAN">
              {getFieldDecorator('walkthrough.confirmUAN', {
                initialValue: valueOrUndefined(this.state.walkthrough.confirmUAN)
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
            {(this.state.walkthrough.confirmUAN === 0) ? (
              <Form.Item>
                {getFieldDecorator('uanOnDraft', {
                  valuePropName: 'checked',
                  initialValue: this.state.uanOnDraft
                })(
                  <Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Confirm completed draft section</Checkbox>
                )}
              </Form.Item>
            ) : null}
          </Col>
        </Row>

        <Footer percent={18.75} goBack={this.props.goBack} step={step} lastStep={false} nextDisabled={(!this.state.uanOnDraft && this.state.walkthrough.confirmUAN === 0) || !this.state.confirmRestPage4} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
