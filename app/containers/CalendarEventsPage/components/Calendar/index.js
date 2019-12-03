import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  searchCalendarStart,
  fetchCalendarStart
} from '../Calendar/actions';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import reducer from '../Calendar/reducer';
import { saga } from '../Calendar/saga';
import CalendarFilters from './components/CalendarFilters';
import CalendarContent from './components/CalendarContent';
import Preloader from '../../../../components/Preloader/Preloader';

class Calendar extends React.Component {
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
    return this.props.calendar.get('data').toJS();
  };

  /**
   * Show loading table icon
   * @function loadingTable
   */
  loadingTable = () => {
    const calendar = this.props.calendar.toJS();
    return !calendar.data.length && (calendar.search.loading || calendar.fetch.loading);
  };

  render() {
    return this.loadingTable() ? (<Preloader />) :
      (
        <div>
          <CalendarFilters onSearchCalendar={this.props.onSearch} />
          <CalendarContent data={this.getData()} />
        </div>
      );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSearch: (data) => dispatch(searchCalendarStart(data)),
  fetchData: () => dispatch(fetchCalendarStart()),
});

const mapStateToProps = (state) => ({
  calendar: state.get('calendar')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'calendar', reducer });
const withSaga = injectSaga({ key: 'calendar', saga });

export default compose(withReducer, withSaga, withConnect)(Calendar);
export { mapDispatchToProps };
