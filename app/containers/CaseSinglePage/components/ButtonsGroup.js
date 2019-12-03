import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';
import { getCaseId, getServiceId } from '../../../utils/router';
import ViewNotesButton from './ViewNotesButton';
import AddNotesButton from './AddNotesButton';
import { Button as ServiceButton } from '../components/SaveService';

const ButtonsGroup = ({
  className,
  caseId,
  serviceId,
  children
}) => (
  <div className={classNames(className, 'buttons-group-equal m-b-extra-md')}>
    {children}
    <AddNotesButton caseId={caseId} serviceId={serviceId} />
    <ViewNotesButton caseId={caseId} serviceId={serviceId} />
    <ServiceButton caseId={caseId} serviceId={serviceId} />
  </div>
);

const mapStateToProps = (state) => {
  const pathname = state.get('route').get('location').get('pathname');

  return {
    caseId: getCaseId(pathname),
    serviceId: getServiceId(pathname)
  };
};

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ButtonsGroup);
