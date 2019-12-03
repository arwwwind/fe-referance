import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { showWindow } from '../../WindowSystem/actions';

const AddNotesButton = (props) => (
  <div className="m-r-md">
    <Button type="primary" icon="plus" size="large" onClick={props.addNote}>Add Notes</Button>
  </div>
);

const mapDispatchToProps = (dispatch, { caseId, serviceId }) => ({
  addNote: () => serviceId ? dispatch(showWindow(`serviceSaveNotes${serviceId}-add`, {
    type: 'addNotes',
    entityType: 'service',
    entityId: serviceId,
    id: 'add'
  })) : dispatch(showWindow(`caseSaveNotes${caseId}-add`, {
    type: 'addNotes',
    entityType: 'case',
    entityId: caseId,
    id: 'add'
  }))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(AddNotesButton);
