import React from 'react';
import extend from 'lodash/extend';
import { Button, Col, DatePicker, Input, Row, Select } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import ClaimForm from '../../../../../../CasesPage/components/ServiceClaimForm';
import ResourceSelect from '../../../../../../../components/Core/ResourceSelect';
import AddVenueButton from '../../../../../../VenuesPage/Venues/components/AddVenueButton';
import AddJudgeButton from '../../../../../../VenuesPage/Judges/components/AddJudgeButton';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {
    lienService: {}
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
    const judgeSelectTextAccessor = (option) => (`${option.firstName} ${option.lastName}`);

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
            <Form.Item label="Employer Information">
              {getFieldDecorator('employerInformation', {
                initialValue: this.state.employerInformation,
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input size="large" placeholder="Employer Information" />)}
            </Form.Item>
            <Form.Item label="Hearing Date">
              {getFieldDecorator('hearingDate', {
                initialValue: this.state.hearingDate,
                rules: [{ required: true, message: 'This field is required' }]
              })(<DatePicker style={{ width: '100%' }} placeholder="Hearing Date" />)}
            </Form.Item>
            <Form.Item label="Venue">
              <div className="select-with-btn">
                {getFieldDecorator('venueId', {
                  initialValue: this.state.venue ? `${this.state.venue.id}` : undefined,
                  rules: [{ required: true, message: 'This field is required' }]
                })(
                  <ResourceSelect name="venues" placeholder="Select or create venue" size="large" linked={this.state.venue} />
                )}
                <AddVenueButton />
              </div>
            </Form.Item>
            <Form.Item label="Judge">
              <div className="select-with-btn">
                {getFieldDecorator('judgeId', {
                  initialValue: this.state.judge ? `${this.state.judge.id}` : undefined,
                  rules: [{ required: true, message: 'This field is required' }]
                })(
                  <ResourceSelect name="judges" placeholder="Select or create judge" size="large" linked={this.state.judge} textAccesor={judgeSelectTextAccessor} />
                )}
                <AddJudgeButton />
              </div>
            </Form.Item>
            <Form.Item label="Settlement Type">
              {getFieldDecorator('settlementType', {
                initialValue: this.state.settlementType,
                rules: [{ required: true, message: 'This field is required' }]
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select settlement type"
                  optionFilterProp="children"
                >
                  <Select.Option value="STIP">STIP</Select.Option>
                  <Select.Option value="C&R">C&R</Select.Option>
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
