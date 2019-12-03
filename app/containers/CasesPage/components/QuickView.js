import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Menu, Dropdown, Icon } from 'antd';
import { quickViewChange } from '../actions';

export const DEFAULT_VIEW = 'default';
export const ORDER_REFERRAL_DATE = 'order_referral_date';
export const CASES_WITH_EDD_LIEN = 'cases_with_edd_lien';
export const CASES_WITH_LIEN = 'cases_with_lien';

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
    [ORDER_REFERRAL_DATE]: 'Order by referral date',
    [CASES_WITH_EDD_LIEN]: 'Show cases that have Edd Lien',
    [CASES_WITH_LIEN]: 'Show cases that have Lien',
  };

  renderMenu = () => (
    <Menu>
      <Menu.Item key="0">
        <a href="#" onClick={this.onOptionChange(DEFAULT_VIEW)}>Show all cases</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#" onClick={this.onOptionChange(ORDER_REFERRAL_DATE)}>Order by referral date</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="#" onClick={this.onOptionChange(CASES_WITH_EDD_LIEN)}>Show cases that have Edd Lien</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="#" onClick={this.onOptionChange(CASES_WITH_LIEN)}>Show cases that have Lien</a>
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

const mapDispatchToProps = (dispatch) => ({
  onQuickViewChange: (option) => dispatch(quickViewChange(option))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(QuickView);
