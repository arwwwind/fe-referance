import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { showWindow } from '../../../../../WindowSystem/actions';

const AddClientUpdatesButton = (props) => (
  <div className="m-r-md">
    <Button type="primary" icon="plus" size="large" onClick={props.addClientUpdate}>Create Update</Button>
  </div>
);

const mapDispatchToProps = (dispatch, { caseId, serviceId }) => ({
  addClientUpdate: () => dispatch(showWindow(`serviceSaveClientUpdates${serviceId}-add`, {
    type: 'addClientUpdates',
    entityType: 'service',
    entityId: serviceId,
    serviceId,
    caseId,
    id: 'add'
  }))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(AddClientUpdatesButton);
