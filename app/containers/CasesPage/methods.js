import React from 'react';
import uniqBy from 'lodash/uniqBy';
import { getLabelByValue } from '../CaseSinglePage/components/SaveService/types';
import { getName } from '../../utils/common';

export const getServicesTypes = (services) => {
  if (services && services.length) {
    const servicesTypesList = uniqBy(services, 'serviceType').map((service) => service.serviceType).sort();
    return (
      <ul className="text-items-list text-overflow">
        {servicesTypesList.map((service) => (
          <li key={service}>{getLabelByValue(service)}</li>
        ))}
      </ul>
    );
  }
  return '-';
};

const findPrimaryClaimNumber = (claims) => {
  if (!claims || !claims.length) {
    return 'NOCLAIM';
  }

  const copy = [...claims];
  copy.sort((a, b) => b.id - a.id);

  return copy[0].claimNumber ? copy[0].claimNumber : 'NOCLAIM';
};

const generatePartialCaseName = (result, { primaryClaimNumber, referralId }) => {
  if (primaryClaimNumber) {
    result = `${result ? `${result}-` : ''}${primaryClaimNumber}`;
  }

  if (referralId) {
    result = `${result ? `${result}-` : ''}#${referralId}`;
  }

  return result;
};

export const generateCaseName = (injuredWorker, claims, referralId) => {
  const primaryClaimNumber = findPrimaryClaimNumber(claims);
  let result = '';
  if (injuredWorker) {
    result = `${injuredWorker.firstName} ${injuredWorker.lastName}`;
  }
  result = generatePartialCaseName(result, { primaryClaimNumber, referralId });
  return result;
};

export const getCaseNameFromState = ({ injuredWorker, primaryClaimNumber, referralId }, initialValue) => {
  const claims = initialValue.claims || [];
  injuredWorker = injuredWorker || (initialValue.injuredWorker ? getName(initialValue.injuredWorker) : undefined);
  primaryClaimNumber = primaryClaimNumber || (claims.length ? claims[0].claimNumber : undefined);
  referralId = referralId || initialValue.referralId || undefined;
  let result = injuredWorker || undefined;
  result = generatePartialCaseName(result, { primaryClaimNumber, referralId });
  return result;
};
