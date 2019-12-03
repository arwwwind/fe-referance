import React from 'react';
import CaseDetails from './CaseDetails';
import CalendarEventsWidget from '../../CalendarEventsPage/components/CalendarEventsWidget';

const SidebarLeft = (props) => (
  <div className="case-left">
    <CaseDetails sidebarOptions={props.sidebarOptions} />
    <div className="events-tasks-widget m-t-xl">
      <CalendarEventsWidget title="Today" addButton smallButton hideSubtitle />
    </div>
  </div>
);

export default SidebarLeft;
