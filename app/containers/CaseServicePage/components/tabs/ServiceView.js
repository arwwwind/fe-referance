import React from 'react';
import isBoolean from 'lodash/isBoolean';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col, Button, Checkbox } from 'antd';
import { stringToText, addDollarSign, addPercentageSign } from '../../../../utils/common';
import ServiceViewForm from './ServiceViewForm';
import { getLabelByValue, LIEN, WALKTHROUGH } from '../../../CaseSinglePage/components/SaveService/types';
import { singleServiceViewStart } from './ServiceViewForm/actions';
import { singleContactStart } from '../../../ContactsPage/actions';
import { Drawer as ContactDrawer } from '../../../ContactsPage';
import { walkthroughWorksheet } from '../../../../utils/exports';
import { getServiceId } from '../../../../utils/router';
import { singleOrganizationStart } from '../../../OrganizationsPage/actions';
import { Drawer as OrganizationDrawer } from '../../../OrganizationsPage';
import { singleVenueStart } from '../../../VenuesPage/Venues/actions';
import { Drawer as VenueDrawer } from '../../../VenuesPage/Venues';
import { getContactsSpecialInstructions, getAccountSpecialInstructions, getVenueSpecialInstructions } from './methods';

const getCustomLabelByValue = (value) => {
  if (value === LIEN) {
    return 'Lien';
  }

  return getLabelByValue(value);
};

const BasicInformation = ({ service, ...props }) => (
  <Col md={12} xs={24}>
    <div className="text-title m-b-md">Basic Information</div>
    <Row gutter={10}>
      <Col md={12} sm={24}>
        <div className="juvo-tag success m-b-sm"><span className="t-capitalize">{stringToText(getCustomLabelByValue(service.serviceType))}</span> Service</div>
        <div className="text-muted">{(service.case && service.case.referralDate) ? `Referred - ${moment(service.case.referralDate).format('L')}` : 'Referred -'}</div>
        <div className="text-muted m-b-sm">Turn Around Time (0 days)</div>
        <div className="m-b-sm">
          <span className="text-bold m-r-xs">Contact For</span>
          <span>{ (service.case && service.case.injuredWorker) ? `${service.case.injuredWorker.firstName} ${service.case.injuredWorker.lastName}` : '-' }</span>
        </div>
        <div className="two-columns-auto-width m-b-sm">
          <div className="column">
            <div className="text-bold">Managed By</div>
            <div className="f-s-13">{ service.currentClaimHandler ? `${service.currentClaimHandler.firstName} ${service.currentClaimHandler.lastName}` : '-' }</div>
          </div>
          <div className="column text-right">
            <div className="text-bold">Owned By</div>
            <div className="f-s-13">{ service.serviceOwner ? `${service.serviceOwner.firstName} ${service.serviceOwner.lastName}` : '-'}</div>
          </div>
        </div>
        <div className="m-b-sm">
          <div className="text-bold m-b-xs">Description</div>
          <div className="text-muted">
            {stringToText(service.description)}
          </div>
        </div>
        <div className="m-b-sm">
          <div className="text-bold m-b-xs">Tags</div>
          {
            service.tags ? service.tags.map((tag) => (
              <div key={tag.id} className="juvo-tag info no-radius m-r-xs">{stringToText(tag.label)}</div>
            )) : ''
          }
          {
            (service.tags && service.tags.length) ? '' : '-'
          }
        </div>
      </Col>
      <Col md={12} sm={24}>
        <div className="m-b-sm">
          <div className="text-bold m-b-xs">Hold Reason</div>
          <div className="text-muted">
            {stringToText(service.holdReason)}
          </div>
        </div>
        <div className="m-b-sm">
          <div className="text-bold m-b-xs">Suspended</div>
          <div className="text-muted">
            {service.suspended ? 'Yes' : 'No'}
          </div>
        </div>
      </Col>
    </Row>
  </Col>
);

