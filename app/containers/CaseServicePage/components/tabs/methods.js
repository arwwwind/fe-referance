import forIn from 'lodash/forIn';

const generateSpecialInstructionTitle = (key) => {
  switch (key) {
    case 'currentClaimHandler':
      return 'Current Claim Handler Special Instructions:';
    case 'referredBy':
      return 'Referred By Special Instructions:';
    case 'invoicer':
      return 'Invoicer Special Instructions:';
    case 'applicantAttorney':
      return 'Applicant Attorney Special Instructions:';
    case 'serviceOwner':
      return 'Service Owner Special Instructions:';
    case 'account':
      return 'Account Special Instructions:';
    case 'actualVenue':
      return 'Actual Venue Board Notes:';
    case 'venue':
      return 'Venue Board Notes:';
    default: return null;
  }
};

export const getContactsSpecialInstructions = (service) => {
  const contactsObjKeys = ['currentClaimHandler', 'referredBy', 'invoicer', 'applicantAttorney', 'serviceOwner'];
  const result = [];

  forIn(service, (value, key) => {
    if (contactsObjKeys.includes(key)) {
      if (value && (value.contactType === 'adjuster' || value.contactType === 'manager')) {
        result.push({
          name: generateSpecialInstructionTitle(key),
          id: value.id,
          specialInstruction: value.specialInstructionNotes
        });
      }
    }
  });

  return result;
};

export const getAccountSpecialInstructions = (service) => {
  const caseObj = service.case || null;

  if (caseObj && caseObj.account) {
    return [{
      name: generateSpecialInstructionTitle('account'),
      id: caseObj.account.id,
      specialInstruction: caseObj.account.specialInstructionsNotes
    }];
  }

  return [];
};

export const getVenueSpecialInstructions = (service) => {
  const venuesObjKeys = ['actualVenue', 'venue'];
  const result = [];

  forIn(service, (value, key) => {
    if (venuesObjKeys.includes(key)) {
      if (value) {
        result.push({
          name: generateSpecialInstructionTitle(key),
          id: value.id,
          specialInstruction: value.boardNotes
        });
      }
    }
  });

  return result;
};
