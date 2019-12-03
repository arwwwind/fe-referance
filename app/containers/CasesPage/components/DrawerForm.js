import React from 'react';
import { Input, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';
import Form from '../../../components/Core/Form';
import Preloader from '../../../components/Preloader';
import ResourceSelect from '../../../components/Core/ResourceSelect';
import { AddContactButton } from '../../ContactsPage';
import ClaimForm from './CaseClaimForm';
import { AddOrganizationButton } from '../../OrganizationsPage';
import { getCaseNameFromState } from '../methods';

class DrawerForm extends React.Component {
  state = {
    claims: this.props.single.get('data') ? this.props.single.get('data').get('claims') : [],
    injuredWorker: null,
    primaryClaimNumber: null,
    referralId: null
  };

  onSubmit = (values) => {
    const caseId = this.props.single.get('data') ? this.props.single.get('data').get('id') : undefined;
    this.props.onSend({ ...values, claims: this.state.claims }, this.props.form, caseId, this.addServices, this);
  };

  onSubmitClick = (e) => {
    this.addServices = e.target.value;
  };

  onClaimsChange = (values) => {
    if (values.length) {
      this.updateStateByKey('primaryClaimNumber', values[0].claimNumber);
    }
    this.setState({
      claims: values
    });
  };

  updateStateByKey = (key, value) => {
    const newState = { ...this.state, [key]: value };
    this.setState(newState);
    const initialValues = this.props.single.get('data') ? this.props.single.get('data').toJS() : { claims: [] };
    this.props.form.setFieldsValue({ name: getCaseNameFromState(newState, initialValues) });
  };

  addServices = 'no';

  render() {
    const { getFieldDecorator } = this.props.form;
    const { single } = this.props;

    if (single.get('loading')) {
      return <Preloader />;
    }

    const initialValues = single.get('data') ? single.get('data').toJS() : { claims: [] };

    const contactSelectTextAccessor = (option) => (`${option.firstName} ${option.lastName}`);

    const organisationSelectTextAccessor = (option) => (option.companyName);

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                initialValue: initialValues.name,
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input size="large" placeholder="Name" readOnly />)}
            </Form.Item>
            <Form.Item label="Injured Worker">
              <div className="select-with-btn">
                {getFieldDecorator('injuredWorkerId', {
                  initialValue: initialValues.injuredWorker ? `${initialValues.injuredWorker.id}` : undefined,
                  rules: [{ required: true, message: 'This field is required' }],
                  onChange: (value, { props }) => this.updateStateByKey('injuredWorker', props.children)
                })(
                  <ResourceSelect name="contact-profiles/injured-worker" placeholder="Select or create an worker" size="large" optionFilterProp="children" linked={initialValues.injuredWorker} textAccesor={contactSelectTextAccessor} />
                )}
                <AddContactButton />
              </div>
            </Form.Item>
            <Form.Item label="Case Owner">
              <div className="select-with-btn">
                {getFieldDecorator('caseOwnerId', {
                  initialValue: initialValues.caseOwner ? `${initialValues.caseOwner.id}` : undefined,
                  rules: [{ required: true, message: 'This field is required' }]
                })(
                  <ResourceSelect name="contact-profiles" placeholder="Select or create an owner" size="large" optionFilterProp="children" linked={initialValues.caseOwner} textAccesor={contactSelectTextAccessor} />
                )}
                <AddContactButton />
              </div>
            </Form.Item>
            <Form.Item label="Account">
              <div className="select-with-btn">
                {getFieldDecorator('accountId', {
                  initialValue: initialValues.account ? `${initialValues.account.id}` : undefined
                })(
                  <ResourceSelect name="organisations/account" placeholder="Select or create an account" size="large" linked={initialValues.account} textAccesor={organisationSelectTextAccessor} />
                )}
                <AddOrganizationButton />
              </div>
            </Form.Item>
            <Form.Item label="Referred By">
              <div className="select-with-btn">
                {getFieldDecorator('referralId', {
                  initialValue: initialValues.referral ? `${initialValues.referral.id}` : undefined,
                  rules: [{ required: true, message: 'This field is required' }],
                  onChange: (value) => this.updateStateByKey('referralId', value)
                })(
                  <ResourceSelect name="contact-profiles" placeholder="Select or create an referred" size="large" optionFilterProp="children" linked={initialValues.referral} textAccesor={contactSelectTextAccessor} />
                )}
                <AddContactButton />
              </div>
            </Form.Item>
            <Form.Item label="Referred Date">
              {getFieldDecorator('referralDate', {
                initialValue: initialValues.referralDate ? moment(initialValues.referralDate) : undefined,
                rules: [{ required: true, message: 'This field is required' }]
              })(<DatePicker style={{ width: '100%' }} placeholder="Referred Date" />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description', {
                initialValue: initialValues.description
              })(<Input.TextArea size="large" placeholder="Description" rows={2} />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <ClaimForm form={this.props.form} values={initialValues.claims} onChange={this.onClaimsChange} hasPrimaryClaim />
          </Col>
        </Row>
        <div className="drawer-footer">
          <Row gutter={20}>
            <Col span={12}>
              <Button className="btn-center" type="primary" size="large" htmlType="submit" ghost onClick={this.onSubmitClick} value="no">Save</Button>
            </Col>
            <Col span={12}>
              <Button className="btn-center" type="primary" size="large" htmlType="submit" onClick={this.onSubmitClick} value="yes">Save & Add Services</Button>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

export default Form.create()(DrawerForm);
