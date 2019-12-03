import React from 'react';
import AddNotesButton from './components/AddNotes';
import ViewNotesButton from './components/ViewNotes';
import GenerateLienReportButton from './components/GenerateLienReport';
import EditButton from './components/Edit';
import { Drawer } from '../../../OrganizationsPage';
import DrawerGenerateLienReport from '../GenerateReport/Drawer';

const ButtonsGroup = (props) => (
  <div className="flex align-items-right align-items-center buttons-group-equal">
    <Drawer />
    <DrawerGenerateLienReport organizationId={props.organizationId} />
    <GenerateLienReportButton />
    <AddNotesButton organizationId={props.organizationId} />
    <ViewNotesButton organizationId={props.organizationId} />
    <EditButton id={props.organizationId} />
  </div>
);

export default ButtonsGroup;
