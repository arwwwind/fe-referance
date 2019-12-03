import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoImage from '../../images/logo.svg';

const Logo = () => (
  <div className="juvo-logo">
    <NavLink to="/">
      <img src={LogoImage} alt="Juvo" />
    </NavLink>
  </div>
);

export default Logo;
