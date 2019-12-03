import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const CalendarContent = (props) => (
  <div className="juvo-calendar-container">
    <BigCalendar
      events={props.data.map((el) => ({
        id: el.id,
        title: el.description || '-',
        start: new Date(el.dateOfHEaring),
        end: new Date(new Date(el.dateOfHEaring).setHours(new Date(el.dateOfHEaring).getHours() + 1))
      }))}
      views={['month', 'week', 'day']}
    />
  </div>
);

export default CalendarContent;
