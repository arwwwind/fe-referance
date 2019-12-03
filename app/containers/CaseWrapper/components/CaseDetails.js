import React from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from '../../../components/Preloader';
import { getCaseId } from '../../../utils/router';
import * as types from '../../CaseSinglePage/components/SaveService/types';
import { CaseDropdown, ServiceDropdown } from './Dropdown';
import { generateCaseName } from '../../CasesPage/methods';

const Dropdown = ({ sidebarOptions }) => {
  switch (sidebarOptions) {
    case 'case': return <CaseDropdown />;
    case 'service': return <ServiceDropdown />;
    default: return null;
  }
};

const prepareServiceTags = (services) => {
  const map = types.list.reduce((map, type) => {
    map[type.value] = {
      name: type.label,
      value: 0
    };

    return map;
  }, {});

  services.forEach((service) => {
    map[service.serviceType].value += 1;
  });

  return Object.keys(map).reduce((tags, key) => {
    if (map[key].value > 0) {
      tags.push(map[key]);
    }

    return tags;
  }, []);
};

class CaseDetails extends React.Component {
  nameJoiner = ({ firstName, lastName }) => (firstName && lastName) ? `${firstName}  ${lastName}` : '-';

  lifeSpan = (date) => moment(new Date()).diff(moment(date), 'days');

  render() {
    const { data, loading, caseId } = this.props;

    return (loading && (!data.id || data.id !== caseId)) ? (<Preloader />) : (
      <div>
        <Dropdown sidebarOptions={this.props.sidebarOptions} />
        <div className="label-badge primary m-b-sm">CASE #{data.id}</div>
        <div className="text-title m-b-sm">{generateCaseName(data.injuredWorker, data.claims, data.referralId)}</div>
        <div className="text-muted">Referred {data.referralDate ? moment(data.referralDate).format('L') : '-'}</div>
        <div className="text-muted m-b-xs">Life Span {this.lifeSpan(data.referralDate)} Days</div>
        {data.injuredWorker ? (
          <div className="m-b-sm">
            <span className="text-bold m-r-xs">For</span>
            <span>{this.nameJoiner(data.injuredWorker)}</span>
          </div>
        ) : null}
        <div className="two-columns-auto-width m-b-xxl">
          {data.referral ? (
            <div className="column">
              <div className="text-bold">Managed By</div>
              <div>{this.nameJoiner(data.referral)}</div>
            </div>
          ) : null}
          {data.caseOwner ? (
            <div className="column">
              <div className="text-bold">Owned By</div>
              <div>{this.nameJoiner(data.caseOwner)}</div>
            </div>
          ) : null}
        </div>
        {data.injuredWorker ? (
          <Collapse className="juvo-collapse m-b-md" bordered={false} defaultActiveKey={['injuredWorkerInformation']}>
            <Collapse.Panel header="Injured Worker Information" key="injuredWorkerInformation">
              <div className="m-b-sm">
                <span className="text-bold m-r-xs">Contact Info:</span>
                <span>{this.nameJoiner(data.injuredWorker)}</span>
              </div>
              <div className="m-b-sm">
                <div className="text-bold">Email</div>
                <div>{data.injuredWorker.email ? data.injuredWorker.email : '-'}</div>
              </div>
              <div className="m-b-sm">
                <div className="text-bold">Phone</div>
                <div>{data.injuredWorker.primaryPhoneNumber ? data.injuredWorker.primaryPhoneNumber : '-'}</div>
              </div>
              <div className="m-b-sm">
                <div className="text-bold">Fax Email</div>
                <div>{data.injuredWorker.faxNumber ? data.injuredWorker.faxNumber : '-'}</div>
              </div>
              <div>
                <div className="text-bold">Account</div>
                <div>
                  {data.injuredWorker.organisation ? (
                    <NavLink to={`/organization/${data.injuredWorker.organisation.id}`}>{data.injuredWorker.organisation.companyName}</NavLink>
                  ) : '-'}
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>
        ) : null}
        <div className="juvo-tags m-b-sm">
          {data.services ? prepareServiceTags(data.services).map((service) => <div className="juvo-tag m-b-xs" key={service.name}>{`${service.name} (${service.value})`}</div>) : null}
        </div>
        <div>
          {data.description}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.get('caseDetails').get('data').toJS(),
  loading: state.get('caseDetails').get('fetch').get('loading'),
  caseId: parseInt(getCaseId(state.get('route').get('location').get('pathname')), 10)
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(CaseDetails);
