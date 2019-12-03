import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { showWindow } from '../../../../WindowSystem/actions';

const AddNotesButton = (props) => (
  <Button type="primary" size="large" onClick={props.addNote}>Add Note</Button>
);

const mapDispatchToProps = (dispatch, { judgeId }) => ({
  addNote: () => dispatch(showWindow(`judgeSaveNotes${judgeId}-add`, {
    type: 'addNotes',
    entityType: 'judge',
    entityId: judgeId,
    id: 'add'
  }))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(AddNotesButton);
