import React from 'react';
import { NavLink } from 'react-router-dom';
import EditButton from './components/EditButton';
import DeleteConfirm from './components/DeleteConfirm';


export default [
  {
    Header: 'Abbrv.',
    id: 'abbreviation',
    accessor: (row) => (<NavLink to={`/venue/${row.id}`}>{row.abbreviation}</NavLink>) // eslint-disable-line react/display-name
  },
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Address',
    id: 'address',
    accessor: (row) => (row.address ? row.address : '-')
  },
  {
    Header: 'Approval Rating',
    id: 'approvalRating',
    accessor: (row) => (row.approvalRating ? row.approvalRating : '-')
  },
  {
    Header: 'Can We Select Judge',
    id: 'canWeSelectJudge',
    accessor: (row) => (typeof row.canWeSelectJudge === 'boolean' ? (row.canWeSelectJudge ? 'Yes' : 'No') : '-')
  },
  {
    Header: 'Same Day ADJ',
    id: 'sameDayAdj',
    accessor: (row) => (typeof row.sameDayAdj === 'boolean' ? (row.sameDayAdj ? 'Yes' : 'No') : '-')
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
