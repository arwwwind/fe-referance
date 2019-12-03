import React from 'react';
import { NavLink } from 'react-router-dom';
import EditButton from './components/EditButton';
import DeleteConfirm from './components/DeleteConfirm';
import { organizationTypeLabelByValue } from './config';
import { formatPhone, stringToText, formatMetricsValue } from '../../utils/common';

export default [
  {
    Header: 'Company Name',
    id: 'companyName',
    accessor: (row) => (<NavLink to={`/organization/${row.id}`}>{stringToText(row.companyName)}</NavLink>) // eslint-disable-line react/display-name
  },
  {
    Header: 'Type',
    id: 'type',
    accessor: (row) => (stringToText(organizationTypeLabelByValue(row.type)))
  },
  {
    Header: 'Address',
    id: 'address',
    accessor: (row) => (stringToText(row.address))
  },
  {
    Header: 'Primary Phone',
    id: 'primaryPhone',
    accessor: (row) => (stringToText(formatPhone(row.primaryPhoneNumberType, row.primaryPhoneNumber, row.primaryPhoneNumberExtension)))
  },
  {
    Header: 'Fax',
    id: 'fax',
    accessor: (row) => (stringToText(row.fax))
  },
  {
    Header: 'Account Verified',
    id: 'accountVerified',
    accessor: (row) => (stringToText(row.accountVerified === false ? 'No' : row.accountVerified ? 'Yes' : null))
  },
  {
    Header: 'Total Referrals',
    id: 'totalReferrals',
    accessor: (row) => (formatMetricsValue(row.totalReferrals, 0, '0'))
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
    accessor: (row) => ( // eslint-disable-line react/display-name
      <DeleteConfirm id={row.id} />
    )
  }
];
