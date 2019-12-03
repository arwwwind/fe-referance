import React from 'react';
import { HoldServicesTable } from './Performance/HoldTable';
import Metrics from './Performance/Performance'

const ServicePerformance = ({ caseId, serviceId }) => (
  <div>
    <Metrics caseId={caseId} serviceId={serviceId} />
    <HoldServicesTable caseId={caseId} serviceId={serviceId} />
  </div>
);

export default ServicePerformance;
