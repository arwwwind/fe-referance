import React from 'react';
import CoreDrawer from '../../../../../components/Core/Drawer';
import DrawerForm from './DrawerForm';

const Drawer = (props) => (
  <CoreDrawer
    className="service-form"
    title={props.id ? 'Edit Service' : 'Add Service'}
    name="services"
    width={834}
    style={{
      height: 'calc(100% - 250px)',
      overflow: 'auto',
      paddingBottom: 0,
    }}
  >
    <DrawerForm onSend={props.onSend} single={props.single} isAdmin={props.isAdmin} step={props.step} />
  </CoreDrawer>
);

export default Drawer;
