import React from 'react';
import extend from 'lodash/extend';
import { Button, Checkbox, Col, Row } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import ResourceSelect from '../../../../../../../components/Core/ResourceSelect';
import AddContactButton from '../../../../../../ContactsPage/components/AddContactButton';

class Step extends React.Component {
  state = this.props.initialValues ? extend({
    insuredCheck: this.props.initialValues.get('step') > this.props.step,
    defendantSection: this.props.initialValues.get('step') > this.props.step
  }, this.props.initialValues.toJS()) : {
    walkthrough: {},
    insuredCheck: false,
    defendantSection: false
  };

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

  onChangeProgressCheck = (e) => this.setState({ [e.target.id]: e.target.checked });

  canGoForward = () => this.state.defendantSection && (!this.props.insured || this.state.insuredCheck);

  render() {
    const {
      form, visible, insured, step, stepIsActive
    } = this.props;
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
                  <ResourceSelect name="contact-profiles" placeholder="Select or create an applicant attorney" size="large" optionFilterProp="children" linked={this.state.applicantAttorney} textAccesor={contactSelectTextAccessor} />
                )}
                <AddContactButton />
              </div>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('defendantSection', {
                valuePropName: 'checked',
                initialValue: this.state.defendantSection,
              })(
                <Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Confirm Juvo information is in defendant section</Checkbox>
              )}
            </Form.Item>
            {(insured ? (
              <Form.Item>
                {getFieldDecorator('insuredCheck', {
                  valuePropName: 'checked',
                  initialValue: this.state.insuredCheck,
                })(
                  <Checkbox className="juvo-circle-checkbox" onChange={this.onChangeProgressCheck}>Is insurance carrier information complete?</Checkbox>
                )}
              </Form.Item>
            ) : null)}
          </Col>
        </Row>

        <Footer percent={12.5} goBack={this.props.goBack} step={step} lastStep={false} nextDisabled={!this.canGoForward()} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
