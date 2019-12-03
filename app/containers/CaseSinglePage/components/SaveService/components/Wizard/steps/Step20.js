import React from 'react';
import extend from 'lodash/extend';
import { Button, Checkbox, Col, Row } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import ResourceSelect from '../../../../../../../components/Core/ResourceSelect';
import AddContactButton from '../../../../../../ContactsPage/components/AddContactButton';

class Step extends React.Component {
  state = this.props.initialValues ? extend({
    aaFees: this.props.initialValues.get('step') > this.props.step,
    infoIsOnDraft: this.props.initialValues.get('step') > this.props.step
  }, this.props.initialValues.toJS()) : {
    walkthrough: {},
    aaFees: false,
    infoIsOnDraft: false
  };

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

  onChangeProgressCheck = (e) => this.setState({ [e.target.id]: e.target.checked });

  render() {
    const { form, visible, stepIsActive, step } = this.props;
    const { getFieldDecorator } = form;
    const style = visible ? {} : { display: 'none' };
    const contactSelectTextAccessor = (option) => (`${option.firstName} ${option.lastName}`);

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
            <Form.Item label="Applicant Attorney">
              <div className="select-with-btn">
                {getFieldDecorator('applicantAttorneyId', {
                  initialValue: this.state.applicantAttorney ? `${this.state.applicantAttorney.id}` : undefined
                })(
                  <ResourceSelect name="contact-profiles" placeholder="Select or create applicant attorney" size="large" optionFilterProp="children" linked={this.state.applicantAttorney} textAccesor={contactSelectTextAccessor} />
                )}
                <AddContactButton />
              </div>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('aaFees', {
                valuePropName: 'checked',
                initialValue: this.state.aaFees,
              })(<Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Confirm AA fees will be addressed</Checkbox>)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('infoIsOnDraft', {
                valuePropName: 'checked',
                initialValue: this.state.infoIsOnDraft,
              })(<Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Confirm our info is on draft</Checkbox>)}
            </Form.Item>
          </Col>
        </Row>

        <Footer percent={43.75} goBack={this.props.goBack} step={step} lastStep={false} nextDisabled={!this.state.aaFees || !this.state.infoIsOnDraft} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
