import React from 'react';
import extend from 'lodash/extend';
import { Button, Col, Input, Row, Select } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import ClaimForm from '../../../../../../CasesPage/components/ServiceClaimForm';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {
    injuredWorkerOutreach: {}
  };

  onSubmit = (values) => this.props.onSubmit(extend({ claims: this.state.claims }, values), this.props.form);

  onClaimsChange = (values) => {
    this.setState({
      claims: values
    });
  };

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

            <div className="form-step-title-bigger m-b-xxl">Service Information</div>
            <Form.Item label="Are We Meeting With Injured Worker">
              {getFieldDecorator('injuredWorkerOutreach.meetingWithWorker', {
                initialValue: this.state.injuredWorkerOutreach.meetingWithWorker,
                rules: [{ required: true, message: 'This field is required' }]
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select draft request"
                  optionFilterProp="children"
                >
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Type of Injured Worker Meeting">
              {getFieldDecorator('injuredWorkerOutreach.typeOfWorkerMeeting', {
                initialValue: this.state.injuredWorkerOutreach.typeOfWorkerMeeting,
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
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <div className="form-step-title-bigger m-b-xxl">Meeting Location</div>
            <Form.Item label="Street">
              {getFieldDecorator('injuredWorkerOutreach.meetingStreet', {
                initialValue: this.state.injuredWorkerOutreach.meetingStreet,
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input size="large" placeholder="Street" />)}
            </Form.Item>
          </Col>
          <Col span={24}>
            <div className="form-items-group group-3">
              <Form.Item label="City">
                {getFieldDecorator('injuredWorkerOutreach.meetingCity', {
                  initialValue: this.state.injuredWorkerOutreach.meetingCity,
                  rules: [{ required: true, message: 'This field is required' }]
                })(<Input size="large" placeholder="City" />)}
              </Form.Item>
              <Form.Item label="State">
                {getFieldDecorator('injuredWorkerOutreach.meetingState', {
                  initialValue: this.state.injuredWorkerOutreach.meetingState,
                  rules: [{ required: true, message: 'This field is required' }]
                })(<Input size="large" placeholder="State" />)}
              </Form.Item>
              <Form.Item label="Zip Code">
                {getFieldDecorator('injuredWorkerOutreach.meetingZipCode', {
                  initialValue: this.state.injuredWorkerOutreach.meetingZipCode,
                  rules: [{ required: true, message: 'This field is required' }]
                })(<Input size="large" placeholder="Zip Code" />)}
              </Form.Item>
            </div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Are we negotiating settlement?">
              {getFieldDecorator('injuredWorkerOutreach.negotiatingSettlement', {
                initialValue: this.state.injuredWorkerOutreach.negotiatingSettlement,
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
            <Form.Item label="Field Authority">
              {getFieldDecorator('injuredWorkerOutreach.authority', {
                initialValue: this.state.injuredWorkerOutreach.authority,
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input size="large" placeholder="Field Authority" />)}
            </Form.Item>
            <Form.Item label="Contact Reason">
              {getFieldDecorator('injuredWorkerOutreach.contactReason', {
                initialValue: this.state.injuredWorkerOutreach.contactReason,
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input size="large" placeholder="Contact Reason" />)}
            </Form.Item>
            <Form.Item label="Is IW Still Employed?">
              {getFieldDecorator('injuredWorkerOutreach.IWStillEmployed', {
                initialValue: this.state.injuredWorkerOutreach.IWStillEmployed,
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
            <div className="form-step-title-bigger m-b-xxl">Contact Information</div>
            <Form.Item label="Lawyer Organization">
              {getFieldDecorator('lawyerOrganization', {
                initialValue: this.state.lawyerOrganization,
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input size="large" placeholder="Lawyer Organization" />)}
            </Form.Item>
            <Form.Item label="Is Lawyer Involved">
              {getFieldDecorator('injuredWorkerOutreach.lawyerInvolved', {
                initialValue: this.state.injuredWorkerOutreach.lawyerInvolved,
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
            <Form.Item label="Interpretor">
              {getFieldDecorator('injuredWorkerOutreach.interpretor', {
                initialValue: this.state.injuredWorkerOutreach.interpretor,
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input size="large" placeholder="Interpretor" />)}
            </Form.Item>
            <Form.Item label="Is Interpretor Involved">
              {getFieldDecorator('injuredWorkerOutreach.isInterpretorInvolved', {
                initialValue: this.state.injuredWorkerOutreach.isInterpretorInvolved,
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
            <div className="form-step-title-bigger m-b-xxl">Settlement Information</div>
            <Form.Item label="Signature STIP">
              {getFieldDecorator('injuredWorkerOutreach.SignatureStip', {
                initialValue: this.state.injuredWorkerOutreach.SignatureStip,
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input size="large" placeholder="Signature STIP" />)}
            </Form.Item>
            <Form.Item label="Signature C&R">
              {getFieldDecorator('injuredWorkerOutreach.SignatureCANDR', {
                initialValue: this.state.injuredWorkerOutreach.SignatureCANDR,
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input size="large" placeholder="Signature C&R" />)}
            </Form.Item>
            <Form.Item label="QME Refusal">
              {getFieldDecorator('injuredWorkerOutreach.QMERefusal', {
                initialValue: this.state.injuredWorkerOutreach.QMERefusal,
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
            <Form.Item label="Is IW Medicate Eligible?">
              {getFieldDecorator('injuredWorkerOutreach.IWMedicareEligible', {
                initialValue: this.state.injuredWorkerOutreach.IWMedicareEligible,
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
          </Col>
        </Row>

        <Footer percent={100} goBack={this.props.goBack} step={step} lastStep onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
