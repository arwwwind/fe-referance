import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ServiceWithLink from './ServiceWithLink';
import Carousel from './Carousel';
import Preloader from '../../../components/Preloader';


const ServicesList = (props) => {
  const services = props.services.toJS();
  if (services && services.length) {
    return (
      <Carousel>
        {services.map((service) =>
          (<ServiceWithLink key={service.id} serviceId={service.id} {...service} />)
        )}
      </Carousel>
    );
  } else if (props.loading && !services.length) {
    return (<Preloader />);
  }
  return null;
};


const mapStateToProps = (state) => ({
  services: state.get('caseDetails').get('data').get('services'),
  loading: state.get('caseDetails').get('fetch').get('loading')
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ServicesList);
