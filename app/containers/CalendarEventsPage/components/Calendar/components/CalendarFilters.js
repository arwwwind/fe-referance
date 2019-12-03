import React from 'react';
import { Input, Select } from 'antd';
import ResourceSelect from '../../../../../components/Core/ResourceSelect';
import * as types from '../../../../CaseSinglePage/components/SaveService/types';

class CalendarFilters extends React.Component {
  state = {
    searchValue: null,
    serviceFilterValue: null,
    repFilterValue: null,
    venueFilterValue: null
  };

  onSearch = (e) => {
    this.setState({ searchValue: e.target.value }, () => {
      this.props.onSearchCalendar(this.state);
    });
  };
  onServiceFilterChange = (value) => {
    this.setState({ serviceFilterValue: value }, () => {
      this.props.onSearchCalendar(this.state);
    });
  };
  onRepFilterChange = (value) => {
    this.setState({ repFilterValue: value }, () => {
      this.props.onSearchCalendar(this.state);
    });
  };
  onVenueFilterChange = (value) => {
    this.setState({ venueFilterValue: value }, () => {
      this.props.onSearchCalendar(this.state);
    });
  };

  render() {
    return (
      <div className="calendar-header m-t-extra-xs m-b-extra-xs flex align-items-center">
        <div className="text-title nowrap">Calendar Events</div>
        <div className="juvo-table-search">
          <Input.Search
            maxLength="150"
            size="small"
            placeholder="Search"
            onChange={this.onSearch}
          />
        </div>
        <div className="flex calendar-filters align-items-right">
          <Select
            placeholder="Service Type Filter"
            size="large"
            allowClear
            onChange={this.onServiceFilterChange}
          >
            {
              types.list.map((el) => <Select.Option key={el.value}>{el.label}</Select.Option>)
            }
          </Select>
          <Select
            placeholder="Rep Filter"
            size="large"
            allowClear
            onChange={this.onRepFilterChange}
          >
            <Select.Option key={true}>Yes</Select.Option>
            <Select.Option key={false}>No</Select.Option>
          </Select>
          <ResourceSelect name="venues" placeholder="Venue Filter" size="large" style={{}} showArrow allowClear onChange={this.onVenueFilterChange} />
        </div>
      </div>
    );
  }
}

export default CalendarFilters;
