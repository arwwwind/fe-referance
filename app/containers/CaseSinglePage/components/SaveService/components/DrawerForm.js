import React from 'react';
import Preloader from '../../../../../components/Preloader';
import Wizard from './Wizard';
import steps from './Wizard/steps';

const DrawerForm = ({ single, onSend, step }) => (
  single.get('loading') ? <Preloader /> : <Wizard initialValues={single.get('data')} onFinish={onSend} step={step} wizardSteps={steps} />
);

export default DrawerForm;
