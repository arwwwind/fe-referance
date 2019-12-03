export const contactTypes = [
  {
    value: 'adjuster',
    label: 'Adjuster'
  },
  {
    value: 'manager',
    label: 'Manager'
  },
  {
    value: 'injured-worker',
    label: 'Injured Worker'
  },
  {
    value: 'juvo-rep',
    label: 'Juvo Rep'
  },
  {
    value: 'employee',
    label: 'Employee'
  },
  {
    value: 'other',
    label: 'Other'
  }
];

export const eligibleAssignments = ['Lien Conferences', 'Walkthrough'];

export const contactTypeLabelByValue = (value) => {
  const result = contactTypes.filter((item) => item.value === value)[0];
  return result ? result.label : null;
};
