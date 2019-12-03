import React from 'react';
import { Row, Col } from 'antd';
import isEmpty from 'lodash/isEmpty';
import Errors from '../../../components/Errors';
import { checkValidValue } from '../../../utils/common';

const Overview = (props) => (
  <div className="stats-group b-b-1 p-b-extra-md m-t-extra-xs m-b-extra-xs">
    <div className="text-title m-b-md">Overview</div>
    {props.error && isEmpty(props.data) ? (
      <Errors errors={props.error} />
    ) : (
      <Row gutter={15} type="flex">
        {checkValidValue(props.data.daySinceLastReferral) ? (
          <Col className="stats-item" sm={6} xs={8}>
            <div className="stats-value">{props.data.daySinceLastReferral}</div>
            <div className="stats-name">Day Since Last Referral</div>
          </Col>
        ) : null}
        {checkValidValue(props.data.totalReferrals) ? (
          <Col className="stats-item" sm={6} xs={8}>
            <div className="stats-value">{props.data.totalReferrals}</div>
            <div className="stats-name">Total Referrals</div>
          </Col>
        ) : null}
        {checkValidValue(props.data.openCases) ? (
          <Col className="stats-item" sm={6} xs={8}>
            <div className="stats-value">{props.data.openCases}</div>
            <div className="stats-name">Open Cases</div>
          </Col>
        ) : null}
        {checkValidValue(props.data.walkthroughApprovalRating) ? (
          <Col className="stats-item" sm={6} xs={8}>
            <div className="stats-value">{props.data.walkthroughApprovalRating !== '-' ? `${props.data.walkthroughApprovalRating}%` : '-'}</div>
            <div className="stats-name">WT Approval Rating</div>
          </Col>
        ) : null}
        {checkValidValue(props.data.iwoSuccessRate) ? (
          <Col className="stats-item" sm={6} xs={8}>
            <div className="stats-value">{props.data.iwoSuccessRate !== '-' ? `${props.data.iwoSuccessRate}%` : '-'}</div>
            <div className="stats-name">IWO Success Rate</div>
          </Col>
        ) : null}
      </Row>
    )}
  </div>
);

export default Overview;
