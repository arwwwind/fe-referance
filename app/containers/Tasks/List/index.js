import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment';
import Item from '../Item';
import Preloader from '../../../components/Preloader';
import { formatPhone } from '../../../utils/common';

const info = ({ firstName, lastName, primaryPhoneNumber, primaryPhoneNumberExtension, primaryPhoneNumberType }) => {
  const phone = formatPhone(primaryPhoneNumberType, primaryPhoneNumber, primaryPhoneNumberExtension);

  return (
    <div>
      <span className="text-bold m-r-xs f-s-13">For</span>
      <span className="text-muted">{`${firstName} ${lastName} ${phone ? `- ${phone}` : ''}`}</span>
    </div>
  );
};

const account = (organisation) => {
  if (organisation) {
    return (
      <div>
        <span className="text-bold m-r-xs">Account:</span>
        <NavLink to={`/organization/${organisation.id}`}>{organisation.companyName}</NavLink>
      </div>
    );
  }

  return null;
};

const List = ({ data, loading, className }) => {
  const showPreloader = loading && !data.length;
  const showNoData = !loading && !data.length;
  const showData = !showPreloader && !showNoData;

  return (
    <div className={classNames('events-tasks-widget-items', className)}>
      {
        showPreloader ? <Preloader /> : null
      }
      {
        showData ? data.map((item) => (
          <Item
            taskType={item.taskType}
            key={item.id}
            title={item.name}
            date={moment(item.createdAt).format('MMM D')}
            info={info(item.worker)}
            account={account(item.worker.organisation)}
            id={item.id}
            endedOn={item.endedOn}
          />
        )) : null
      }
      {
        showNoData ? <p>No data found</p> : null
      }
    </div>
  );
};

export default List;
