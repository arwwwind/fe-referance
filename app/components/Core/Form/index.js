import React from 'react';
import { Form as AntForm } from 'antd';

const onSubmitHandler = (form, onSubmit, shouldValidate) => (e) => {
  e.preventDefault();

  if (shouldValidate) {
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values, e);
      }
    });
  } else {
    onSubmit(form.getFieldsValue(), e);
  }
};

const Form = ({ shouldValidate = true, form, onSubmit, ...props }) => (
  <AntForm {...props} onSubmit={onSubmitHandler(form, onSubmit, shouldValidate)}>{props.children}</AntForm>
);

Form.create = AntForm.create;
Form.Item = AntForm.Item;

export default Form;
