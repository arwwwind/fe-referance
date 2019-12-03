import React from 'react';
import extend from 'lodash/extend';
import { Button, Col, DatePicker, Input, Row } from 'antd';
import Form from '../../../../../../components/Core/Form';
import Footer from '../../../SaveService/components/Wizard/Footer';
import ResourceSelect from '../../../../../../components/Core/ResourceSelect';
import AddOrganizationButton from '../../../../../OrganizationsPage/components/AddOrganisationButton';
import AddContactButton from '../../../../../ContactsPage/components/AddContactButton';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {};

  onSubmit = (values) => this.props.onSubmit(extend({
    isLienInfo: true
  }, values), this.props.form);

  render() {
    const { form, visible, step } = this.props;
    const { getFieldDecorator } = form;
    const style = visible ? {} : { display: 'none' };
    const contactSelectTextAccessor = (option) => (`${option.firstName} ${option.lastName}`);
    const organisationSelectTextAccessor = (option) => (option.companyName);

    return (
      <Form form={form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit} style={style}>
        {!this.props.initialValues ? (
          <Button className="btn-in-header" type="primary" size="large" htmlType="submit" onClick={this.props.onRequestedStatusChange} value="draft">Save Draft</Button>
        ) : null}
        <Row gutter={20} className="p-b-extra-xs">
          <Col span={12}>
            <Form.Item label="Claiment Name">
              <div className="select-with-btn">
                {getFieldDecorator('claimentNameId', {
                  initialValue: this.state.claimentName ? `${this.state.claimentName.id}` : undefined,
                  rules: [{ required: true, message: 'This field is required' }]
                })(
                  <ResourceSelect name="organisations" placeholder="Select or create claiment" size="large" linked={this.state.claimentName} textAccesor={organisationSelectTextAccessor} />
                )}
                <AddOrganizationButton />
              </div>
            </Form.Item>
            <Form.Item label="Represented By">
              <div className="select-with-btn">
                {getFieldDecorator('representedById', {
                  initialValue: this.state.representedBy ? `${this.state.representedBy.id}` : undefined,
                  rules: [{ required: true, message: 'This field is required' }]
                })(
                  <ResourceSelect name="contact-profiles" placeholder="Select or create represented" size="large" optionFilterProp="children" linked={this.state.representedBy} textAccesor={contactSelectTextAccessor} />
                )}
                <AddContactButton />
              </div>
            </Form.Item>
            <Form.Item label="Filling Date">
              {getFieldDecorator('fillingDate', {
                initialValue: this.state.fillingDate,
                rules: [{ required: true, message: 'This field is required' }]
              })(<DatePicker style={{ width: '100%' }} placeholder="Filling Date" />)}
            </Form.Item>
            <Form.Item label="Lien Start Date">
              {getFieldDecorator('startDate', {
                initialValue: this.state.startDate,
                rules: [{ required: true, message: 'This field is required' }]
              })(<DatePicker style={{ width: '100%' }} placeholder="Lien Start Date" />)}
            </Form.Item>
          </Col>
          <Col span={24} className="m-t-xl">
            <Form.Item label="Description">
              {getFieldDecorator('description', {
                initialValue: this.state.description
              })(<Input.TextArea size="large" placeholder="Description" rows={4} />)}
            </Form.Item>
          </Col>
        </Row>

        <Footer percent={0} goBack={this.props.goBack} step={step} lastStep={false} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
