import React from 'react';
import moment from 'moment';
import store from 'store';
import EditButton from './components/EditButton';
import SwitchUserStatus from './components/SwitchUserStatus';
import config from '../../config';

export const getName = (row) => {
  const { profile } = row;

  if (!profile) {
    return '-';
  }

  let { firstName, lastName } = profile;

  if (!firstName) {
    firstName = '';
  }

  if (!lastName) {
    lastName = '';
  }

  return (firstName || lastName) ? `${firstName} ${lastName}` : '-';
};

const humanize = (date) => moment.duration(moment.utc(date).local().diff(moment())).humanize(true);

export default [
  {
    Header: 'Full Name',
    id: 'fullName',
    minWidth: 200,
    accessor: (row) => getName(row)
  },
  {
    Header: 'Email',
    accessor: 'loginEmail',
    minWidth: 200
  },
  {
    Header: 'Last Login',
    id: 'lastLogin',
    maxWidth: 120,
    accessor: (row) => (row.lastLogin ? humanize(row.lastLogin) : '-')
  },
  {
    Header: 'User Type',
    accessor: 'userType',
    maxWidth: 120,
    Cell: ({ row }) => (<span className="t-capitalize">{row.userType}</span>) // eslint-disable-line react/display-name
  },
  {
    Header: 'Active',
    id: 'active',
    maxWidth: 120,
    accessor: (row) => (row.active ? 'Active' : 'Inactive')
  },
  {
    Header: 'Last Password Reset',
    id: 'lastPasswordReset',
    width: 170,
    accessor: (row) => (row.lastPasswordReset ? humanize(row.lastPasswordReset) : '-')
  },
  {
    Header: 'Status',
    id: 'switchUserStatus',
    width: 72,
    className: 'center',
    resizable: false,
    accessor: (row) => { // eslint-disable-line react/display-name
      const currentId = store.get(config.storeKey.user) ? store.get(config.storeKey.user).id : null;

      return (
        <SwitchUserStatus id={row.id} disabled={currentId === row.id} status={row.active} />
      );
    }
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
  }
];
