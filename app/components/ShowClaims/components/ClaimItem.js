import React from 'react';
import { formatDate, stringToText } from '../../../utils/common';

const ClaimItem = (props) => (
  <div className="claims-item">
    <div className="claim-item-title">{props.title}</div>
    <div className="claim-item-row">
      <div>Claim Number:</div>
      <div>{stringToText(props.claimNumber)}</div>
    </div>
    <div className="claim-item-row">
      <div>ADJ Number:</div>
      <div>{stringToText(props.adjNumber)}</div>
    </div>
    <div className="claim-item-row">
      <div>Injury Start Date:</div>
      <div>{stringToText(formatDate(props.startDate))}</div>
    </div>
    <div className="claim-item-row">
      <div>Injury End Date:</div>
      <div>{stringToText(formatDate(props.endDate))}</div>
    </div>
  </div>
);

export default ClaimItem;
