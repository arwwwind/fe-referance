import React from 'react';
import { Button } from 'antd';
import Form from '../../../../../../components/Core/Form';
import Preloader from '../../../../../../components/Preloader';
import Medical from './Medical';
import Settlement from './Settlement';
import Indemnity from './Indemnity';
import WCABInformation from './WCABInformation';

const selectedForm = (formName, getFieldDecorator, initialValues) => {
  switch (formName) {
    case 'Medical': return (<Medical getFieldDecorator={getFieldDecorator} initialValues={initialValues} />);
    case 'Settlement': return (<Settlement getFieldDecorator={getFieldDecorator} initialValues={initialValues} />);
    case 'Indemnity': return (<Indemnity getFieldDecorator={getFieldDecorator} initialValues={initialValues} />);
    case 'WCAB Information': return (<WCABInformation getFieldDecorator={getFieldDecorator} initialValues={initialValues} />);
    default: return null;
  }
};

class ServiceViewForm extends React.Component {
  onSubmit = (values) => {
    this.props.onSend(values, this.props.form);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { single } = this.props;

    if (single.loading) {
      return <Preloader />;
    }

    const initialValues = single.data;

    return (
      <Form form={this.props.form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
        {selectedForm(this.props.name, getFieldDecorator, initialValues)}
        <div className="drawer-footer">
          <Button className="btn-center" type="primary" size="large" htmlType="submit">Save</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(ServiceViewForm);
