import React from 'react';
import Header from '../../components/Header';

const Page = (props) => (
  <div className="logged-container">
    <Header />
    <div className="inner-width juvo-main">
      {props.children}
    </div>
  </div>
);

export default Page;
