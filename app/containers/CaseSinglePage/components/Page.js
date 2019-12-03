import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import ButtonsGroup from './ButtonsGroup';
import EddLiens from './EddLiens';
import CaseWrapper from '../../CaseWrapper';
import ServicesList from './ServicesList';
import { EDD_LIEN, LIEN } from './SaveService/types';
import { getCaseId } from '../../../utils/router';
import Preloader from '../../../components/Preloader/Preloader';
import { LiensTable, Drawer as LiensDrawer } from './Liens';
import injectLoader from '../../../utils/injectLoader';

const getEddLien = (services) => {
  if(!services) {
    return null;
  }

  const filtered = services.filter((service) => service.serviceType === EDD_LIEN);
  return filtered.length ? filtered[0] : null;
};

const getLien = (services) => {
  if(!services) {
    return null;
  }

  const filtered = services.filter((service) => service.serviceType === LIEN);
  return filtered.length ? filtered[0] : null;
};

const Page = ({ services, invalid }) => {
  const eddLien = getEddLien(services);
  const lien = getLien(services);

  return (
    <CaseWrapper sidebarOptions="case">
      <Helmet>
        <title>Case profile</title>
      </Helmet>
      { invalid ? <Preloader /> : (
        <div>
          <ButtonsGroup />
          <ServicesList />
          { eddLien ? <EddLiens id={eddLien[EDD_LIEN].id} /> : null}
          { lien ? <LiensTable lien={lien} /> : null}
          { lien ? <LiensDrawer lien={lien} /> : null}
        </div>
      )}
    </CaseWrapper>
  );
};

const mapStateToProps = (state) => ({
  services: (state.get('caseDetails') && state.get('caseDetails').get('data')) ? state.get('caseDetails').get('data').get('services').toJS() : null,
  invalid: !state.get('caseDetails') || (state.get('caseDetails').get('data').get('id') !== parseInt(getCaseId(state.get('route').get('location').get('pathname')), 10))
});

const withConnect = connect(mapStateToProps);
const withLoader = injectLoader();

export default compose(withConnect, withLoader)(Page);
