import React from 'react';
import extend from 'lodash/extend';
import { Button, Col, Input, Row, Select, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import ResourceSelect from '../../../../../../../components/Core/ResourceSelect';
import AddVenueButton from '../../../../../../VenuesPage/Venues/components/AddVenueButton';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {};

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
            <Form.Item label="IW DOB">
              {getFieldDecorator('iwDob', {
                initialValue: this.state.iwDob,
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
            <Form.Item label="Claim Number">
              {getFieldDecorator('eddLienClaimNumber', {
                initialValue: this.state.eddLienClaimNumber
              })(<Input size="large" placeholder="Claim Number" />)}
            </Form.Item>
            <Form.Item label="Injury Start Date">
              {getFieldDecorator('eddLienInjuryStartDate', {
                initialValue: this.state.eddLienInjuryStartDate ? moment(this.state.eddLienInjuryStartDate) : undefined
              })(<DatePicker style={{ width: '100%' }} placeholder="Injury Start Date" format="DD/MM/YYYY" />)}
            </Form.Item>
            <Form.Item label="Injury End Date">
              {getFieldDecorator('eddLienInjuryEndDate', {
                initialValue: this.state.eddLienInjuryEndDate ? moment(this.state.eddLienInjuryEndDate) : undefined
              })(<DatePicker style={{ width: '100%' }} placeholder="Injury End Date" format="DD/MM/YYYY" />)}
            </Form.Item>
            <div className="form-step-title-bigger m-b-xxl">Indemnity</div>
            <Form.Item label="TD Paid">
              {getFieldDecorator('TDPaid', {
                initialValue: this.state.TDPaid,
                rules: [{ required: true, message: 'This field is required' }]
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
              {getFieldDecorator('PDPaid', {
                initialValue: this.state.PDPaid,
                rules: [{ required: true, message: 'This field is required' }]
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
            <Form.Item label="Confirm Benefit Printout">
              {getFieldDecorator('confirmBenefitPrintout', {
                initialValue: this.state.confirmBenefitPrintout,
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
            <div className="form-step-title-bigger m-b-xxl">WCAB</div>
            <Form.Item label="Assigned Venue">
              <div className="select-with-btn">
                {getFieldDecorator('venueId', {
                  initialValue: this.state.venue ? `${this.state.venue.id}` : undefined,
                  rules: [{ required: true, message: 'This field is required' }]
                })(
                  <ResourceSelect name="venues" placeholder="Select or create assigned venue" size="large" linked={this.state.venue} />
                )}
                <AddVenueButton />
              </div>
            </Form.Item>
            <Form.Item label="ADJ Number">
              {getFieldDecorator('ADJNumber', {
                initialValue: this.state.ADJNumber,
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input size="large" placeholder="ADJ Number" />)}
            </Form.Item>
          </Col>
        </Row>

        <Footer percent={50} goBack={this.props.goBack} step={step} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
