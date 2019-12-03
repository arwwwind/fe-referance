import React from 'react';
import { Input, InputNumber, Select } from 'antd';
import Form from '../../../../../../components/Core/Form';
import { convertToString } from '../../../../../../utils/common';

const IndemnityForm = (props) => (
  <div>
    <Form.Item label="TD Paid">
      {props.getFieldDecorator('walkthrough.TDPaid', {
        initialValue: props.initialValues.walkthrough.TDPaid
      })(
        <InputNumber
          size="large"
          style={{ width: '100%' }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
          optionFilterProp="children"
          placeholder="TD Paid"
        />
      )}
    </Form.Item>
    <Form.Item label="PD Percent">
      {props.getFieldDecorator('walkthrough.PDPercent', {
        initialValue: props.initialValues.walkthrough.PDPercent
      })(
        <InputNumber
          size="large"
          style={{ width: '100%' }}
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace('%', '')}
          optionFilterProp="children"
          placeholder="PD Percent"
        />
      )}
    </Form.Item>
    <Form.Item label="PD Paid">
      {props.getFieldDecorator('walkthrough.PDPaid', {
        initialValue: props.initialValues.walkthrough.PDPaid
      })(
        <InputNumber
          size="large"
          style={{ width: '100%' }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
          optionFilterProp="children"
          placeholder="PD Paid"
        />
      )}
    </Form.Item>
    <Form.Item label="PD Value">
      {props.getFieldDecorator('walkthrough.PDValue', {
        initialValue: props.initialValues.walkthrough.PDValue
      })(
        <InputNumber
          size="large"
          style={{ width: '100%' }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
          optionFilterProp="children"
          placeholder="PD Value"
        />
      )}
    </Form.Item>
    <Form.Item label="Settlement Docs">
      {props.getFieldDecorator('walkthrough.settlementDocs', {
        initialValue: convertToString(props.initialValues.walkthrough.settlementDocs)
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
    <Form.Item label="Rating">
      {props.getFieldDecorator('walkthrough.docRating', {
        initialValue: props.initialValues.walkthrough.docRating
      })(<Input size="large" placeholder="Rating" />)}
    </Form.Item>
  </div>
);

export default IndemnityForm;
