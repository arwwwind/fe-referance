import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { showWindow } from '../../../../WindowSystem/actions';

const ViewNotesButton = (props) => (
  <Button type="primary" size="large" onClick={props.viewNotes}>View Notes</Button>
);

const mapDispatchToProps = (dispatch, { venueId }) => ({
  viewNotes: () => dispatch(showWindow(`listNotes${venueId}`, {
    type: 'listNotes',
    entityType: 'venue',
    entityId: venueId
  }))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(ViewNotesButton);
