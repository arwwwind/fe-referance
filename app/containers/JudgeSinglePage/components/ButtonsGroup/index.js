import React from 'react';
import AddNotesButton from './components/AddNotes';
import ViewNotesButton from './components/ViewNotes';
import EditButton from './components/Edit';
import { Drawer } from '../../../VenuesPage/Judges';

const ButtonsGroup = (props) => (
  <div className="flex align-items-right align-items-center buttons-group-equal">
    <Drawer />
    <AddNotesButton judgeId={props.judgeId} />
    <ViewNotesButton judgeId={props.judgeId} />
    <EditButton id={props.judgeId} />
  </div>
);

export default ButtonsGroup;
