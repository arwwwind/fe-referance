import React from 'react';
import isArray from 'lodash/isArray';
import { Select, notification } from 'antd';
import Preloader from '../../Preloader';
import axios from '../../../axios';

class ResourceSelect extends React.Component {
  accesors = () => {
    let { textAccesor, valueAccesor } = this.props;

    if (!textAccesor) {
      textAccesor = (option) => (option.name);
    }

    if (!valueAccesor) {
      valueAccesor = (option) => (option.id);
    }

    return { textAccesor, valueAccesor };
  };

  firstData = () => {
    const { textAccesor, valueAccesor } = this.accesors();

    if (!this.props.linked) {
      return [];
    }

    if (isArray(this.props.linked)) {
      return this.props.linked.map((option) => ({
        text: textAccesor(option),
        value: valueAccesor(option)
      }));
    }

    return [{
      text: textAccesor(this.props.linked),
      value: valueAccesor(this.props.linked)
    }];
  };

  state = {
    loading: false,
    data: this.firstData()
  };

  fetch = (value) => {
    const { textAccesor, valueAccesor } = this.accesors();

    this.setState({
      loading: true
    });

    axios.get(`/search/${this.props.name}`, {
      params: {
        search: value
      }
    }).then((response) => {
      const existing = [];

      this.setState({
        data: response.data.data.rows.map((option) => ({
          text: textAccesor(option),
          value: valueAccesor(option)
        })).filter((item) => {
          if (existing.indexOf(item.value) === -1) {
            existing.push(item.value);

            return true;
          }

          return false;
        }),
        loading: false
      });
    }).catch(() => {
      notification.error({
        message: 'Error',
        description: 'An internal error has occurred',
        placement: 'topLeft'
      });
    });
  };

  render() {
    const { data, loading } = this.state;
    const { name, linked, ...props } = this.props;

    return (
      <Select
        onSearch={this.fetch}
        onFocus={this.fetch}
        showSearch
        showArrow={false}
        style={{ width: '100%' }}
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        notFoundContent={loading ? <Preloader style={{ width: '100%', textAlign: 'center' }} width={20} /> : <p className="m-0">No data found</p>}
        {...props}
      >
        {data.map((d) => <Select.Option key={d.value}>{d.text}</Select.Option>)}
      </Select>
    );
  }
}

export default ResourceSelect;
