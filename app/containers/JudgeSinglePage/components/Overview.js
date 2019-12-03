import React from 'react';
import { Row, Col } from 'antd';
import isEmpty from 'lodash/isEmpty';
import Errors from '../../../components/Errors';
import { checkValidValue, formatMetricsValue } from '../../../utils/common';

const Overview = (props) => (
  <div className="stats-group b-b-1 p-b-extra-md m-t-extra-xs m-b-extra-xs">
    <div className="text-title m-b-md">Overview</div>
    {props.error && isEmpty(props.data) ? (
      <Errors errors={props.error} />
    ) : (
      <Row gutter={15} type="flex">
        {checkValidValue(props.data.cases) ?
          <Col className="stats-item" sm={6} xs={8}>
            <div className="stats-value">{formatMetricsValue(props.data.cases)}</div>
            <div className="stats-name">Cases</div>
          </Col> : null}
        {checkValidValue(props.data.suspendedCases) ?
          <Col className="stats-item" sm={6} xs={8}>
            <div className="stats-value">{formatMetricsValue(props.data.suspendedCases)}</div>
            <div className="stats-name">Suspended Cases</div>
          </Col> : null}
        {checkValidValue(props.data.walkthroughApprovalRating) ?
          <Col className="stats-item" sm={6} xs={8}>
            <div className="stats-value">{props.data.walkthroughApprovalRating !== '-' ? `${formatMetricsValue(props.data.walkthroughApprovalRating)}%` : '-'}</div>
            <div className="stats-name">WT Approval Rating</div>
          </Col> : null}
      </Row>
    )}
  </div>
);

export default Overview;
