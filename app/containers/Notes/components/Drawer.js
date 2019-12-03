import React from 'react';
import CoreDrawer from '../../../components/Core/Drawer';
import DrawerForm from './DrawerForm';

const Drawer = (props) => (
  <CoreDrawer title={props.id ? 'Edit Note' : 'Add Note'} name={`${props.entity}Notes`} width={407}>
    <DrawerForm onSend={props.onSend} single={props.single} isAdmin={props.isAdmin} />
  </CoreDrawer>
);

export default Drawer;