const Medical = ({ service, ...props }) => (
  <Col md={12} xs={24}>
    <div className="text-title m-b-md flex space-between">
      <span>Medical</span>
      <ServiceViewForm serviceType={service.serviceType} serviceId={service.id} caseId={service.caseId} name="Medical" />
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">PS Date:</span>
      <span className="text-muted">{service.permantAndStationeryDate ? moment(service.permantAndStationeryDate).format('L') : '-'}</span>
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">Whole Person Imparement WPI:</span>
      <span className="text-muted">{addPercentageSign(service.walkthrough.wholePersonImparement)}</span>
    </div>
    <div className="m-b-sm">
      <span className="f-s-13 text-700 m-r-xs">Appointment:</span>
      <span className="text-muted">{addPercentageSign(service.walkthrough.apportionment)}</span>
    </div>
    <div className="m-b-sm">
      <span className="f-s-13 text-700 m-r-xs">Future Medical:</span>
      <span className="text-muted">{stringToText(service.walkthrough.futureMedical)}</span>
    </div>
    <div className="m-b-sm">
      <span className="f-s-13 text-700 m-r-xs">Injury Details:</span>
      <span className="text-muted">{stringToText(service.walkthrough.injuryDetails)}</span>
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">MSA Amount:</span>
      <span className="text-muted">{addDollarSign(service.walkthrough.MSAAmount)}</span>
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">Referenced Medical Report:</span>
      <span className="text-muted">Doctor Name: {stringToText(service.walkthrough.referencedMedicalReportDoctorName)}</span>
    </div>
    <div>
      <span className="f-s-13 text-700 m-r-xs">Referenced Medical Report:</span>
      <span className="text-muted">Date: {service.walkthrough.referencedMediacalReportDate ? moment(service.walkthrough.referencedMediacalReportDate).format('L') : '-'}</span>
    </div>
  </Col>
);

const Settlement = ({ service, ...props }) => (
  <Col md={12} xs={24}>
    <div className="text-title m-b-md flex space-between">
      <span>Settlement</span>
      <ServiceViewForm serviceType={service.serviceType} serviceId={service.id} caseId={service.caseId} name="Settlement" />
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">Settlement Type:</span>
      <span className="text-muted">{stringToText(service.settlementType)}</span>
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">Case Settlement Date:</span>
      <span className="text-muted">{service.caseSettlementDate ? moment(service.caseSettlementDate).format('L') : '-'}</span>
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">IW Still employed? :</span>
      <span className="text-muted">{isBoolean(service.IWStillEmployed) ? (service.IWStillEmployed ? 'Yes' : 'No') : '-'}</span>
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">Leaving Balance:</span>
      <span className="text-muted">{addDollarSign(service.leavingBalance)}</span>
    </div>
    { service.serviceType === WALKTHROUGH ? (
      <div>
        <div className="m-b-xs">
          <span className="f-s-13 text-700 m-r-xs">Additional Documents:</span>
          <span className="text-muted">{stringToText(service.walkthrough.additionalDocuments)}</span>
        </div>
        <div className="m-b-xs">
          <span className="f-s-13 text-700 m-r-xs">Insured or Self Insured:</span>
          <span className="text-muted">{stringToText(service.walkthrough.insuredOrSelfInsured)}</span>
        </div>
      </div>
    ) : null}
  </Col>
);

const Indemnity = ({ service, ...props }) => (
  <Col md={12} xs={24}>
    <div className="text-title m-b-md flex space-between">
      <span>Indemnity</span>
      <ServiceViewForm serviceType={service.serviceType} serviceId={service.id} caseId={service.caseId} name="Indemnity" />
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">TD Paid:</span>
      <span className="text-muted">{addDollarSign(service.walkthrough.TDPaid)}</span>
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">PD Percent:</span>
      <span className="text-muted">{addPercentageSign(service.walkthrough.PDPercent)}</span>
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">PD Paid:</span>
      <span className="text-muted">{addDollarSign(service.walkthrough.PDPaid)}</span>
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">PD Value:</span>
      <span className="text-muted">{addDollarSign(service.walkthrough.PDValue)}</span>
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">Settlement Docs:</span>
      <span className="text-muted">{isBoolean(service.walkthrough.settlementDocs) ? (service.walkthrough.settlementDocs ? 'Yes' : 'No') : '-'}</span>
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">Rating:</span>
      <span className="text-muted">{stringToText(service.walkthrough.docRating)}</span>
    </div>
  </Col>
);

