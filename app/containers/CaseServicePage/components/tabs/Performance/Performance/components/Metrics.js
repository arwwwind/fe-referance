import React from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../../../../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../../../../../utils/injectSaga';
import saga from '../saga';
import { fetchCaseMetricsStart } from '../actions';
import { getContactId } from '../../../../../../../utils/router';
import Preloader from '../../../../../../../components/Preloader/Preloader';
import { checkValidValue, formatMetricsValue } from '../../../../../../../utils/common';

class Metrics extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { loading, data } = this.props;

    if (loading) {
      return <Preloader />;
    }

    return (
      <div>
        { data.walkthrough ? (
          <div className="stats-group b-b-1 p-b-extra-md m-t-extra-xs m-b-extra-xs">
            <div className="text-title m-b-md">Walk Through</div>
            <Row gutter={15} type="flex">
              {checkValidValue(data.walkthrough.turnAroundTime) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.walkthrough.turnAroundTime)}</div>
                  <div className="stats-name">Turnaround Time (Business Days)</div>
                </Col>
              ) : null}
              {checkValidValue(data.walkthrough.daysOnHold) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.walkthrough.daysOnHold)}</div>
                  <div className="stats-name">Days on Hold</div>
                </Col>
              ) : null}
              {checkValidValue(data.walkthrough.numberOfSuspensions) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.walkthrough.numberOfSuspensions)}</div>
                  <div className="stats-name">Number of Suspensions</div>
                </Col>
              ) : null}
            </Row>
          </div>
        ) : null}
        { data.iwo ? (
          <div className="stats-group b-b-1 p-b-extra-md m-b-extra-xs">
            <div className="text-title m-b-md">IWO</div>
            <Row gutter={15} type="flex">
              {checkValidValue(data.iwo.turnAroundTime) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.iwo.turnAroundTime)}</div>
                  <div className="stats-name">Turnaround Time (Business Days)</div>
                </Col>
              ) : null}
              {checkValidValue(data.iwo.daysToObtainSignature) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.iwo.daysToObtainSignature)}</div>
                  <div className="stats-name">Days to Obtain sig. (Ref Date- Sig Date)</div>
                </Col>
              ) : null}
              {checkValidValue(data.iwo.obtainedSignature) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{data.iwo.obtainedSignature ? 'SUCCESS' : 'FAIL'}</div>
                  <div className="stats-name">Obtained Sig. (Sig Obtained)</div>
                </Col>
              ) : null}
              {(checkValidValue(data.iwo.daysToHold) && checkValidValue(data.iwo.daysToHold.count)) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.iwo.daysToHold.count)}</div>
                  <div className="stats-name">Days to Hold</div>
                </Col>
              ) : null}
              {(checkValidValue(data.iwo.daysToHold) && checkValidValue(data.iwo.daysToHold.value)) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{data.iwo.daysToHold.value ? 'YES' : 'NO'}</div>
                  <div className="stats-name">Days to Hold</div>
                </Col>
              ) : null}
            </Row>
          </div>
        ) : null}
        { data.lienService ? (
          <div className="stats-group b-b-1 p-b-extra-md m-b-extra-xs">
            <div className="text-title m-b-md">Lien Service</div>
            <Row gutter={15} type="flex">
              {checkValidValue(data.lienService.turnAroundTime) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.lienService.turnAroundTime)}</div>
                  <div className="stats-name">Turnaround Time (Business Days)</div>
                </Col>
              ) : null}
              {checkValidValue(data.lienService.daysOnHold) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.lienService.daysOnHold)}</div>
                  <div className="stats-name">Days on Hold</div>
                </Col>
              ) : null}
              {checkValidValue(data.lienService.numberOfAppearances) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.lienService.numberOfAppearances)}</div>
                  <div className="stats-name">Number of Appearances</div>
                </Col>
              ) : null}
              {checkValidValue(data.lienService.costSavings) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.lienService.costSavings)}</div>
                  <div className="stats-name">Cost Savings</div>
                </Col>
              ) : null}
              {checkValidValue(data.lienService.averageDaysToSettleLiens) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.lienService.averageDaysToSettleLiens)}</div>
                  <div className="stats-name">Average Days to Settle Liens</div>
                </Col>
              ) : null}
            </Row>
          </div>
        ) : null}
        { data.iwm ? (
          <div className="stats-group b-b-1 p-b-extra-md m-t-extra-xs m-b-extra-xs">
            <div className="text-title m-b-md">IWM</div>
            <Row gutter={15} type="flex">
              {checkValidValue(data.iwm.turnAroundTime) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.iwm.turnAroundTime)}</div>
                  <div className="stats-name">Turnaround Time (Business Days)</div>
                </Col>
              ) : null}
              {checkValidValue(data.iwm.daysOnHold) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.iwm.daysOnHold)}</div>
                  <div className="stats-name">Days on Hold</div>
                </Col>
              ) : null}
              {checkValidValue(data.iwm.numberOfMeetings) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.iwm.numberOfMeetings)}</div>
                  <div className="stats-name">Number of Meetings (Based on in Person Events)</div>
                </Col>
              ) : null}
            </Row>
          </div>
        ) : null}
        { data.eddLien ? (
          <div className="stats-group b-b-1 p-b-extra-md m-t-extra-xs m-b-extra-xs">
            <div className="text-title m-b-md">Edd Lien</div>
            <Row gutter={15} type="flex">
              {checkValidValue(data.eddLien.turnAroundTime) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.eddLien.turnAroundTime)}</div>
                  <div className="stats-name">Turnaround Time (Business Days)</div>
                </Col>
              ) : null}
              {checkValidValue(data.eddLien.daysOnHold) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.eddLien.daysOnHold)}</div>
                  <div className="stats-name">Days on Hold</div>
                </Col>
              ) : null}
            </Row>
          </div>
        ) : null}
        { data.misc ? (
          <div className="stats-group b-b-1 p-b-extra-md m-t-extra-xs">
            <div className="text-title m-b-md">Misc</div>
            <Row gutter={15} type="flex">
              {checkValidValue(data.misc.turnAroundTime) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.misc.turnAroundTime)}</div>
                  <div className="stats-name">Turnaround Time (Business Days)</div>
                </Col>
              ) : null}
              {checkValidValue(data.misc.daysOnHold) ? (
                <Col className="stats-item" sm={6} xs={8}>
                  <div className="stats-value">{formatMetricsValue(data.misc.daysOnHold)}</div>
                  <div className="stats-name">Days on Hold</div>
                </Col>
              ) : null}
            </Row>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { caseId }) => ({
  fetchData: () => dispatch(fetchCaseMetricsStart(caseId))
});

const mapStateToProps = (state) => ({
  contactId: getContactId(state.get('route').get('location').get('pathname')),
  data: state.get('caseMetrics').get('data').toJS(),
  loading: state.get('caseMetrics').get('fetch').get('loading')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'caseMetrics', reducer });
const withSaga = injectSaga({ key: 'caseMetrics', saga });

export default compose(withReducer, withSaga, withConnect)(Metrics);
