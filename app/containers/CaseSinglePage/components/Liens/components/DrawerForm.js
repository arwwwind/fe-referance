import React from 'react';
import Preloader from '../../../../../components/Preloader';
import Wizard from '../../SaveService/components/Wizard';
import steps from './steps';

const DrawerForm = ({ single, onSend, step }) => (
  single.get('loading') ? <Preloader /> : <Wizard initialValues={single.get('data')} onFinish={onSend} step={step} wizardSteps={steps} />
);

export default DrawerForm;
