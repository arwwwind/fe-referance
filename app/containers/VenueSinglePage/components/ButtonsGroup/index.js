import React from 'react';
import AddNotesButton from './components/AddNotes';
import ViewNotesButton from './components/ViewNotes';
import EditButton from './components/Edit';
import { Drawer } from '../../../VenuesPage/Venues';

const ButtonsGroup = (props) => (
  <div className="flex align-items-right align-items-center buttons-group-equal">
    <Drawer />
    <AddNotesButton venueId={props.venueId} />
    <ViewNotesButton venueId={props.venueId} />
    <EditButton id={props.venueId} />
  </div>
);

export default ButtonsGroup;
