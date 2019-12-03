import React from 'react';
import _ from 'lodash';
import { Input, Select, Button } from 'antd';
import Form from '../../../../components/Core/Form';
import Preloader from '../../../../components/Preloader';
import ResourceSelect from '../../../../components/Core/ResourceSelect';
import { AddContactButton } from '../../../ContactsPage';

class DrawerForm extends React.Component {
  onSubmit = (values) => {
    this.props.onSend(_.extend({ manager: false }, values), this.props.form);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { single } = this.props;

    if (single.get('loading')) {
      return <Preloader />;
    }

    const initialValues = single.get('data') ? single.get('data').toJS() : {};
    if (initialValues.canWeSelectJudge !== undefined) {
      initialValues.canWeSelectJudge = initialValues.canWeSelectJudge ? 'true' : 'false';
    }
    if (initialValues.sameDayAdj !== undefined) {
      initialValues.sameDayAdj = initialValues.sameDayAdj ? 'true' : 'false';
    }

    const contactSelectTextAccessor = (option) => (`${option.firstName} ${option.lastName}`);

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        <Form.Item label="Abbreviation">
          {getFieldDecorator('abbreviation', {
            initialValue: initialValues.abbreviation,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="Abbreviation" />)}
        </Form.Item>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: initialValues.name,
            rules: [{ required: true, message: 'This field is required' }]
          })(<Input size="large" placeholder="Name" />)}
        </Form.Item>
        <Form.Item label="Address">
          {getFieldDecorator('address', {
            initialValue: initialValues.address
          })(<Input size="large" placeholder="Address" />)}
        </Form.Item>
        <Form.Item label="Can We Select Judge">
          {getFieldDecorator('canWeSelectJudge', {
            initialValue: initialValues.canWeSelectJudge
          })(
            <Select
              size="large"
              showSearch
              showArrow={false}
              style={{ width: '100%' }}
              placeholder="Can we select judge"
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Select.Option value="true">Yes</Select.Option>
              <Select.Option value="false">No</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Same Day ADJ">
          {getFieldDecorator('sameDayAdj', {
            initialValue: initialValues.sameDayAdj
          })(
            <Select
              size="large"
              showSearch
              showArrow={false}
              style={{ width: '100%' }}
              placeholder="Select same day ADJ"
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Select.Option value="true">Yes</Select.Option>
              <Select.Option value="false">No</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="I&A Officers">
          <div className="select-with-btn">
            {getFieldDecorator('IAOfficers', {
              initialValue: initialValues.IAOfficers ? initialValues.IAOfficers.map((contact) => (`${contact.id}`)) : undefined
            })(
              <ResourceSelect mode="multiple" name="contact-profiles" placeholder="Select or create officers" size="large" optionFilterProp="children" linked={initialValues.IAOfficers} textAccesor={contactSelectTextAccessor} />
            )}
            <AddContactButton />
          </div>
        </Form.Item>
        <Form.Item label="EDD Reps">
          <div className="select-with-btn">
            {getFieldDecorator('EDDReps', {
              initialValue: initialValues.EDDReps ? initialValues.EDDReps.map((contact) => (`${contact.id}`)) : undefined
            })(
              <ResourceSelect mode="multiple" name="contact-profiles" placeholder="Select or create reps" size="large" optionFilterProp="children" linked={initialValues.EDDReps} textAccesor={contactSelectTextAccessor} />
            )}
            <AddContactButton />
          </div>
        </Form.Item>
        <Form.Item label="Walk Through Schedule">
          {getFieldDecorator('walkThroughSchedule', {
            initialValue: initialValues.walkThroughSchedule
          })(<Input.TextArea size="large" placeholder="Walk Through Schedule" rows={4} />)}
        </Form.Item>
        <Form.Item label="Board Notes">
          {getFieldDecorator('boardNotes', {
            initialValue: initialValues.boardNotes
          })(<Input.TextArea size="large" placeholder="Board Notes" rows={4} />)}
        </Form.Item>
        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Save Venue</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(DrawerForm);
