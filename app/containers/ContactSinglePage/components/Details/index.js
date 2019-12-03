import React from 'react';
import BasicLayout from './components/BasicLayout';
import IWLayout from './components/IWLayout';
import AdjusterLayout from './components/AdjusterLayout';

const layoutByType = ({ data }) => {
  switch (data.contactType) {
    case 'adjuster': return (<AdjusterLayout data={data} />);
    case 'manager': return (<AdjusterLayout data={data} />);
    case 'injured-worker': return (<IWLayout data={data} />);
    default: return (<BasicLayout data={data} />);
  }
};

const ContactDetails = (props) => (
  layoutByType(props)
);

export default ContactDetails;
