import React from 'react';
import { Input, Select, Button, DatePicker } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import Form from '../../../components/Core/Form';
import Preloader from '../../../components/Preloader';
import ResourceSelect from '../../../components/Core/ResourceSelect';
import { AddOrganizationButton } from '../../OrganizationsPage';
import { contactTypes, eligibleAssignments } from '../config';
import { contactFormTypeChange } from '../actions';
import { UploadContactAvatar } from '../../../components/Upload';
import config from '../../../config';

const prepareEligibleAssignmentsToSend = (values) => (values && values.length ? values.join('|') : null);
const prepareEligibleAssignmentsToShow = (value) => (value ? value.split('|') : null);

class DrawerForm extends React.Component {
  state = {
    faxLink: this.props.single.get('data') ? this.props.single.get('data').toJS().faxLink : null
  };

  onSubmit = (values) => {
    values.eligibleAssignments = prepareEligibleAssignmentsToSend(values.eligibleAssignments);
    this.props.onSend(values, this.props.form);
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
    initialValues.contactType = initialValues.contactType ? initialValues.contactType : undefined;

    const organisationSelectTextAccessor = (option) => (option.companyName);

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        <Form.Item label="First Name">
          {getFieldDecorator('firstName', {
            initialValue: initialValues.firstName,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="First Name" />)}
        </Form.Item>
        <Form.Item label="Last Name">
          {getFieldDecorator('lastName', {
            initialValue: initialValues.lastName,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="Last Name" />)}
        </Form.Item>
        <Form.Item label="Contact Image">
          {getFieldDecorator('contactImage', {})(<UploadContactAvatar contact={initialValues} />)}
        </Form.Item>
        <Form.Item label="Contact Type">
          {getFieldDecorator('contactType', {
            initialValue: initialValues.contactType,
            rules: [{ required: true, message: 'This field is required' }],
          })(
            <Select
              size="large"
              placeholder="Select contact type"
              onChange={this.props.handleTypeChange}
            >
              {contactTypes.map((type) => <Select.Option value={type.value} key={type.value}>{type.label}</Select.Option>)}
            </Select>
          )}
        </Form.Item>
        <div className="form-group-vertical">
          {
            (single.get('type') !== undefined) ? (
              <div>
                <Form.Item label="Title">
                  {getFieldDecorator('title', {
                    initialValue: initialValues.title,
                    rules: [{ required: true, message: 'This field is required' }]
                  })(<Input size="large" placeholder="Title" />)}
                </Form.Item>
                <Form.Item label="Organization">
                  <div className="select-with-btn">
                    {getFieldDecorator('organisationId', {
                      initialValue: initialValues.organisation ? `${initialValues.organisation.id}` : undefined,
                      rules: [{ required: true, message: 'This field is required' }]
                    })(
                      <ResourceSelect name="organisations" placeholder="Select or create an organization" size="large" linked={initialValues.organisation} textAccesor={organisationSelectTextAccessor} />
                    )}
                    <AddOrganizationButton />
                  </div>
                </Form.Item>
                <Form.Item label="Description">
                  {getFieldDecorator('description', {
                    initialValue: initialValues.description
                  })(<Input.TextArea size="large" placeholder="Description" rows={2} />)}
                </Form.Item>
                {single.get('type') !== 'injured-worker' ? (
                  <Form.Item label="Office Number">
                    <Input.Group className="form-group" size="large">
                      <div className="form-group-item" style={{ width: '19%' }}>
                        <div className="form-group-item-label">Type</div>
                        <Form.Item>
                          {getFieldDecorator('officeNumberType', {
                            initialValue: initialValues.officeNumberType
                          })(<Input size="large" />)}
                        </Form.Item>
                      </div>
                      <div className="form-group-item" style={{ width: '48%' }}>
                        <div className="form-group-item-label">Phone number</div>
                        <Form.Item>
                          {getFieldDecorator('officeNumber', {
                            initialValue: initialValues.officeNumber
                          })(<Input size="large" />)}
                        </Form.Item>
                      </div>
                      <div className="form-group-item" style={{ width: '29%' }}>
                        <div className="form-group-item-label">Extension</div>
                        <Form.Item>
                          {getFieldDecorator('officeNumberExtension', {
                            initialValue: initialValues.officeNumberExtension
                          })(<Input size="large" />)}
                        </Form.Item>
                      </div>
                    </Input.Group>
                  </Form.Item>
                ) : null}
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
                  {getFieldDecorator('faxNumber', {
                    initialValue: initialValues.faxNumber
                  })(<Input size="large" placeholder="Fax Number" onChange={this.updateFaxLink} />)}
                </Form.Item>
                <Form.Item label="Fax Link">
                  {getFieldDecorator('faxLink', {
                    initialValue: this.state.faxLink || initialValues.faxLink
                  })(<Input size="large" placeholder="Fax Link" addonAfter={config.faxLinkDomain} readOnly />)}
                </Form.Item>
                <Form.Item label="Email">
                  {getFieldDecorator('email', {
                    initialValue: initialValues.email,
                    rules: [{ type: 'email', message: 'Please enter a valid email address' }]
                  })(<Input size="large" placeholder="Email" type="email" />)}
                </Form.Item>
              </div>
            ) : null
          }
          {
            (single.get('type') === 'adjuster' || single.get('type') === 'manager') ? (
              <div className="m-t-xl">
                <Form.Item label="Special Instructions">
                  {getFieldDecorator('specialInstructionNotes', {
                    initialValue: initialValues.specialInstructionNotes
                  })(<Input.TextArea size="large" placeholder="Special Instructions" rows={4} />)}
                </Form.Item>
                <Form.Item label="Sales Contacts Notes">
                  {getFieldDecorator('salesContactNotes', {
                    initialValue: initialValues.salesContactNotes
                  })(<Input.TextArea size="large" placeholder="Sales Contacts Notes" rows={4} />)}
                </Form.Item>
                <Form.Item label="Accounts">
                  <div className="select-with-btn">
                    {getFieldDecorator('accounts', {
                      initialValue: initialValues.accounts ? initialValues.accounts.map((account) => (`${account.id}`)) : undefined
                    })(
                      <ResourceSelect mode="multiple" name="organisations/account" placeholder="Select or create an account" size="large" optionFilterProp="children" linked={initialValues.accounts} textAccesor={organisationSelectTextAccessor} />
                    )}
                    <AddOrganizationButton />
                  </div>
                </Form.Item>
                <Form.Item label="Remote or Local">
                  {getFieldDecorator('remoteOrLocal', {
                    initialValue: initialValues.remoteOrLocal ? initialValues.remoteOrLocal : undefined
                  })(
                    <Select
                      size="large"
                      style={{ width: '100%' }}
                      placeholder="Select remote or local"
                      optionFilterProp="children"
                    >
                      <Select.Option value="remote">Remote</Select.Option>
                      <Select.Option value="local">Local</Select.Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="Verified Contact">
                  {getFieldDecorator('verifiedContact', {
                    initialValue: initialValues.verifiedContact !== undefined && initialValues.verifiedContact !== null ? `${initialValues.verifiedContact}` : undefined
                  })(
                    <Select
                      size="large"
                      style={{ width: '100%' }}
                      placeholder="Select yes or no"
                      optionFilterProp="children"
                    >
                      <Select.Option value="true">Yes</Select.Option>
                      <Select.Option value="false">No</Select.Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="Eligible Assignments">
                  {getFieldDecorator('eligibleAssignments', {
                    initialValue: initialValues.eligibleAssignments ? prepareEligibleAssignmentsToShow(initialValues.eligibleAssignments) : undefined
                  })(
                    <Select
                      mode="multiple"
                      size="large"
                      showSearch
                      showArrow={false}
                      style={{ width: '100%' }}
                      placeholder="Eligible Assignments"
                    >
                      {eligibleAssignments.map((item) => <Select.Option value={item} key={item}>{item}</Select.Option>)}
                    </Select>
                  )}
                </Form.Item>
              </div>
            ) : null
          }
          {
            (single.get('type') === 'injured-worker') ? (
              <div className="m-t-xl">
                <Form.Item label="Date of Birth">
                  {getFieldDecorator('dateOfBirth', {
                    initialValue: initialValues.dateOfBirth ? moment(initialValues.dateOfBirth) : undefined
                  })(<DatePicker style={{ width: '100%' }} placeholder="Date of Birth" format="MM/DD/YYYY" />)}
                </Form.Item>
                <Form.Item label="Full Address">
                  {getFieldDecorator('address', {
                    initialValue: initialValues.address
                  })(<Input size="large" placeholder="Full Address" />)}
                </Form.Item>
              </div>
            ) : null
          }
          {
            (single.get('type') === 'juvo-rep' || single.get('type') === 'employee') ? (
              <div className="m-t-xl">
                <Form.Item label="Primary Boards">
                  {getFieldDecorator('primaryBoards', {
                    initialValue: initialValues.VenuesWhereBoardReps ? initialValues.VenuesWhereBoardReps.map((venue) => (`${venue.id}`)) : undefined
                  })(
                    <ResourceSelect mode="multiple" name="venues" placeholder="Select boards" size="large" linked={initialValues.VenuesWhereBoardReps} />
                  )}
                </Form.Item>
                <Form.Item label="Makes Appearances">
                  {getFieldDecorator('makesAppearances', {
                    initialValue: initialValues.makesAppearances !== undefined && initialValues.makesAppearances !== null ? `${initialValues.makesAppearances}` : undefined
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
        </div>
        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Save Contact</Button>
        </div>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleTypeChange: (type) => dispatch(contactFormTypeChange(type))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(Form.create()(DrawerForm));
