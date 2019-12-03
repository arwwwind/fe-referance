import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Col, DatePicker, Input, Row, Select } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import * as type from '../../../types';
import ResourceSelect from '../../../../../../../components/Core/ResourceSelect';
import { AddContactButton } from '../../../../../../ContactsPage';

const prepareTags = (values) => {
  const { tags } = values;

  values.tags = tags ? tags.map((tag) => ({
    label: tag
  })) : [];

  return values;
};

const serviceTypeExist = (serviceType, services) => {
  if (services && services.length) {
    const result = services.filter((service) => service.serviceType === serviceType);
    return !!result.length;
  }
  return false;
};

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {};

  onSubmit = (values) => this.props.onSubmit(prepareTags(values), this.props.form);

  onTypeChange = (serviceType) => this.setState({ serviceType });

  render() {
    const { form, visible, step } = this.props;
    const { getFieldDecorator } = form;
    const style = visible ? {} : { display: 'none' };
    const contactSelectTextAccessor = (option) => (`${option.firstName} ${option.lastName}`);
    const tagSelectTextAccessor = (option) => (option.label);
    const tagSelectValueAccessor = (option) => (option.label);

    return (
      <Form form={form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit} style={style} shouldValidate={false}>
        {!this.props.initialValues ? (
          <Button className="btn-in-header" type="primary" size="large" htmlType="submit" onClick={this.props.onRequestedStatusChange} value="draft">Save Draft</Button>
        ) : null}
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Service Start Date">
              {getFieldDecorator('serviceStartDate', {
                initialValue: this.state.serviceStartDate,
                rules: [{ required: true, message: 'This field is required' }]
              })(<DatePicker style={{ width: '100%' }} placeholder="Service Start Date" />)}
            </Form.Item>
            {type.isNotWalkthrough(this.state.serviceType) ? (
              <Form.Item label="Service Owner">
                <div className="select-with-btn">
                  {getFieldDecorator('serviceOwnerId', {
                    initialValue: this.state.serviceOwner ? `${this.state.serviceOwner.id}` : undefined
                  })(
                    <ResourceSelect name="contact-profiles" placeholder="Select or create an service owner" size="large" optionFilterProp="children" linked={this.state.serviceOwner} textAccesor={contactSelectTextAccessor} />
                  )}
                  <AddContactButton />
                </div>
              </Form.Item>
            ) : null}
            <Form.Item label="Current Claim Handler">
              <div className="select-with-btn">
                {getFieldDecorator('currentClaimHandlerId', {
                  initialValue: this.state.currentClaimHandler ? `${this.state.currentClaimHandler.id}` : undefined,
                  rules: [{ required: true, message: 'This field is required' }]
                })(
                  <ResourceSelect name="contact-profiles" placeholder="Select or create claim handler" size="large" optionFilterProp="children" linked={this.state.currentClaimHandler} textAccesor={contactSelectTextAccessor} />
                )}
                <AddContactButton />
              </div>
            </Form.Item>
            {type.hasSmallDescription(this.state.serviceType) ? (
              <Form.Item label="Description">
                {getFieldDecorator('description', {
                  initialValue: this.state.description
                })(<Input.TextArea size="large" placeholder="Description" rows={4} />)}
              </Form.Item>
            ) : null}
            {type.isWalkthrough(this.state.serviceType) ? (
              <Form.Item label="Referred By">
                <div className="select-with-btn">
                  {getFieldDecorator('referredById', {
                    initialValue: this.state.referredBy ? `${this.state.referredBy.id}` : undefined,
                    rules: [{ required: true, message: 'This field is required' }]
                  })(
                    <ResourceSelect name="contact-profiles" placeholder="Select or create a referred" size="large" optionFilterProp="children" linked={this.state.referredBy} textAccesor={contactSelectTextAccessor} />
                  )}
                  <AddContactButton />
                </div>
              </Form.Item>
            ) : null}
          </Col>
          <Col span={12}>
            <Form.Item label="Service Type">
              {getFieldDecorator('serviceType', {
                initialValue: this.state.serviceType,
                rules: [{ required: true, message: 'This field is required' }]
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select service type"
                  optionFilterProp="children"
                  onChange={this.onTypeChange}
                  disabled={!!this.state.id}
                >
                  {
                    type.list.map((option) => {
                      if (option.value === 'lienService') {
                        return (<Select.Option value={option.value} key={option.value} disabled={serviceTypeExist('lienService', this.props.services)}>{option.label}</Select.Option>);
                      }

                      if (option.value === 'eddLien') {
                        return (<Select.Option value={option.value} key={option.value} disabled={serviceTypeExist('eddLien', this.props.services)}>{option.label}</Select.Option>);
                      }

                      return (<Select.Option value={option.value} key={option.value}>{option.label}</Select.Option>);
                    })
                  }
                </Select>
              )}
            </Form.Item>
            {type.isIWO(this.state.serviceType) ? (
              <Form.Item label="Sub Type">
                {getFieldDecorator('serviceSubType', {
                  initialValue: this.state.serviceSubType
                })(
                  <Select
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="Select sub type"
                    optionFilterProp="children"
                  >
                    <Select.Option value="subtype1">Subtype 1</Select.Option>
                    <Select.Option value="subtype2">Subtype 2</Select.Option>
                    <Select.Option value="subtype3">Subtype 3</Select.Option>
                  </Select>
                )}
              </Form.Item>
            ) : null}
            {type.isEddLien(this.state.serviceType) ? (
              <Form.Item label="Hearing Date">
                {getFieldDecorator('hearingDate', {
                  initialValue: this.state.hearingDate
                })(<DatePicker style={{ width: '100%' }} placeholder="Hearing Date" />)}
              </Form.Item>
            ) : null}
            {type.isEddLien(this.state.serviceType) ? (
              <Form.Item label="EDD Office">
                {getFieldDecorator('eddOffice', {
                  initialValue: this.state.eddOffice
                })(<Input size="large" placeholder="EDD Office" />)}
              </Form.Item>
            ) : null}
            <Form.Item label="Invoicer">
              <div className="select-with-btn">
                {getFieldDecorator('invoicerId', {
                  initialValue: this.state.invoicer ? `${this.state.invoicer.id}` : undefined,
                  rules: [{ required: true, message: 'This field is required' }]
                })(
                  <ResourceSelect name="contact-profiles" placeholder="Select or create an invoicer" size="large" optionFilterProp="children" linked={this.state.invoicer} textAccesor={contactSelectTextAccessor} />
                )}
                <AddContactButton />
              </div>
            </Form.Item>
            <Form.Item label="Rush Requested">
              {getFieldDecorator('rushRequested', {
                initialValue: this.state.rushRequested,
                rules: [{ required: true, message: 'This field is required' }]
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select rush requested"
                  optionFilterProp="children"
                >
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Tags">
              <div className="select-with-btn">
                {getFieldDecorator('tags', {
                  initialValue: this.state.tags ? this.state.tags.map((tag) => (`${tag.label}`)) : undefined
                })(
                  <ResourceSelect
                    name="tags"
                    placeholder="Tags"
                    size="large"
                    optionFilterProp="children"
                    linked={this.state.tags}
                    textAccesor={tagSelectTextAccessor}
                    valueAccesor={tagSelectValueAccessor}
                    mode="tags"
                  />
                )}
              </div>
            </Form.Item>
          </Col>
          {type.hasLargeDescription(this.state.serviceType) ? (
            <Col span={24} className="m-t-xl">
              <Form.Item label="Description">
                {getFieldDecorator('description', {
                  initialValue: this.state.description
                })(<Input.TextArea size="large" placeholder="Description" rows={4} />)}
              </Form.Item>
            </Col>
          ) : null}
        </Row>

        <Footer percent={0} goBack={this.props.goBack} step={step} lastStep={false} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  services: (state.get('caseDetails') && state.get('caseDetails').get('data')) ? state.get('caseDetails').get('data').get('services').toJS() : null
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Form.create()(Step));
