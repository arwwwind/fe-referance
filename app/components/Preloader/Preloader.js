import React from 'react';
import PreloaderSvg from '../../images/preloader.svg';

const Preloader = (props) => (
  <div className="preloader" style={props.style}>
    <img src={PreloaderSvg} alt="preloader" style={{width: props.width || 30}} />
  </div>
);

export default Preloader;
