import React from 'react';
import moment from 'moment';
import EditButton from './components/EditButton';
import DeleteConfirm from './components/DeleteConfirm';
import { addDollarSign } from '../../../../../utils/common';

export default [
  {
    Header: 'Company',
    id: 'company',
    accessor: (row) => (row.partnerName ? row.partnerName : '-')
  },
  {
    Header: 'Status',
    id: 'status',
    accessor: (row) => (row.status ? row.status : '-')
  },
  {
    Header: 'Initial Offer Date',
    id: 'offerDate',
    accessor: (row) => (row.offerDate ? moment(row.offerDate).format('L') : '-')
  },
  {
    Header: 'Contract Sign Date',
    id: 'signDate',
    accessor: (row) => (row.signDate ? moment(row.signDate).format('L') : '-')
  },
  {
    Header: 'Future Medical Amount',
    id: 'medicalAmount',
    accessor: (row) => addDollarSign(row.medicalAmount)
  },
  {
    Header: 'Decline Reason',
    id: 'declineReason',
    accessor: (row) => (row.declineReason ? row.declineReason : '-')
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
