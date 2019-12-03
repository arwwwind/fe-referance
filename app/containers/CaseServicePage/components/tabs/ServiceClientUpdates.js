import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ClientUpdatesTable } from './ClientUpdates';
import { getCaseId, getServiceId } from '../../../../utils/router';


const ServiceClientUpdates = ({ caseId, serviceId }) => (
  <div className="p-md">
    <ClientUpdatesTable caseId={caseId} serviceId={serviceId} />
  </div>
);

const mapStateToProps = (state) => ({
  caseId: getCaseId(state.get('route').get('location').get('pathname')),
  serviceId: getServiceId(state.get('route').get('location').get('pathname'))
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ServiceClientUpdates);
