import React from 'react';
import * as statuses from './SaveService/statuses';

const Service = (props) => (
  <div className="service-item">
    {props.children}
    <div className="two-columns-auto-width space-between m-b-sm">
      <div className="column">
        <div className="label-badge primary m-b-xs">{props.serviceType ? props.serviceType : 'unknown'}</div>
        {props.rushRequested ? <div className="text-warning">Rush Requested</div> : null}
      </div>
      <div className="column text-right">
        <div className="text-bold m-b-xs">Status</div>
        <div className="text-info">{statuses.getLabel(props.status)}</div>
      </div>
    </div>
    <div className="text-muted">Referred -</div>
    <div className="text-muted m-b-sm">Turn Around Time (0 days)</div>
    {props.referredBy ? (
      <div className="m-b-xs">
        <span className="text-bold m-r-xs">Contact For</span>
        <span>{`${props.referredBy.firstName} ${props.referredBy.lastName}`}</span>
      </div>
    ) : null}
    <div className="two-columns-auto-width m-b-sm">
      {props.currentClaimHandler ? (
        <div className="column">
          <div className="text-bold">Managed By</div>
          <div className="f-s-13">{`${props.currentClaimHandler.firstName} ${props.currentClaimHandler.lastName}`}</div>
        </div>
      ) : null}
      {props.serviceOwner ? (
        <div className="column text-right">
          <div className="text-bold">Owned By</div>
          <div className="f-s-13">{`${props.serviceOwner.firstName} ${props.serviceOwner.lastName}`}</div>
        </div>
      ) : null}
    </div>
    <div>
      <div className="text-bold m-b-xs">Description</div>
      <div className="text-muted">
        {props.description ? props.description : '-'}
      </div>
    </div>
  </div>
);

export default Service;
