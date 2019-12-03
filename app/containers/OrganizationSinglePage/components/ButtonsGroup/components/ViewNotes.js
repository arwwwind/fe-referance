import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { showWindow } from '../../../../WindowSystem/actions';

const ViewNotesButton = (props) => (
  <Button type="primary" size="large" onClick={props.viewNotes}>View Notes</Button>
);

const mapDispatchToProps = (dispatch, { organizationId }) => ({
  viewNotes: () => dispatch(showWindow(`listNotes${organizationId}`, {
    type: 'listNotes',
    entityType: 'organization',
    entityId: organizationId
  }))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(ViewNotesButton);
