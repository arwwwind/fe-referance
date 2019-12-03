import React from 'react';
import store from 'store';
import { NavLink } from 'react-router-dom';
import EditButton from './components/EditButton';
import DeleteConfirm from './components/DeleteConfirm';
import TableSortHeader from '../../components/Table/TableSortHeader';
import config from '../../config';
import { contactTypeLabelByValue } from './config';
import { formatPhone, stringToText } from '../../utils/common';

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
    Header: <TableSortHeader name="Name" />,
    id: 'name',
    minWidth: 150,
    accessor: (row) => (<NavLink to={`/contact/${row.id}`}>{getName(row)}</NavLink>) // eslint-disable-line react/display-name
  },
  {
    Header: <TableSortHeader name="Title" />,
    id: 'title',
    width: 100,
    accessor: (row) => (stringToText(row.title))
  },
  {
    Header: <TableSortHeader name="Type" />,
    id: 'contactType',
    width: 130,
    accessor: (row) => (stringToText(contactTypeLabelByValue(row.contactType)))
  },
  {
    Header: <TableSortHeader name="Primary" />,
    id: 'primary',
    accessor: (row) => (stringToText(formatPhone(row.primaryPhoneNumberType, row.primaryPhoneNumber, row.primaryPhoneNumberExtension))),
    width: 115
  },
  {
    Header: <TableSortHeader name="Secondary" />,
    id: 'secondary',
    accessor: (row) => (stringToText(formatPhone(row.secondaryPhoneNumberType, row.secondaryPhoneNumber, row.secondaryPhoneNumberExtension))),
    width: 115
  },
  {
    Header: <TableSortHeader name="Email" />,
    id: 'email',
    width: 150,
    accessor: (row) => (stringToText(row.email))
  },
  {
    Header: <TableSortHeader name="Organization" />,
    id: 'organization',
    accessor: (row) => (row.organisation ? stringToText(row.organisation.companyName) : '-'),
    width: 135
  },
  {
    Header: <TableSortHeader name="Organization Territory" />,
    id: 'organizationTerritory',
    accessor: (row) => (row.organisation ? stringToText(row.organisation.territory) : '-'),
    width: 195
  },
  {
    Header: 'Edit',
    id: 'edit',
    width: 60,
    className: 'center',
    resizable: false,
    sortable: false,
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
    sortable: false,
    accessor: (row) => { // eslint-disable-line react/display-name
      const user = store.get(config.storeKey.user);
      const currentId = (user && user.profile) ? user.profile.id : null;

      return (
        <DeleteConfirm id={row.id} disabled={(currentId === row.id) || (user.userType === 'user' && row.user)} />
      );
    }
  }
];
