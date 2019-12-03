import React from 'react';
import EditButton from './components/EditButton';
import DeleteConfirm from './components/DeleteConfirm';
import { noteTypeLabelByValue } from './config';

const strip = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '-';
};

export default [
  {
    Header: 'Date Created',
    accessor: 'createdAt'
  },
  {
    Header: 'Note Type',
    id: 'type',
    accessor: (row) => (row.type ? noteTypeLabelByValue(row.type) : '-')
  },
  {
    Header: 'Activity Type',
    accessor: 'activityType'
  },
  {
    Header: 'Subject Line',
    accessor: 'subject'
  },
  {
    Header: 'Note Creator',
    id: 'noteCreator',
    accessor: (row) => (row.noteCreator ? row.noteCreator : '-')
  },
  {
    Header: 'Linked Object',
    id: 'linkedObject',
    accessor: (row) => (row.linkedObject ? row.linkedObject : '-')
  },
  {
    Header: 'Content (Search)',
    id: 'content',
    accessor: (row) => (row.content ? strip(row.content) : '-')
  },
  {
    Header: 'File Attachments',
    id: 'attachments',
    accessor: (row) => (row.attachments ? row.attachments : '-')
  },
  {
    Header: 'Edit',
    id: 'edit',
    width: 60,
    className: 'center',
    resizable: false,
    sortable: false,
    accessor: (row) => ( // eslint-disable-line react/display-name
      <EditButton id={row.id} entityId={row.entityId} entityType={row.entityType} />
    )
  },
  {
    Header: 'Delete',
    id: 'delete',
    width: 75,
    className: 'center',
    resizable: false,
    sortable: false,
    accessor: (row) => ( // eslint-disable-line react/display-name
      <DeleteConfirm id={row.id} entityId={row.entityId} entityType={row.entityType} />
    )
  }
];
