export const parser = (errors, data) => Object.keys(errors).filter(key => key !== 'general').reduce((ret, key) => {
  ret[key] = {
    value: data[key],
    errors: [new Error(errors[key].join(', '))],
  };

  return ret;
}, {});

export const display = (form, errors, data) => form.setFields(parser(errors, data));

export const displayMultiple = (forms, errors, data) => {
  let step = null;

  Object.keys(forms).forEach((key) => {
    if (step === null) {
      Object.keys(errors).forEach(field => {
        if (step === null && data[key].hasOwnProperty(field)) {
          step = key;
        }
      });
    }
    forms[key].setFields(parser(errors, data))
  });

  return parseInt(step, 10);
};

export const is401 = (error) => error && error.response && error.response.status === 401;
