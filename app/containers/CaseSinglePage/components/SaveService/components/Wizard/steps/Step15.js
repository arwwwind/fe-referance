import React from 'react';
import { Button, Col, Row, Select, InputNumber } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import { valueOrUndefined } from '../../../../../../../utils/common';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {
    walkthrough: {}
  };

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

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
            <Form.Item label="Medical Bills Paid">
              {getFieldDecorator('walkthrough.medicalBillsPaid', {
                initialValue: this.state.walkthrough.medicalBillsPaid
              })(
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
                  optionFilterProp="children"
                  placeholder="Medical Bills Paid"
                />
              )}
            </Form.Item>
            <Form.Item label="Does unpaid medical field imply defendant is liable?">
              {getFieldDecorator('walkthrough.DoesUnpaidMedicalFieldImply', {
                initialValue: valueOrUndefined(this.state.walkthrough.DoesUnpaidMedicalFieldImply)
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

        <Footer percent={31.25} goBack={this.props.goBack} step={step} lastStep={false} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
