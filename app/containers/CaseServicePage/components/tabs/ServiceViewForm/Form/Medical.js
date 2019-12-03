import React from 'react';
import moment from 'moment';
import { Input, DatePicker, InputNumber } from 'antd';
import Form from '../../../../../../components/Core/Form';

const Medical = (props) => (
  <div>
    <Form.Item label="PS Date">
      {props.getFieldDecorator('permantAndStationeryDate', {
        initialValue: props.initialValues.permantAndStationeryDate ? moment(props.initialValues.permantAndStationeryDate) : undefined
      })(<DatePicker style={{ width: '100%' }} placeholder="PS Date" />)}
    </Form.Item>
    <Form.Item label="Whole Person Imparement">
      {props.getFieldDecorator('walkthrough.wholePersonImparement', {
        initialValue: props.initialValues.walkthrough.wholePersonImparement
      })(
        <InputNumber
          size="large"
          style={{ width: '100%' }}
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace('%', '')}
          optionFilterProp="children"
          placeholder="Whole Person Imparement"
        />
      )}
    </Form.Item>
    <Form.Item label="Appointment">
      {props.getFieldDecorator('walkthrough.apportionment', {
        initialValue: props.initialValues.walkthrough.apportionment
      })(
        <InputNumber
          size="large"
          style={{ width: '100%' }}
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace('%', '')}
          optionFilterProp="children"
          placeholder="Appointment"
        />
      )}
    </Form.Item>
    <Form.Item label="Future Medical">
      {props.getFieldDecorator('walkthrough.futureMedical', {
        initialValue: props.initialValues.walkthrough.futureMedical
      })(<Input size="large" placeholder="Future Medical" />)}
    </Form.Item>
    <Form.Item label="Injury Details">
      {props.getFieldDecorator('walkthrough.injuryDetails', {
        initialValue: props.initialValues.walkthrough.injuryDetails
      })(<Input size="large" placeholder="Injury Details" />)}
    </Form.Item>
    <Form.Item label="MSA Amount">
      {props.getFieldDecorator('walkthrough.MSAAmount', {
        initialValue: props.initialValues.walkthrough.MSAAmount
      })(
        <InputNumber
          size="large"
          style={{ width: '100%' }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
          optionFilterProp="children"
          placeholder="MSA Amount"
        />
      )}
    </Form.Item>
    <Form.Item label="Referenced Medical Report">
      {props.getFieldDecorator('walkthrough.referencedMedicalReportDoctorName', {
        initialValue: props.initialValues.walkthrough.referencedMedicalReportDoctorName
      })(<Input size="large" placeholder="Doctor Name" />)}
    </Form.Item>
    <Form.Item label="Referenced Medical Report">
      {props.getFieldDecorator('walkthrough.referencedMediacalReportDate', {
        initialValue: props.initialValues.walkthrough.referencedMediacalReportDate ? moment(props.initialValues.walkthrough.referencedMediacalReportDate) : undefined
      })(<DatePicker style={{ width: '100%' }} placeholder="Date" />)}
    </Form.Item>
  </div>
);

export default Medical;
