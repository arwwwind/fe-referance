import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Menu, Dropdown, Icon } from 'antd';
import { quickViewChange } from '../actions';

export const DEFAULT_VIEW = 'default';
export const VIEW_ADJUSTERS = 'view_adjusters';
export const VIEW_MANAGERS = 'view_managers';
export const VIEW_INJURED_WORKERS = 'view_injured_workers';
export const VIEW_JUVO_REPS = 'view_juvo_reps';
export const VIEW_EMPLOYEES = 'view_employees';
export const VIEW_OTHERS = 'view_others';

class QuickView extends React.Component {
  state = {
    option: DEFAULT_VIEW
  };

  onOptionChange = (option) => (e) => {
    e.preventDefault();
    this.setState({ option });
    this.props.onQuickViewChange(option);
  };

  labels = {
    [DEFAULT_VIEW]: 'Quick View',
    [VIEW_ADJUSTERS]: 'Show adjusters',
    [VIEW_MANAGERS]: 'Show managers',
    [VIEW_INJURED_WORKERS]: 'Show injured workers',
    [VIEW_JUVO_REPS]: 'Show juvo reps',
    [VIEW_EMPLOYEES]: 'Show employees',
    [VIEW_OTHERS]: 'Show others',
  };

  renderMenu = () => (
    <Menu>
      <Menu.Item key="0">
        <a href="#" onClick={this.onOptionChange(DEFAULT_VIEW)}>Show all contacts</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#" onClick={this.onOptionChange(VIEW_ADJUSTERS)}>{this.labels[VIEW_ADJUSTERS]}</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="#" onClick={this.onOptionChange(VIEW_MANAGERS)}>{this.labels[VIEW_MANAGERS]}</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="#" onClick={this.onOptionChange(VIEW_INJURED_WORKERS)}>{this.labels[VIEW_INJURED_WORKERS]}</a>
      </Menu.Item>
      <Menu.Item key="4">
        <a href="#" onClick={this.onOptionChange(VIEW_JUVO_REPS)}>{this.labels[VIEW_JUVO_REPS]}</a>
      </Menu.Item>
      <Menu.Item key="5">
        <a href="#" onClick={this.onOptionChange(VIEW_EMPLOYEES)}>{this.labels[VIEW_EMPLOYEES]}</a>
      </Menu.Item>
      <Menu.Item key="6">
        <a href="#" onClick={this.onOptionChange(VIEW_OTHERS)}>{this.labels[VIEW_OTHERS]}</a>
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Dropdown overlay={this.renderMenu()} trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
          {this.labels[this.state.option]} <Icon type="down" />
        </a>
      </Dropdown>
    );
  }
}

const mapDispatchToProps = (dispatch, { sortId, sortOrder }) => ({
  onQuickViewChange: (option) => dispatch(quickViewChange(option, sortId, sortOrder))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(QuickView);
