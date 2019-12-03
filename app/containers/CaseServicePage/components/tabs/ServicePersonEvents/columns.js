import React from 'react';
import EditButton from './components/EditButton';
import DeleteConfirm from './components/DeleteConfirm';

export const getName = (row) => row.name;

export default [
  {
    Header: 'Type',
    id: 'type',
    accessor: (row) => (row.type ? row.type : '-')
  },
  {
    Header: 'Rep',
    id: 'rep',
    accessor: (row) => (row.rep ? `${row.rep.firstName} ${row.rep.lastName}` : '-'),
  },
  {
    Header: 'Date/Time',
    id: 'dateOfHEaring',
    accessor: (row) => (row.dateOfHEaring ? row.dateOfHEaring : '-')
  },
  {
    Header: 'Description',
    id: 'description',
    accessor: (row) => (row.description ? row.description : '-')
  },
  {
    Header: 'Venue',
    id: 'venue',
    accessor: (row) => (row.venue ? row.venue.name : '-')
  },
  {
    Header: 'Creator',
    id: 'creator',
    accessor: (row) => (row.creator ? `${row.creator.firstName} ${row.creator.lastName}` : '-'),
  },
  {
    Header: 'Rating',
    id: 'rating',
    accessor: (row) => (row.rating ? row.rating : '-')
  },
  {
    Header: 'Rating Reason',
    id: 'ratingReason',
    accessor: (row) => (row.ratingReason ? row.ratingReason : '-')
  },
  {
    Header: 'Edit',
    id: 'edit',
    width: 60,
    className: 'center',
    resizable: false,
    accessor: (row) => ( // eslint-disable-line react/display-name
      <EditButton id={row.id} />
    )
  },
  {
    Header: 'Delete',
    id: 'delete',
    width: 75,
    className: 'center',
    resizable: false,
    accessor: (row) => // eslint-disable-line react/display-name
      (
        <DeleteConfirm id={row.id} />
      )
  }
];
