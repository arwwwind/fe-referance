import React from 'react';
import EditButton from './components/EditButton';
import DeleteConfirm from './components/DeleteConfirm';
import { addDollarSign } from '../../../../utils/common';

export default [
  {
    Header: 'Client Name',
    id: 'clientName',
    accessor: (row) => (row.claimentName && row.claimentName.companyName ? row.claimentName.companyName : '-')
  },
  {
    Header: 'Status',
    id: 'status',
    accessor: (row) => (row.requestedStatus === 'draft' ? 'Draft' : 'In progress')
  },
  {
    Header: 'DOS Range',
    id: 'dos',
    accessor: (row) => ('-')
  },
  {
    Header: 'Balance',
    id: 'balance',
    accessor: (row) => addDollarSign(row.balance)
  },
  {
    Header: 'Demand',
    id: 'demand',
    accessor: (row) => addDollarSign(row.demand)
  },
  {
    Header: 'Fee Schedule',
    id: 'schedule',
    accessor: (row) => ('-')
  },
  {
    Header: 'Authority',
    id: 'authority',
    accessor: (row) => (row.authority ? row.authority : '-')
  },
  {
    Header: 'Edit',
    id: 'edit',
    width: 60,
    className: 'center',
    resizable: false,
    sortable: false,
    accessor: (row) => (<EditButton id={row.id} />) // eslint-disable-line react/display-name
  },
  {
    Header: 'Delete',
    id: 'delete',
    width: 75,
    className: 'center',
    resizable: false,
    sortable: false,
    accessor: (row) => (<DeleteConfirm id={row.id} serviceId={row.serviceId} />) // eslint-disable-line react/display-name
  }
];
