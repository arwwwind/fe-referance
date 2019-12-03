import moment from 'moment';

export default [
  {
    Header: 'Who Sent',
    id: 'whoSent',
    accessor: (row) => (row.profile ? `${row.profile.firstName} ${row.profile.lastName}` : '')
  },
  {
    Header: 'Day Sent',
    id: 'daySent',
    accessor: (row) => (moment(row.createdAt).format('L'))
  },
  {
    Header: 'Update Due',
    id: 'updateDue',
    accessor: (row) => (moment(row.updateDue).format('L'))
  },
  {
    Header: 'Days Overdue',
    id: 'daysOverdue',
    accessor: (row) => {
      const days = moment().startOf('day').diff(moment(row.updateDue).startOf('day'), 'days');

      if (days < 0) {
        return '-';
      }

      return days;
    }
  },
  {
    Header: 'Open Update',
    id: 'openUpdate',
    accessor: (row) => row.openedTime ? moment(row.openedTime).format('L') : '-'
  },
  {
    Header: 'Opened Time',
    id: 'openedTime',
    accessor: (row) => row.openedTime ? moment(row.openedTime).format('LTS') : '-'
  }
];
