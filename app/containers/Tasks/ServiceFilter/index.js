import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { changeFilterValue } from './actions';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../reducer';

const types = [
  {
    value: 'lienService',
    name: 'Lien Service'
  },
  {
    value: 'iwo',
    name: 'IWO'
  },
  {
    value: 'walkthrough',
    name: 'Walk Through'
  },
  {
    value: 'eddLien',
    name: 'Edd Lien'
  },
  {
    value: 'iwm',
    name: 'IWM'
  },
  {
    value: 'documentPreparation',
    name: 'Document Preparation'
  },
  {
    value: 'misc',
    name: 'Misc'
  },
];

const ServiceFilter = (props) => (
  <div className="service-name-filter m-b-xl">
    <div className="service-name">Service Name</div>
    <Select defaultValue="all" placeholder="Select service" onChange={props.changeFilterValue} value={props.serviceType}>
      <Select.Option value="all">All services</Select.Option>
      {types.map((type) => (
        <Select.Option key={type.value} value={type.value}>{type.name}</Select.Option>
      ))}
    </Select>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  changeFilterValue: (to) => dispatch(changeFilterValue(to))
});

const mapStateToProps = (state) => ({
  serviceType: state.get('tasks').get('fetch').get('serviceType')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'tasks', reducer });

export default compose(withReducer, withConnect)(ServiceFilter);
export { mapDispatchToProps };
