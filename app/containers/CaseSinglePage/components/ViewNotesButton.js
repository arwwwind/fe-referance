import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { showWindow } from '../../WindowSystem/actions';

const ViewNotesButton = (props) => (
  <div className="m-r-md">
    <Button type="primary" size="large" onClick={props.viewNotes}>View Notes</Button>
  </div>
);

const mapDispatchToProps = (dispatch, { caseId, serviceId }) => ({
  viewNotes: () => serviceId ? dispatch(showWindow(`listNotes${serviceId}`, {
    type: 'listNotes',
    entityType: 'service',
    entityId: serviceId
  })) : dispatch(showWindow(`listNotes${caseId}`, {
    type: 'listNotes',
    entityType: 'case',
    entityId: caseId
  }))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(ViewNotesButton);
