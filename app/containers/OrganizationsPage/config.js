export const organizationTypes = [
  {
    value: 'lien-claiment',
    label: 'Lien Claiment'
  },
  {
    value: 'account',
    label: 'Account'
  },
  {
    value: 'claim-office',
    label: 'Claim Office'
  }
];

export const organizationTypeLabelByValue = (value) => {
  const result = organizationTypes.filter((item) => item.value === value)[0];
  return result ? result.label : null;
};
