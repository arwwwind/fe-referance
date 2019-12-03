import React from 'react';
import extend from 'lodash/extend';
import { Button, Col, Input, Row, Select } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import { valueOrUndefined } from '../../../../../../../utils/common';
import ShowClaims from '../../../../../../../components/ShowClaims';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {
    walkthrough: {}
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
            <ShowClaims id={this.props.caseId} />
            <Form.Item label="Body Parts Referenced in Settlement Docs">
              {getFieldDecorator('walkthrough.bodyParts', {
                initialValue: this.state.walkthrough.bodyParts
              })(<Input.TextArea size="large" placeholder="Body Parts Referenced in Settlement Docs" rows={4} />)}
            </Form.Item>
            <Form.Item label="Are there body parts written in the AOE/COE box?">
              {getFieldDecorator('walkthrough.AreThereBodyPartsWrittenInCOE', {
                initialValue: valueOrUndefined(this.state.walkthrough.AreThereBodyPartsWrittenInCOE)
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

        <Footer percent={25} goBack={this.props.goBack} step={step} lastStep={false} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  const caseDetails = state.get('caseDetails');
  const caseDetailsData = caseDetails ? caseDetails.get('data') : null;
  return {
    caseId: caseDetailsData ? caseDetailsData.get('id') : null
  };
};

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Form.create()(Step));
