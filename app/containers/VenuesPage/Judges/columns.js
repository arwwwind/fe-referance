import React from 'react';
import { NavLink } from 'react-router-dom';
import EditButton from './components/EditButton';
import DeleteConfirm from './components/DeleteConfirm';

export const getName = (row) => {
  let { firstName, lastName } = row;

  if (!firstName) {
    firstName = '';
  }

  if (!lastName) {
    lastName = '';
  }

  return (firstName || lastName) ? `${firstName} ${lastName}` : '-';
};

export default [
  {
    Header: 'Name',
    id: 'fullName',
    accessor: (row) => (<NavLink to={`/judge/${row.id}`}>{getName(row)}</NavLink>) // eslint-disable-line react/display-name
  },
  {
    Header: 'Venue',
    accessor: 'venue.name'
  },
  {
    Header: 'Approval Rating',
    id: 'approvalRating',
    accessor: (row) => (row.approvalRating ? row.approvalRating : '-')
  },
  {
    Header: 'Number of Cases',
    id: 'numberOfCases',
    accessor: (row) => (0)
  },
  {
    Header: 'Active',
    id: 'active',
    width: 100,
    accessor: (row) => (row.active ? 'Active' : 'Inactive')
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
