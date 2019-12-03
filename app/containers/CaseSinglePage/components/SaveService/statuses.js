export const DRAFT = 'draft';
export const REVIEW = 'in_review';
export const PROGRESS = 'in_progress';
export const INVOICING = 'invoicing';
export const HOLD = 'hold';
export const SUSPENDED = 'suspended';

export const list = [
  {
    value: DRAFT,
    label: 'Draft'
  },
  {
    value: REVIEW,
    label: 'In review'
  },
  {
    value: PROGRESS,
    label: 'In Progress'
  },
  {
    value: INVOICING,
    label: 'Invoicing'
  },
  {
    value: HOLD,
    label: 'On hold'
  },
  {
    value: SUSPENDED,
    label: 'Suspended'
  }
];

export const getLabel = (value) => {
  const filtered = list.filter((item) => item.value === value);

  return filtered.length ? filtered[0].label : 'Unknown';
};
