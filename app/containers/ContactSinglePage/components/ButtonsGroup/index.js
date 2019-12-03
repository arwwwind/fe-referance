import React from 'react';
import AddNotesButton from './components/AddNotes';
import ViewNotesButton from './components/ViewNotes';
import MetricsButton from './components/Metrics';
import EditButton from './components/Edit';
import { Drawer } from '../../../ContactsPage';

const ButtonsGroup = (props) => (
  <div className="flex align-items-right align-items-center buttons-group-equal">
    <Drawer />
    <MetricsButton contactId={props.contactId} />
    <AddNotesButton contactId={props.contactId} />
    <ViewNotesButton contactId={props.contactId} />
    <EditButton id={props.contactId} />
  </div>
);

export default ButtonsGroup;
