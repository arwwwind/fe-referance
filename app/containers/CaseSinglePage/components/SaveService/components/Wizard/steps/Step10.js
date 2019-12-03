import React from 'react';
import { Button, Col, Row, Select } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import { valueOrUndefined } from '../../../../../../../utils/common';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {
    walkthrough: {}
  };

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

  render() {
    const {
      form, visible, insured, step, stepIsActive
    } = this.props;
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
            {insured ? (
              <Form.Item label="Is insurance carrier information in complete?">
                {getFieldDecorator('walkthrough.isInsuranceCarrierInformationComplete', {
                  initialValue: valueOrUndefined(this.state.walkthrough.isInsuranceCarrierInformationComplete)
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
            ) : null}
            <Form.Item label="Confirm UAN?">
              {getFieldDecorator('walkthrough.confirmUAN', {
                initialValue: valueOrUndefined(this.state.walkthrough.confirmUAN)
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
          </Col>
        </Row>

        <Footer percent={12.5} goBack={this.props.goBack} step={step} lastStep={false} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
