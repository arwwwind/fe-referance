import React from 'react';
import extend from 'lodash/extend';
import { Button, Checkbox, Col, Input, Row, Select } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import ResourceSelect from '../../../../../../../components/Core/ResourceSelect';
import AddVenueButton from '../../../../../../VenuesPage/Venues/components/AddVenueButton';

class Step extends React.Component {
  state = this.props.initialValues ? extend({
    ProgressCheck1: this.props.initialValues.get('step') > this.props.step,
    ProgressCheck2: this.props.initialValues.get('step') > this.props.step
  }, this.props.initialValues.toJS()) : {
    walkthrough: {},
    ProgressCheck1: false,
    ProgressCheck2: false
  };

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

  onChangeProgressCheck = (e) => this.setState({ [e.target.id]: e.target.checked });

  render() {
    const {
      form, visible, stepIsActive, step
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
            <Form.Item label="ADJ Number on original Claim">
              {getFieldDecorator('walkthrough.confirmADJNumber', {
                initialValue: this.state.walkthrough.confirmADJNumber,
              })(<Input size="large" placeholder="ADJ Number on original Claim" />)}
            </Form.Item>
            <Form.Item label="Assigned Venue">
              <div className="select-with-btn">
                {getFieldDecorator('venueId', {
                  initialValue: this.state.venue ? `${this.state.venue.id}` : undefined
                })(
                  <ResourceSelect name="venues" placeholder="Select or create assigned venue" size="large" linked={this.state.venue} />
                )}
                <AddVenueButton />
              </div>
            </Form.Item>
            <Form.Item label="Actual Venue">
              <div className="select-with-btn">
                {getFieldDecorator('actualVenueId', {
                  initialValue: this.state.actualVenue ? `${this.state.actualVenue.id}` : undefined
                })(
                  <ResourceSelect name="venues" placeholder="Select or create actual venue" size="large" linked={this.state.actualVenue} />
                )}
                <AddVenueButton />
              </div>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('ProgressCheck1', {
                valuePropName: 'checked',
                initialValue: this.state.ProgressCheck1,
              })(
                <Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Is IW name and address complete?</Checkbox>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('ProgressCheck2', {
                valuePropName: 'checked',
                initialValue: this.state.ProgressCheck2,
              })(
                <Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Is employer information section complete?</Checkbox>
              )}
            </Form.Item>
            <Form.Item label="Insured or Self Insured">
              {getFieldDecorator('walkthrough.insuredOrSelfInsured', {
                initialValue: this.state.walkthrough.insuredOrSelfInsured ? this.state.walkthrough.insuredOrSelfInsured : undefined
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select insured or self Insured"
                  optionFilterProp="children"
                >
                  <Select.Option value="insured">Insured</Select.Option>
                  <Select.Option value="self insured">Self Insured</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Footer percent={6.25} goBack={this.props.goBack} step={step} lastStep={false} nextDisabled={!this.state.ProgressCheck1 || !this.state.ProgressCheck2} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
