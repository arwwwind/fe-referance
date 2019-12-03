import React from 'react';
import extend from 'lodash/extend';
import { Input, Select, Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Form from '../../../components/Core/Form';
import Preloader from '../../../components/Preloader';
import { organizationTypes } from '../config';
import { organizationFormTypeChange } from '../actions';
import ResourceSelect from '../../../components/Core/ResourceSelect';
import config from '../../../config';

class DrawerForm extends React.Component {
  state = {
    faxLink: this.props.single.get('data') ? this.props.single.get('data').toJS().faxLink : null
  };

  onSubmit = (values) => {
    this.props.onSend(extend({
      accounts: []
    }, values), this.props.form);
  };

  updateFaxLink = (e) => {
    this.setState({ faxLink: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { single } = this.props;

    if (single.get('loading')) {
      return <Preloader />;
    }

    const initialValues = single.get('data') ? single.get('data').toJS() : {};
    const organisationSelectTextAccessor = (option) => (option.companyName);

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        <Form.Item label="Company Name">
          {getFieldDecorator('companyName', {
            initialValue: initialValues.companyName,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="Company Name" />)}
        </Form.Item>
        <Form.Item label="Type">
          {getFieldDecorator('type', {
            initialValue: initialValues.type,
            rules: [{ required: true, message: 'This field is required' }],
          })(
            <Select
              size="large"
              placeholder="Select organization type"
              onChange={this.props.handleTypeChange}
            >
              {organizationTypes.map((type) => <Select.Option value={type.value} key={type.value}>{type.label}</Select.Option>)}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Address">
          {getFieldDecorator('address', {
            initialValue: initialValues.address
          })(<Input size="large" placeholder="Address" />)}
        </Form.Item>
        <Form.Item label="Primary Phone">
          <Input.Group className="form-group" size="large">
            <div className="form-group-item" style={{ width: '19%' }}>
              <div className="form-group-item-label">Type</div>
              <Form.Item>
                {getFieldDecorator('primaryPhoneNumberType', {
                  initialValue: initialValues.primaryPhoneNumberType
                })(<Input size="large" />)}
              </Form.Item>
            </div>
            <div className="form-group-item" style={{ width: '48%' }}>
              <div className="form-group-item-label">Phone number</div>
              <Form.Item>
                {getFieldDecorator('primaryPhoneNumber', {
                  initialValue: initialValues.primaryPhoneNumber
                })(<Input size="large" maxLength="15" />)}
              </Form.Item>
            </div>
            <div className="form-group-item" style={{ width: '29%' }}>
              <div className="form-group-item-label">Extension</div>
              {getFieldDecorator('primaryPhoneNumberExtension', {
                initialValue: initialValues.primaryPhoneNumberExtension
              })(<Input size="large" />)}
            </div>
          </Input.Group>
        </Form.Item>
        <Form.Item label="Secondary Phone">
          <Input.Group className="form-group" size="large">
            <div className="form-group-item" style={{ width: '19%' }}>
              <div className="form-group-item-label">Type</div>
              <Form.Item>
                {getFieldDecorator('secondaryPhoneNumberType', {
                  initialValue: initialValues.secondaryPhoneNumberType
                })(<Input size="large" />)}
              </Form.Item>
            </div>
            <div className="form-group-item" style={{ width: '48%' }}>
              <div className="form-group-item-label">Phone number</div>
              {getFieldDecorator('secondaryPhoneNumber', {
                initialValue: initialValues.secondaryPhoneNumber
              })(<Input size="large" maxLength="15" />)}
            </div>
            <div className="form-group-item" style={{ width: '29%' }}>
              <div className="form-group-item-label">Extension</div>
              <Form.Item>
                {getFieldDecorator('secondaryPhoneNumberExtension', {
                  initialValue: initialValues.secondaryPhoneNumberExtension
                })(<Input size="large" />)}
              </Form.Item>
            </div>
          </Input.Group>
        </Form.Item>
        <Form.Item label="Fax Number">
          {getFieldDecorator('fax', {
            initialValue: initialValues.fax
          })(<Input size="large" placeholder="Fax Number" onChange={this.updateFaxLink} />)}
        </Form.Item>
        <Form.Item label="Fax Link">
          {getFieldDecorator('faxLink', {
            initialValue: this.state.faxLink || initialValues.faxLink
          })(<Input size="large" placeholder="Fax Link" addonAfter={config.faxLinkDomain} readOnly />)}
        </Form.Item>
        <Form.Item label="Account Verified">
          {getFieldDecorator('accountVerified', {
            initialValue: initialValues.accountVerified !== undefined && initialValues.accountVerified !== null ? `${initialValues.accountVerified}` : undefined
          })(
            <Select
              size="large"
              placeholder="Select yes or no"
              optionFilterProp="children"
            >
              <Select.Option value="true">Yes</Select.Option>
              <Select.Option value="false">No</Select.Option>
            </Select>
          )}
        </Form.Item>
        {
          (single.get('type') === 'lien-claiment') ? (
            <div className="m-t-xl">
              <Form.Item label="Physician / Non Physician">
                {getFieldDecorator('physicianOrNonPysician', {
                  initialValue: initialValues.physicianOrNonPysician !== undefined && initialValues.physicianOrNonPysician !== null ? `${initialValues.physicianOrNonPysician}` : undefined
                })(
                  <Select
                    size="large"
                    placeholder="Select Physician / Non Physician"
                    optionFilterProp="children"
                  >
                    <Select.Option value="true">Physician</Select.Option>
                    <Select.Option value="false">Non Physician</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="Lien Claiment Stayed">
                {getFieldDecorator('leinClaimentStayed', {
                  initialValue: initialValues.leinClaimentStayed !== undefined && initialValues.leinClaimentStayed !== null ? `${initialValues.leinClaimentStayed}` : undefined
                })(
                  <Select
                    size="large"
                    placeholder="Select yes or no"
                    optionFilterProp="children"
                  >
                    <Select.Option value="true">Yes</Select.Option>
                    <Select.Option value="false">No</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </div>
          ) : null
        }
        {
          (single.get('type') === 'account') ? (
            <div className="m-t-xl">
              <Form.Item label="Special Instructions">
                {getFieldDecorator('specialInstructionsNotes', {
                  initialValue: initialValues.specialInstructionsNotes
                })(<Input.TextArea size="large" placeholder="Special Instructions" rows={4} />)}
              </Form.Item>
              <Form.Item label="Settlement Language">
                {getFieldDecorator('settlementLanguage', {
                  initialValue: initialValues.settlementLanguage
                })(<Input.TextArea size="large" placeholder="Settlement Language" rows={4} />)}
              </Form.Item>
            </div>
          ) : null
        }
        {
          (single.get('type') === 'claim-office') ? (
            <div className="m-t-xl">
              <Form.Item label="Territory">
                {getFieldDecorator('territory', {
                  initialValue: initialValues.territory
                })(<Input size="large" placeholder="Territory" />)}
              </Form.Item>
              <Form.Item label="Accounts">
                <div className="select-with-btn">
                  {getFieldDecorator('accounts', {
                    initialValue: initialValues.accounts ? initialValues.accounts.map((account) => (`${account.id}`)) : undefined
                  })(
                    <ResourceSelect mode="multiple" name="organisations/account" placeholder="Select accounts" size="large" optionFilterProp="children" linked={initialValues.accounts} textAccesor={organisationSelectTextAccessor} />
                  )}
                </div>
              </Form.Item>
            </div>
          ) : null
        }
        {
          (this.props.isAdmin) ? (
            <div className="m-t-xl">
              <Form.Item label="Walk Through Pricing (Success)">
                {getFieldDecorator('walkthroughPricing', {
                  initialValue: initialValues.walkthroughPricing
                })(<Input size="large" placeholder="Walk Through Pricing (Success)" />)}
              </Form.Item>
              <Form.Item label="Lien Service Pricing">
                {getFieldDecorator('lienServicePricing', {
                  initialValue: initialValues.lienServicePricing
                })(<Input size="large" placeholder="Lien Service Pricing" />)}
              </Form.Item>
              <Form.Item label="EDD Lien Service Pricing">
                {getFieldDecorator('eddLienServicePricing', {
                  initialValue: initialValues.eddLienServicePricing
                })(<Input size="large" placeholder="EDD Lien Service Pricing" />)}
              </Form.Item>
              <Form.Item label="Injured Worker Outreach Pricing">
                {getFieldDecorator('injuredWorkerOutreachPricing', {
                  initialValue: initialValues.injuredWorkerOutreachPricing
                })(<Input size="large" placeholder="Injured Worker Outreach Pricing" />)}
              </Form.Item>
              <Form.Item label="Document Preparation Pricing">
                {getFieldDecorator('documentPreparationPricing', {
                  initialValue: initialValues.documentPreparationPricing
                })(<Input size="large" placeholder="Document Preparation Pricing" />)}
              </Form.Item>
              <Form.Item label="Care Meeting Pricing">
                {getFieldDecorator('careMeetingPricing', {
                  initialValue: initialValues.careMeetingPricing
                })(<Input size="large" placeholder="Care Meeting Pricing" />)}
              </Form.Item>
              <Form.Item label="Misc Pricing">
                {getFieldDecorator('miscPricing', {
                  initialValue: initialValues.miscPricing
                })(<Input size="large" placeholder="Misc Pricing" />)}
              </Form.Item>
            </div>
          ) : null
        }
        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Save Organization</Button>
        </div>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleTypeChange: (type) => dispatch(organizationFormTypeChange(type))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(Form.create()(DrawerForm));
