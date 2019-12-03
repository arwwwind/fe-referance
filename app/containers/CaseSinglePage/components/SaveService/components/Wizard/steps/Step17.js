import React from 'react';
import { Button, Col, Input, InputNumber, Row } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {};

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
            <Form.Item label="Settlement Amount">
              {getFieldDecorator('settlementAmount', {
                initialValue: this.state.settlementAmount
              })(
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
                  optionFilterProp="children"
                  placeholder="Settlement Amount"
                />
              )}
            </Form.Item>
            <Form.Item label="Leaving Balance">
              {getFieldDecorator('leavingBalance', {
                initialValue: this.state.leavingBalance
              })(
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
                  optionFilterProp="children"
                  placeholder="Leaving Balance"
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Footer percent={37.5} goBack={this.props.goBack} step={step} lastStep={false} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
