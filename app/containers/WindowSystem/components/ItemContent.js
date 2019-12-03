import React from 'react';
import * as Notes from '../../Notes';
import { Form } from '../../CaseServicePage/components/tabs/ClientUpdates';

const ItemContent = ({ type, ...options }) => {
  switch (type) {
    case 'listNotes': return <Notes.List {...options} />;
    case 'addNotes': return (
      <div className="p-md">
        <Notes.DrawerForm {...options} />
      </div>
    );
    case 'addClientUpdates': return (
      <div className="p-md">
        <Form {...options} />
      </div>
    );
    default: return null;
  }
};

export default ItemContent;
