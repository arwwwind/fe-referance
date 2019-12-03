import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

export default [
  {
    Header: 'Name',
    id: 'name',
    accessor: (row) => (row.firstName || row.lastName ? `${row.firstName} ${row.lastName}` : '-') // eslint-disable-line react/display-name
  },
  {
    Header: 'Venue',
    id: 'venue',
    accessor: (row) => (row.venue.name ? row.venue.name : '-')
  },
  {
    Header: 'Approval Rating',
    id: 'approvalRating',
    accessor: (row) => (row.referred ? row.referred : '-')
  },
  {
    Header: 'Number of Cases',
    id: 'numberofCases',
    accessor: (row) => (row.account ? row.account : '-')
  },
  {
    Header: 'Active',
    id: 'active',
    accessor: (row) => (typeof row.active === 'boolean' ? (row.active ? 'Yes' : 'No') : '-')
  }
];
