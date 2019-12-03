import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Input } from 'antd';
import debounce from 'lodash/debounce';
import moment from 'moment';
import {
  searchCalendarWidgetStart,
  fetchCalendarWidgetStart
} from './actions';

import reducer from './reducer';
import { saga } from './saga';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import Event from '../../../../components/Task-Event/Event';
import { AddEventButton } from '../EventForm';
import Drawer from '../../../CaseServicePage/components/tabs/ServicePersonEvents/components/Drawer';

const onDebouncedChange = debounce((props, value) => {
  props.onSearch(value);
}, 200);

const onSearch = (props) => (e) => onDebouncedChange(props, e.target.value);

class CalendarWidgetEventsWidget extends React.Component {
  /**
   * Load calendar data
   * @function componentDidMount
   */
  componentDidMount() {
    this.props.fetchData();
  }

  /**
   * Get calendar data from search or fetch results
   * @function getData
   */
  getData = () => {
    return this.props.calendarWidget.get('data').toJS();
  };

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => {
    const calendarWidget = this.props.calendarWidget.toJS();

    return calendarWidget.search.loading || calendarWidget.fetch.loading;
  };

  render() {
    const data = this.getData();
    return (
      <div>
        {this.props.withSearch ? (
          <div className="juvo-table-search m-b-extra-md">
            <Input.Search
              maxLength="150"
              size="small"
              placeholder="Search"
              onChange={onSearch(this.props)}
            />
          </div>
        ) : null}
        <div>
          <div className="events-tasks-widget-header">
            {this.props.title ? (
              <div>{this.props.title}</div>
            ) : null}
            {this.props.addButton ? (
              <AddEventButton className="m-l-a" smallButton={this.props.smallButton} />
            ) : null}
            <Drawer onCalendar />
          </div>
          {!this.props.hideSubtitle ? (
            <div className="widget-subtitle m-b-md">Today</div>
          ) : null}
          <div className="events-tasks-widget-items">
            { data.length ?
              data.map((el) => (
                <Event
                  key={el.id}
                  eventId={el.id}
                  title={el.description}
                  date={moment(el.dateOfHEaring).format('MMM D')}
                  repName={el.rep ? `${el.rep.firstName} ${el.rep.lastName}` : '-'}
                  repAddress={el.rep ? el.rep.address : ''}
                  case={el.caseId ? `CASE #${el.caseId}` : '-'}
                />
              )) : <p>No data found</p>
            }
          </div>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSearch: (data) => dispatch(searchCalendarWidgetStart(data)),
  fetchData: () => dispatch(fetchCalendarWidgetStart()),
});

const mapStateToProps = (state) => ({
  calendarWidget: state.get('calendarWidget')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'calendarWidget', reducer });
const withSaga = injectSaga({ key: 'calendarWidget', saga });

export default compose(withReducer, withSaga, withConnect)(CalendarWidgetEventsWidget);
export { mapDispatchToProps };
