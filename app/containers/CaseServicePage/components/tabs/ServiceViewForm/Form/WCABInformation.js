import React from 'react';
import { Input } from 'antd';
import Form from '../../../../../../components/Core/Form';
import ResourceSelect from '../../../../../../components/Core/ResourceSelect';
import { AddJudgeButton } from '../../../../../VenuesPage/Judges';
import { AddVenueButton } from '../../../../../VenuesPage/Venues';

const selectTextAccessor = (option) => (`${option.firstName} ${option.lastName}`);

const WCABInformation = (props) => (
  <div>
    <Form.Item label="Judge">
      <div className="select-with-btn">
        {props.getFieldDecorator('judgeId', {
          initialValue: props.initialValues.judgeId ? `${props.initialValues.judgeId}` : undefined
        })(
          <ResourceSelect name="judges" placeholder="Select or create a judge" size="large" linked={props.initialValues.judge} textAccesor={selectTextAccessor} />
        )}
        <AddJudgeButton />
      </div>
    </Form.Item>
    <Form.Item label="Assigned Venue">
      <div className="select-with-btn">
        {props.getFieldDecorator('venueId', {
          initialValue: props.initialValues.venueId ? `${props.initialValues.venueId}` : undefined
        })(
          <ResourceSelect name="venues" placeholder="Select or create a venue" size="large" linked={props.initialValues.venue} />
        )}
        <AddVenueButton />
      </div>
    </Form.Item>
    <Form.Item label="ADJ Number">
      {props.getFieldDecorator('ADJNumber', {
        initialValue: props.initialValues.ADJNumber
      })(<Input size="large" placeholder="ADJ Number" />)}
    </Form.Item>
  </div>
);

export default WCABInformation;
