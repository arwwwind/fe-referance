import React from 'react';
import moment from 'moment';
import isBoolean from 'lodash/isBoolean';
import { Input, DatePicker, Select, InputNumber } from 'antd';
import Form from '../../../../../../components/Core/Form';
import { WALKTHROUGH } from '../../../../../CaseSinglePage/components/SaveService/types';

const Settlement = (props) => (
  <div>
    <Form.Item label="Settlement Type">
      {props.getFieldDecorator('settlementType', {
        initialValue: props.initialValues.settlementType
      })(
        <Select
          size="large"
          style={{ width: '100%' }}
          placeholder="Select Settlement Type"
          optionFilterProp="children"
        >
          <Select.Option value="STIP">STIP</Select.Option>
          <Select.Option value="C&R">C&R</Select.Option>
        </Select>
      )}
    </Form.Item>
    <Form.Item label="Case Settlement Date">
      {props.getFieldDecorator('caseSettlementDate', {
        initialValue: props.initialValues.caseSettlementDate ? moment(props.initialValues.caseSettlementDate) : undefined
      })(<DatePicker style={{ width: '100%' }} placeholder="Case Settlement Date" />)}
    </Form.Item>
    <Form.Item label="IW Still employed?">
      {props.getFieldDecorator('IWStillEmployed', {
        initialValue: isBoolean(props.initialValues.IWStillEmployed) ? (props.initialValues.IWStillEmployed ? 'true' : 'false') : undefined
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
    <Form.Item label="Leaving Balance">
      {props.getFieldDecorator('leavingBalance', {
        initialValue: props.initialValues.leavingBalance
      })(
        <InputNumber
          size="large"
          style={{ width: '100%' }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
          optionFilterProp="children"
          placeholder="Leaving Balance"
        />
      )}
    </Form.Item>
    {props.initialValues.serviceType === WALKTHROUGH ? (
      <div>
        <Form.Item label="Additional Documents">
          {props.getFieldDecorator('walkthrough.additionalDocuments', {
            initialValue: props.initialValues.walkthrough.additionalDocuments
          })(<Input size="large" placeholder="Additional Documents" />)}
        </Form.Item>
        <Form.Item label="Insured or Self Insured">
          {props.getFieldDecorator('walkthrough.insuredOrSelfInsured', {
            initialValue: props.initialValues.walkthrough.insuredOrSelfInsured
          })(
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder="Select Insured or Self Insured"
              optionFilterProp="children"
            >
              <Select.Option value="insured">Insured</Select.Option>
              <Select.Option value="self insured">Self Insured</Select.Option>
            </Select>
          )}
        </Form.Item>
      </div>
    ) : null}
  </div>
);

export default Settlement;
