import React from 'react';
import Form from './EddLiensForm';
import { formatMetricsValue } from '../../../../../utils/common';

const EddLiensHeader = (props) => (
  <div className="stats-header m-b-extra-md">
    <div className="title">Edd Liens</div>
    {props.editData ? (
      <div className="group">
        <div>
          <div className="value">{formatMetricsValue(props.overlapDays)}</div>
          <div className="f-s-13">Days of Overlap</div>
        </div>
        <div>
          <div className="value text-danger">{`$${formatMetricsValue(props.amountOwned)}`}</div>
          <div className="f-s-13">Amount Owned</div>
        </div>
        <div>
          <div className="value">{`${formatMetricsValue(props.savings)}%`}</div>
          <div className="f-s-13">Cost of Savings</div>
        </div>
      </div>
    ) : null}
    <div>
      <Form editData={props.editData} loading={props.loading} editLiensStart={props.editLiensStart} />
    </div>
  </div>
);

export default EddLiensHeader;