const WCABInformation = ({ service, ...props }) => (
  <Col md={12} xs={24}>
    <div className="text-title m-b-md flex space-between">
      <span>WCAB Information</span>
      <ServiceViewForm serviceType={service.serviceType} serviceId={service.id} caseId={service.caseId} name="WCAB Information" />
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">Judge:</span>
      <span className="text-link">{service.judge ? `${service.judge.firstName} ${service.judge.lastName}` : '-'}</span>
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">Assigned Venue:</span>
      <span className="text-link">{service.venue ? service.venue.name : '-'}</span>
    </div>
    <div className="m-b-xs">
      <span className="f-s-13 text-700 m-r-xs">ADJ Number:</span>
      <span className="text-muted">{stringToText(service.ADJNumber)}</span>
    </div>
  </Col>
);

const openSpecialEntityDrawer = (id, action) => (e) => {
  e.preventDefault();
  action(id);
};

const SpecialInstructions = ({
  service, onContactEdit, onOrganizationEdit, onVenueEdit
}) => {
  const contactInstructions = getContactsSpecialInstructions(service);
  const accountInstructions = getAccountSpecialInstructions(service);
  const venueInstructions = getVenueSpecialInstructions(service);

  return (
    <Col md={12} xs={24}>
      <div className="text-title m-b-md flex space-between">
        <span>Special Instructions</span>
      </div>
      {contactInstructions.length ?
        (
          <div>
            <ContactDrawer />
            {
              contactInstructions.map((contact, key) => (
                <div className="m-b-md" key={key}>
                  <span className="f-s-13 text-700 m-r-xs">{contact.name}</span>
                  <br />
                  <div className="f-s-13 text-muted">
                    {contact.specialInstruction}
                  </div>
                  <a href="#" onClick={openSpecialEntityDrawer(contact.id, onContactEdit)}>Link Here</a>
                </div>
              ))
            }
          </div>
        ) : null}
      {accountInstructions.length ?
        (
          <div>
            <OrganizationDrawer />
            {
              accountInstructions.map((account, key) => (
                <div className="m-b-md" key={key}>
                  <span className="f-s-13 text-700 m-r-xs">{account.name}</span>
                  <br />
                  <div className="f-s-13 text-muted">
                    {account.specialInstruction}
                  </div>
                  <a href="#" onClick={openSpecialEntityDrawer(account.id, onOrganizationEdit)}>Link Here</a>
                </div>
              ))
            }
          </div>
        ) : null}
      {venueInstructions.length ?
        (
          <div>
            <VenueDrawer />
            {
              venueInstructions.map((venue, key) => (
                <div className="m-b-md" key={key}>
                  <span className="f-s-13 text-700 m-r-xs">{venue.name}</span>
                  <br />
                  <div className="f-s-13 text-muted">
                    {venue.specialInstruction}
                  </div>
                  <a href="#" onClick={openSpecialEntityDrawer(venue.id, onVenueEdit)}>Link Here</a>
                </div>
              ))
            }
          </div>
        ) : null}
    </Col>
  );
};

