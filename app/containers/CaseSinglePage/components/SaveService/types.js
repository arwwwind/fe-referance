export const WALKTHROUGH = 'walkthrough';
export const DOCUMENT_PREPARATION = 'documentPreparation';
export const IWIM = 'injuredWorkerInformation';
export const LIEN = 'lienService';
export const EDD_LIEN = 'eddLien';
export const IWO = 'injuredWorkerOutreach';
export const MISC = 'misc';

export const list = [
  {
    value: WALKTHROUGH,
    label: 'Walk Through'
  },
  {
    value: DOCUMENT_PREPARATION,
    label: 'Document Preparation'
  },
  {
    value: IWIM,
    label: 'IWIM'
  },
  {
    value: LIEN,
    label: 'Lien Service'
  },
  {
    value: EDD_LIEN,
    label: 'EDD Lien'
  },
  {
    value: IWO,
    label: 'IWO'
  },
  {
    value: MISC,
    label: 'Misc'
  }
];

export const isWalkthrough = (type) => type === WALKTHROUGH;

export const isNotWalkthrough = (type) => type && (type !== WALKTHROUGH);

export const isIWO = (type) => type === IWO;

export const isDocumentPreparation = (type) => type === DOCUMENT_PREPARATION;

export const isIWIM = (type) => type === IWIM;

export const isEddLien = (type) => type === EDD_LIEN;

export const isLien = (type) => type === LIEN;

export const isMisc = (type) => type === MISC;

export const hasSmallDescription = (type) => type === LIEN || type === EDD_LIEN || type === IWO || type === MISC;

export const hasLargeDescription = (type) => type === DOCUMENT_PREPARATION || type === IWIM || type === WALKTHROUGH;

export const getLabelByValue = (value) => {
  const filtered = list.filter((item) => item.value === value);
  return filtered.length ? filtered[0].label : null;
};
