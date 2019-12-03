import React from 'react';
import extend from 'lodash/extend';
import { Button, Col, Input, Row, Select } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import ClaimForm from '../../../../../../CasesPage/components/ServiceClaimForm';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {
    documentPreparation: {}
  };

  onClaimsChange = (values) => {
    this.setState({
      claims: values
    });
  };

  onSubmit = (values) => this.props.onSubmit(extend({ claims: this.state.claims }, values), this.props.form);

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
            <div className="form-step-title-bigger m-b-xxl">Claim Information</div>
            {visible ? <ClaimForm form={this.props.form} values={this.state.claims} onChange={this.onClaimsChange} /> : null}

            <Form.Item label="Draft Request">
              {getFieldDecorator('documentPreparation.draftRequest', {
                initialValue: this.state.documentPreparation.draftRequest,
                rules: [{ required: true, message: 'This field is required' }]
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select draft request"
                  optionFilterProp="children"
                >
                  <Select.Option value="option1">C&R</Select.Option>
                  <Select.Option value="option2">STIP</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="WCAB Filing Included">
              {getFieldDecorator('documentPreparation.WCABFilingIncluded', {
                initialValue: this.state.documentPreparation.WCABFilingIncluded,
                rules: [{ required: true, message: 'This field is required' }]
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
            <Form.Item label="E-File or In Person">
              {getFieldDecorator('documentPreparation.EfileInPerson', {
                initialValue: this.state.documentPreparation.EfileInPerson,
                rules: [{ required: true, message: 'This field is required' }]
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select E-File or In Person"
                  optionFilterProp="children"
                >
                  <Select.Option value="E-File">E-File</Select.Option>
                  <Select.Option value="In Person">In Person</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="IWP Name">
              {getFieldDecorator('IWPName', {
                initialValue: this.state.IWPName,
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input size="large" placeholder="IWP Name" />)}
            </Form.Item>
          </Col>
        </Row>

        <Footer percent={100} goBack={this.props.goBack} step={step} lastStep onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
