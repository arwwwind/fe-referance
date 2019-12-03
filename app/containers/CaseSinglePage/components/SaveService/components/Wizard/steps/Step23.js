import React from 'react';
import extend from 'lodash/extend';
import { Button, Col, DatePicker, Input, Row, Select } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import { valueOrUndefined } from '../../../../../../../utils/common';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {
    walkthrough: {},
  };

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

  onChangeMedicalReport = (medicalReport) => this.setState({ walkthrough: extend(this.state.walkthrough, { medicalReport }) });

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
            <Form.Item label="Confirm medical report">
              {getFieldDecorator('walkthrough.medicalReport', {
                initialValue: valueOrUndefined(this.state.walkthrough.medicalReport)
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select yes or no"
                  optionFilterProp="children"
                  onChange={this.onChangeMedicalReport}
                >
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              )}
            </Form.Item>
            {(this.state.walkthrough.medicalReport) ? (
              <div>
                <Form.Item label="Medical Report Type">
                  {getFieldDecorator('walkthrough.medicalReportType', {
                    initialValue: valueOrUndefined(this.state.walkthrough.medicalReportType)
                  })(
                    <Select
                      size="large"
                      style={{ width: '100%' }}
                      placeholder="Select medical report type"
                      optionFilterProp="children"
                    >
                      <Select.Option value="option1">Option 1</Select.Option>
                      <Select.Option value="option2">Option 2</Select.Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="Physician Name">
                  {getFieldDecorator('walkthrough.doctorName', {
                    initialValue: this.state.walkthrough.doctorName
                  })(<Input size="large" placeholder="Physician Name" />)}
                </Form.Item>
                <Form.Item label="Physician Date">
                  {getFieldDecorator('walkthrough.doctorDate', {
                    initialValue: this.state.walkthrough.doctorDate
                  })(<DatePicker style={{ width: '100%' }} placeholder="Physician Date" />)}
                </Form.Item>
                <Form.Item label="Body Parts Referenced">
                  {this.props.bodyParts || this.state.walkthrough.bodyParts ? (
                    <p className="f-s-16 t-muted">{this.props.bodyParts || this.state.walkthrough.bodyParts}</p>
                  ) : (<div>-</div>)}
                </Form.Item>
              </div>
            ) : null}
            <Form.Item>
              {getFieldDecorator('walkthrough.injuryDetails', {
                initialValue: this.state.walkthrough.injuryDetails
              })(
                <Input.TextArea size="large" placeholder="Injury Details" rows={4} />
              )}
            </Form.Item>
            <Form.Item label="Do the body parts match?">
              {getFieldDecorator('walkthrough.bodyPartsMatch', {
                initialValue: valueOrUndefined(this.state.walkthrough.bodyPartsMatch)
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
            <Form.Item label="Future Medical">
              {getFieldDecorator('walkthrough.futureMedical', {
                initialValue: this.state.walkthrough.futureMedical
              })(
                <Input.TextArea size="large" placeholder="Future Medical" rows={4} />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Footer percent={62.5} goBack={this.props.goBack} step={step} lastStep={false} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
