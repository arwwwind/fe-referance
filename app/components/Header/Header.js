import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import Account from './Account';

class Header extends React.Component {
  render() {
    return (
      <div className="juvo-header">
        <div className="inner-width">
          <Logo />
          <Menu />
          {this.props.user ? (
            <Account onLogout={this.props.onLogout} user={this.props.user} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Header;
