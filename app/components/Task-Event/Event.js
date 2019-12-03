import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import iconDate from '../../images/icons/icon-date.png';
import EventRateForm from '../../containers/CalendarEventsPage/components/EventRateForm';
import { singleEventRateStart } from '../../containers/CalendarEventsPage/components/EventRateForm/actions';

const showDrawer = (props) => (e) => {
  e.preventDefault();
  props.showEventRateDrawer();
};

const Event = (props) => (
  <div className="events-tasks-widget-item">
    {props.eventId ?
      (
        <div>
          <a className="open-form-mask" href="#" onClick={showDrawer(props)}>Open rating form</a>
          <EventRateForm eventId={props.eventId} />
        </div>
      ) : null
    }
    <div className="content">
      <div className="events-tasks-widget-item-header">
        {props.title || props.case ?
          (
            <div className="title m-b-xs">
              {props.case ?
                (
                  <div className="label-badge primary m-b-xs">{props.case}</div>
                ) : null
              }
              {props.title ?
                (
                  <div>{props.title}</div>
                ) : null
              }
            </div>
          ) : null
        }
        <div className="date">
          <img src={iconDate} alt="date" />
          <span>{props.date}</span>
        </div>
      </div>
      {props.repName ?
        (
          <div>
            <span className="text-bold m-r-xs f-s-13">Rep</span>
            <span className="text-muted">{props.repName}</span>
            <div className="text-muted">{props.repAddress}</div>
          </div>
        ) : null
      }
    </div>
  </div>
);

const mapDispatchToProps = (dispatch, props) => ({
  showEventRateDrawer: () => dispatch(singleEventRateStart(props.eventId))
});

const withConnect = connect(null, mapDispatchToProps);
export default compose(withConnect)(Event);
