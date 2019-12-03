import React from 'react';
import { Button, Col, DatePicker, Input, Row, Select } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import { valueOrUndefined } from '../../../../../../../utils/common';

export const accountSettlementLanguage = (caseObj) => {
  const account = caseObj ? caseObj.account : null;
  return account ? account.settlementLanguage : null;
};

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {
    walkthrough: {},
  };

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

  onSettlementLanguageChange = (settlementLanguage) => this.setState({ settlementLanguage });

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
            <Form.Item label="Are there initials in document?">
              {getFieldDecorator('walkthrough.areThereInitialsInDoc', {
                initialValue: valueOrUndefined(this.state.walkthrough.areThereInitialsInDoc)
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
            <Form.Item label="Does settlement language comply with account requirements?">
              {getFieldDecorator('walkthrough.DoesSettlementLanguageComply', {
                initialValue: valueOrUndefined(this.state.walkthrough.DoesSettlementLanguageComply)
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
            <Form.Item label="Medical Report Doctor Name">
              {getFieldDecorator('walkthrough.doctorName', {
                initialValue: this.state.walkthrough.doctorName
              })(<Input size="large" placeholder="Medical Report Doctor Name" />)}
            </Form.Item>
            <Form.Item label="Medical Report Doctor Date">
              {getFieldDecorator('walkthrough.doctorDate', {
                initialValue: this.state.walkthrough.doctorDate
              })(<DatePicker style={{ width: '100%' }} placeholder="Medical Report Doctor Date" />)}
            </Form.Item>
          </Col>
        </Row>

        <Footer percent={43.75} goBack={this.props.goBack} step={step} lastStep={false} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
