import moment from 'moment';

export const getLastUpdate = (data) => {
  if (data) {
    return moment(data.createdAt).format('MMMM D');
  }

  return null;
};

export const getNextUpdate = (data) => {
  if (data) {
    return moment(data.updateDue).format('MMMM D');
  }

  return null;
};

export const getDaysOverdue = (data) => {
  if (data) {
    const days = moment().startOf('day').diff(moment(data.updateDue).startOf('day'), 'days');

    if (days < 0) {
      return null;
    }

    return days;
  }

  return null;
};

export const getRedDot = (data) => {
  if (data) {
    return !moment(data.createdAt).isSame(new Date(), 'week');
  }

  return true;
};