const WalkThroughWorksheet = ({ service, ...props }) => (
  <div className="service-generate">
    <div className="flex space-between m-b-md">
      <div className="text-title">Walk Through Worksheet</div>
      <Button type="primary" shape="circle" size="large" onClick={props.export}>Generate</Button>
    </div>
    <div className="checkboxes-group">
      <Row className="m-b-md">
        <Col md={6} sm={12} xs={24}>
          <div className="m-b-xs">
            <Checkbox defaultChecked={!!service.walkthrough.settlementDocs} disabled><span className="f-s-13 text-700">Settlement Docs</span></Checkbox>
          </div>
          <div className="m-b-xs">
            <Checkbox defaultChecked={!!service.walkthrough.medicalReport} disabled><span className="f-s-13 text-700">Medical Report</span></Checkbox>
          </div>
          <div className="m-b-xs">
            <Checkbox defaultChecked={!!service.walkthrough.benefitNotice} disabled><span className="f-s-13 text-700">Benefit Notice</span></Checkbox>
          </div>
        </Col>
        <Col md={6} sm={12} xs={24}>
          <div className="m-b-xs">
            <Checkbox defaultChecked={!!service.walkthrough.PDBenefitPrintout} disabled><span className="f-s-13 text-700">PD Benefit Printout</span></Checkbox>
          </div>
          <div className="m-b-xs">
            <Checkbox defaultChecked={!!service.walkthrough.medicalBenefitPrintout} disabled><span className="f-s-13 text-700">Medical Benefit Printout</span></Checkbox>
          </div>
          <div className="m-b-xs">
            <Checkbox defaultChecked={!!service.walkthrough.MSA} disabled><span className="f-s-13 text-700">MSA?</span></Checkbox>
          </div>
        </Col>
        <Col md={6} sm={12} xs={24}>
          <div className="m-b-xs">
            <Checkbox defaultChecked={!!service.walkthrough.QMEWaiver} disabled><span className="f-s-13 text-700">QMC Waiver</span></Checkbox>
          </div>
          <div className="m-b-xs">
            <Checkbox defaultChecked={!!service.walkthrough.benefitPrintout} disabled><span className="f-s-13 text-700">Benefit Printout</span></Checkbox>
          </div>
          <div className="m-b-xs">
            <Checkbox defaultChecked={!!service.walkthrough.TDBenefitPrintout} disabled><span className="f-s-13 text-700">TD Benefit Printout</span></Checkbox>
          </div>
        </Col>
        <Col md={6} sm={12} xs={24}>
          <div className="m-b-xs">
            <Checkbox defaultChecked={!!service.walkthrough.docOfferOfWork} disabled><span className="f-s-13 text-700">Offer of Work:</span></Checkbox>
          </div>
          <div className="m-b-xs">
            <Checkbox defaultChecked={!!service.walkthrough.DWC1} disabled><span className="f-s-13 text-700">DWC-1:</span></Checkbox>
          </div>
        </Col>
      </Row>
      <div className="m-b-sm">
        <div className="text-bold m-b-xs">Notes to Hearing Rep:</div>
        <div className="text-muted">
          {stringToText(service.walkthrough.notesToHearingRep)}
        </div>
      </div>
      <div>
        <span className="f-s-13 text-700 m-r-xs">Additional Documents:</span>
        <span className="text-muted">{stringToText(service.walkthrough.additionalDocuments)}</span>
      </div>
    </div>
  </div>
);

const ServiceView = (props) => {
  const service = props.service ? props.service.toJS() : {};
  service.walkthrough = service.walkthrough ? service.walkthrough : {};

  return (
    <div className="tab-services-view">
      <div className="tab-service-view-blocks">
        { service.serviceType === WALKTHROUGH ? (
          <Row className="m-b-extra-sm">
            <BasicInformation {...props} service={service} />
            <Medical {...props} service={service} />
          </Row>
        ) : null }
        { service.serviceType === WALKTHROUGH ? (
          <Row className="m-b-extra-sm">
            <Settlement {...props} service={service} />
            <Indemnity {...props} service={service} />
          </Row>
        ) : null }
        { service.serviceType !== WALKTHROUGH ? (
          <Row className="m-b-extra-sm">
            <BasicInformation {...props} service={service} />
            <Settlement {...props} service={service} />
          </Row>
        ) : null }
        <Row>
          <WCABInformation {...props} service={service} />
          <SpecialInstructions {...props} service={service} />
        </Row>
      </div>
      {
        (service.serviceType === 'walkthrough') ? (
          <WalkThroughWorksheet {...props} service={service} export={() => { walkthroughWorksheet(props.serviceId); }} />
        ) : null
      }
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  showServiceViewDrawer: (name) => dispatch(singleServiceViewStart(props.service.get('id'), props.service.get('caseId'), name)),
  onContactEdit: (id) => dispatch(singleContactStart(id)),
  onOrganizationEdit: (id) => dispatch(singleOrganizationStart(id)),
  onVenueEdit: (id) => dispatch(singleVenueStart(id))
});

const mapStateToProps = (state) => ({
  serviceId: parseInt(getServiceId(state.get('route').get('location').get('pathname')), 10)
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ServiceView);
