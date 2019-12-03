import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { showWindow } from '../../../../WindowSystem/actions';

const AddNotesButton = (props) => (
  <Button type="primary" size="large" onClick={props.addNote}>Add Note</Button>
);

const mapDispatchToProps = (dispatch, { contactId }) => ({
  addNote: () => dispatch(showWindow(`contactSaveNotes${contactId}-add`, {
    type: 'addNotes',
    entityType: 'contact',
    entityId: contactId,
    id: 'add'
  }))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(AddNotesButton);
