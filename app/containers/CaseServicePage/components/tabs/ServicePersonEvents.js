import React from 'react';
import { Input } from 'antd';
import Table from '../../../../components/Table/Table';
import PersonEventForm from './PersonEventForm';

const personEventsColumns = [
  {
    Header: 'Type',
    accessor: 'type'
  },
  {
    Header: 'Rep',
    accessor: 'rep',
  },
  {
    Header: 'Date/Time',
    accessor: 'dateTime'
  },
  {
    Header: 'Description',
    accessor: 'description'
  },
  {
    Header: 'Venue',
    accessor: 'venue'
  },
  {
    Header: 'Creator',
    accessor: 'creator'
  },
  {
    Header: 'Rating',
    accessor: 'rating'
  },
  {
    Header: 'Rating Reason',
    accessor: 'ratingReason'
  }
];
const personEventsDemo = [{
  type: 'Type 1',
  rep: 'Rep 1',
  dateTime: '13/12/2018 22:00',
  description: 'Description text etc ...',
  venue: 'Venue',
  creator: 'Creator',
  rating: 'rating',
  ratingReason: 'rating reason'
}];

const ServicePersonEvents = () => (
  <div className="p-md">
    <div className="flex space-between m-b-xxl">
      <div className="juvo-table-search">
        <Input.Search
          size="small"
          placeholder="Search"
          maxLength="150"
        />
      </div>
      <PersonEventForm />
    </div>
    <Table
      columns={personEventsColumns}
      data={personEventsDemo}
    />
  </div>
);

export default ServicePersonEvents;
