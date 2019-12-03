import { call, put, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import merge from 'lodash/merge';
import moment from 'moment';
import { LOCATION_CHANGE } from 'react-router-redux';
import axios from '../../../../axios';
import config from '../../../../config';
import {
  SAVE_SERVICE_START,
  SINGLE_SERVICE_START
} from './constants';
import {
  saveServiceError,
  saveServiceSuccess,
  singleServiceData,
  singleServiceError,
  singleServiceStart,
  goToStep
} from './actions';
import { hideDrawer, showDrawer } from '../../../../components/Core/Drawer/actions';
import * as errors from '../../../../utils/errors';
import { showNotification } from '../../../App/actions';
import * as type from './types';
import { fetchCaseDetailsStart } from '../../../CaseWrapper/actions';
import { fetchServiceStart } from '../../../CaseServicePage/actions';

export const getType = (data) => (data[1] ? data[1].serviceType : undefined);

export const getSettlementType = (data) => (data[2] ? data[2].settlementType : undefined);

export const getBodyParts = (data) => {
  const walkthrough = data[11] ? data[11].walkthrough : false;
  if (walkthrough) {
    return walkthrough.bodyParts || null;
  }
  return null;
};

export const getInsured = (data) => {
  const walkthrough = data[2] ? data[2].walkthrough : false;
  if (walkthrough) {
    return walkthrough.insuredOrSelfInsured ? walkthrough.insuredOrSelfInsured === 'insured' : false;
  }
  return false;
};

export const getIsLienInfo = (data) => (data[1] ? data[1].isLienInfo : undefined);

export const stepIsActive = (step, data) => {
  if (step >= 9 && step <= 21 && !(step % 2) && (!type.isWalkthrough(getType(data)) || getSettlementType(data) !== 'STIP')) {
    return false;
  } else if (step >= 9 && step <= 21 && (step % 2) && (!type.isWalkthrough(getType(data)) || getSettlementType(data) !== 'C&R')) {
    return false;
  } else if (step >= 22 && step <= 29 && !type.isWalkthrough(getType(data))) {
    return false;
  } else if (step === 8 && !type.isMisc(getType(data))) {
    return false;
  } else if (step === 7 && !type.isIWO(getType(data))) {
    return false;
  } else if (step === 6 && !type.isEddLien(getType(data))) {
    return false;
  } else if (step === 5 && !type.isLien(getType(data))) {
    return false;
  } else if (step === 4 && !type.isIWIM(getType(data))) {
    return false;
  } else if (step === 3 && !type.isDocumentPreparation(getType(data))) {
    return false;
  } else if (step === 2 && !type.isWalkthrough(getType(data)) && !getIsLienInfo(data)) {
    return false;
  }

  return true;
};

const convertToMoment = (data) => data ? moment(data) : data;

const prepareReceivedData = (data) => {
  data.rushRequested = data.rushRequested ? 1 : 0;
  data.iwDob = data.iwDob ? 1 : 0;
  data.confirmBenefitPrintout = data.confirmBenefitPrintout ? 1 : 0;
  data.settlementLanguage = data.settlementLanguage ? 1 : 0;

  data.serviceStartDate = convertToMoment(data.serviceStartDate);
  data.serviceEnd = convertToMoment(data.serviceEnd);
  data.hearingDate = convertToMoment(data.hearingDate);

  if (data.documentPreparation) {
    data.documentPreparation.WCABFilingIncluded = data.documentPreparation.WCABFilingIncluded ? 1 : 0;
  }

  if (data.injuredWorkerOutreach) {
    data.injuredWorkerOutreach.meetingWithWorker = data.injuredWorkerOutreach.meetingWithWorker ? 1 : 0;
    data.injuredWorkerOutreach.negotiatingSettlement = data.injuredWorkerOutreach.negotiatingSettlement ? 1 : 0;
    data.injuredWorkerOutreach.IWStillEmployed = data.injuredWorkerOutreach.IWStillEmployed ? 1 : 0;
    data.injuredWorkerOutreach.lawyerInvolved = data.injuredWorkerOutreach.lawyerInvolved ? 1 : 0;
    data.injuredWorkerOutreach.isInterpretorInvolved = data.injuredWorkerOutreach.isInterpretorInvolved ? 1 : 0;
    data.injuredWorkerOutreach.QMERefusal = data.injuredWorkerOutreach.QMERefusal ? 1 : 0;
    data.injuredWorkerOutreach.IWMedicareEligible = data.injuredWorkerOutreach.IWMedicareEligible ? 1 : 0;
  }

  if (data.walkthrough) {
    data.walkthrough.doctorDate = convertToMoment(data.walkthrough.doctorDate);

    data.walkthrough.isInsuranceCarrierInformationComplete = data.walkthrough.isInsuranceCarrierInformationComplete ? 1 : 0;
    data.walkthrough.confirmUAN = data.walkthrough.confirmUAN ? 1 : 0;
    data.walkthrough.DOBMakeSense = data.walkthrough.DOBMakeSense ? 1 : 0;
    data.walkthrough.additionalDOIS = data.walkthrough.additionalDOIS ? 1 : 0;
    data.walkthrough.AreThereBodyPartsWrittenInCOE = data.walkthrough.AreThereBodyPartsWrittenInCOE ? 1 : 0;
    data.walkthrough.DoesUnpaidMedicalFieldImply = data.walkthrough.DoesUnpaidMedicalFieldImply ? 1 : 0;
    data.walkthrough.IsItFMCNecessary = data.walkthrough.IsItFMCNecessary ? 1 : 0;
    data.walkthrough.settlementLanguage = data.walkthrough.settlementLanguage ? 1 : 0;
    data.walkthrough.areThereInitialsInDoc = data.walkthrough.areThereInitialsInDoc ? 1 : 0;
    data.walkthrough.DoesSettlementLanguageComply = data.walkthrough.DoesSettlementLanguageComply ? 1 : 0;
    data.walkthrough.signedDatedAndNoterarized = data.walkthrough.signedDatedAndNoterarized ? 1 : 0;
    data.walkthrough.QMEWaiver = data.walkthrough.QMEWaiver ? 1 : 0;
    data.walkthrough.medicalReport = data.walkthrough.medicalReport ? 1 : 0;
    data.walkthrough.bodyPartsMatch = data.walkthrough.bodyPartsMatch ? 1 : 0;
    data.walkthrough.benefitPrintout = data.walkthrough.benefitPrintout ? 1 : 0;
    data.walkthrough.offerOfWorkConfirm = data.walkthrough.offerOfWorkConfirm ? 1 : 0;
    data.walkthrough.offerOfWorkMakeSense = data.walkthrough.offerOfWorkMakeSense ? 1 : 0;
    data.walkthrough.DWC1 = data.walkthrough.DWC1 ? 1 : 0;
    data.walkthrough.MSA = data.walkthrough.MSA ? 1 : 0;
  }

  return data;
};

const prepareDataToSend = (data) => Object.keys(data).reduce((ret, step) => {
  if (stepIsActive(step, data)) {
    merge(ret, data[step]);
  }

  return ret;
}, {});

/**
 * Add services
 * @function servicesFetch
 */
export function* formServiceSend({
  data,
  form,
  caseId,
  serviceId
}) {
  try {
    const response = yield call(serviceId ?
      () => axios.put(`cases/${caseId}/services/${serviceId}`, prepareDataToSend(data)) :
      () => axios.post(`cases/${caseId}/services`, prepareDataToSend(data)));
    const receivedData = response.data.data;

    yield put(saveServiceSuccess(serviceId, caseId, receivedData));
    yield put(hideDrawer('services'));

    yield put(fetchCaseDetailsStart());
    yield put(fetchServiceStart());
  } catch (error) {
    try {
      yield put(saveServiceError(serviceId, caseId, error.response.data.errors));

      const nextStep = errors.displayMultiple(form, error.response.data.errors, data);
      if (nextStep) {
        yield put(goToStep(nextStep));
      }

      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveServiceError(serviceId, caseId, config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export function* singleServiceStartSaga({ caseId, serviceId }) {
  yield put(showDrawer('services'));

  if (serviceId) {
    try {
      const response = yield call(() => axios.get(`cases/${caseId}/services/${serviceId}`));
      yield put(singleServiceData(serviceId, caseId, prepareReceivedData(response.data.data)));
    } catch (error) {
      try {
        yield put(singleServiceError(serviceId, caseId, error.response.data.errors));
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      } catch (internal) {
        yield put(singleServiceError(serviceId, caseId, config.generalError));
        yield put(showNotification({
          placement: 'topLeft'
        }));
      }
    }
  } else {
    yield delay();
    yield put(singleServiceData(serviceId, caseId, null));
  }
}

export function* locationChangeSaga({ payload: { pathname } }) {
  const path = pathname.split('/');

  if (path[1] === 'case' && path[3] === 'add-service') {
    yield delay();
    yield put(singleServiceStart(undefined, path[2]));
  }
}

export function* drawerSaga() {
  yield takeLatest(SAVE_SERVICE_START, formServiceSend);
  yield takeLatest(SINGLE_SERVICE_START, singleServiceStartSaga);
  yield takeLatest(LOCATION_CHANGE, locationChangeSaga);

  const locationAction = yield select((data) => ({ payload: { pathname: data.get('route').get('location').get('pathname') } }));
  yield call(() => locationChangeSaga(locationAction));
}
