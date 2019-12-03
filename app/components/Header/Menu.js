import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';
import classNames from 'classnames';

class Menu extends React.Component {
  state = {
    active: false
  };

  toggleMenu = () => {
    this.setState({
      active: !this.state.active
    });
  };

  render() {
    const menuClasses = classNames({
      active: this.state.active,
      'juvo-menu': true
    });

    return (
      <div className={menuClasses}>
        <button className="juvo-menu-trigger" onClick={this.toggleMenu}>
          <Icon type="bars" />
        </button>
        <div className="juvo-menu-group">
          <div className="juvo-primary-menu">
            <NavLink exact to="/" activeClassName="active">
              <span>Dashboard</span>
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/calendar-events" activeClassName="active">
              <span>Calendar Events</span>
              <span>Calendar Events</span>
            </NavLink>
            <NavLink to="/cases" activeClassName="active">
              <span>Cases</span>
              <span>Cases</span>
            </NavLink>
            <NavLink to="/organizations" activeClassName="active">
              <span>Organizations</span>
              <span>Organizations</span>
            </NavLink>
            <NavLink to="/venues" activeClassName="active">
              <span>Venues</span>
              <span>Venues</span>
            </NavLink>
            <NavLink to="/contacts" activeClassName="active">
              <span>Contacts</span>
              <span>Contacts</span>
            </NavLink>
          </div>
          {this.props.isAdmin ? (
            <div className="juvo-secondary-menu">
              <NavLink exact to="/tracks" activeClassName="active">
                <span>Tracks</span>
                <span>Tracks</span>
              </NavLink>
              <NavLink to="/users" activeClassName="active">
                <span>Users</span>
                <span>Users</span>
              </NavLink>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const app = state.get('app');
  return {
    isAdmin: app.get('user') ? app.get('user').get('userType') === 'admin' : false
  };
};

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(Menu);
