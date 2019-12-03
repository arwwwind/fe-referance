export const noteTypes = [
  {
    name: 'Option 1',
    value: 'option1'
  }, {
    name: 'Option 2',
    value: 'option2'
  }, {
    name: 'Option 3',
    value: 'option3'
  }
];

export const noteTypeLabelByValue = (value) => {
  const result = noteTypes.filter((item) => item.value === value)[0];
  return result ? result.name : null;
};
