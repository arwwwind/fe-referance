import React from 'react';
import { NavLink } from 'react-router-dom';
import EditButton from './components/EditButton';
import { stringToText, formatDate, getName } from '../../utils/common';
import { getServicesTypes, generateCaseName } from './methods';

export default [
  {
    Header: 'Case Name',
    id: 'name',
    accessor: (row) => (row.name ? (<NavLink to={`/case/${row.id}`}>{generateCaseName(row.injuredWorker, row.claims, row.referralId)}</NavLink>) : '-')
  },
  {
    Header: 'Service Type',
    id: 'serviceType',
    accessor: (row) => getServicesTypes(row.services)
  },
  {
    Header: 'Referred By/Managing Adjuster',
    id: 'referred',
    accessor: (row) => (row.referral ? stringToText(getName(row.referral)) : '-')
  },
  {
    Header: 'Account',
    id: 'account',
    accessor: (row) => (row.account ? stringToText(row.account.companyName) : '-')
  },
  {
    Header: 'Case Owner',
    id: 'caseOwner',
    accessor: (row) => (row.caseOwner ? stringToText(getName(row.caseOwner)) : '-')
  },
  {
    Header: 'Referral Date',
    id: 'referralDate',
    accessor: (row) => (stringToText(formatDate(row.referralDate)))
  },
  {
    Header: 'Referral ID',
    id: 'referralId',
    accessor: (row) => (row.referralId ? row.referralId : '-')
  },
  {
    Header: 'Edit',
    id: 'edit',
    width: 60,
    className: 'center',
    resizable: false,
    sortable: false,
    accessor: (row) => (<EditButton id={row.id} />) // eslint-disable-line react/display-name
  }
];

export const casesColumnsForEntities = [
  {
    Header: 'Case Name',
    id: 'name',
    accessor: (row) => (row.name ? (<NavLink to={`/case/${row.id}`}>{generateCaseName(row.injuredWorker, row.claims, row.referralId)}</NavLink>) : '-')
  },
  {
    Header: 'Service Type',
    id: 'serviceType',
    accessor: (row) => getServicesTypes(row.services)
  },
  {
    Header: 'Referred By/Managing Adjuster',
    id: 'referred',
    accessor: (row) => (row.referral ? stringToText(getName(row.referral)) : '-')
  },
  {
    Header: 'Account',
    id: 'account',
    accessor: (row) => (row.account ? stringToText(row.account.companyName) : '-')
  },
  {
    Header: 'Case Owner',
    id: 'caseOwner',
    accessor: (row) => (row.caseOwner ? stringToText(getName(row.caseOwner)) : '-')
  },
  {
    Header: 'Referral Date',
    id: 'referralDate',
    accessor: (row) => (stringToText(formatDate(row.referralDate)))
  }
];
