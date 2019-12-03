import React from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../utils/injectSaga';
import saga from '../saga';
import { fetchContactMetricsStart } from '../actions';
import { getContactId } from '../../../utils/router';
import Preloader from '../../../components/Preloader/Preloader';
import { checkValidValue, formatMetricsValue, formatDate } from '../../../utils/common';

class Metrics extends React.Component {
  componentDidMount() {
    this.props.fetchData(this.props.contactId);
  }

  render() {
    const { loading, data } = this.props;

    if (loading) {
      return <Preloader />;
    }

    return (
      <div className="m-t-extra-sm">
        {data.contactType === 'injured-worker' || data.contactType === 'other' ? (
          <div>
            <div className="text-title m-b-md">{data.contactName}</div>
            <div className="stats-group b-b-1 p-b-extra-md m-t-extra-xs m-b-extra-xs">
              {data.externalRepresentative ? (
                <Row gutter={15} type="flex">
                  {checkValidValue(data.externalRepresentative.numberInPersonEvents) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.externalRepresentative.numberInPersonEvents)}</div>
                      <div className="stats-name">Number of In Person Events</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.externalRepresentative.walkthroughApprovalRating) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{data.externalRepresentative.walkthroughApprovalRating !== '-' ? `${formatMetricsValue(data.externalRepresentative.walkthroughApprovalRating)}%` : '-'}</div>
                      <div className="stats-name">Walkthrough Approval Rating</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.externalRepresentative.costSavings) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.externalRepresentative.costSavings)}</div>
                      <div className="stats-name">Cost Savings (In Court)</div>
                    </Col>
                  ) : null }
                </Row>
              ) : null}
            </div>
            <div className="stats-group p-b-extra-md m-t-extra-xs">
              {data.externalRepresentative ? (
                <Row gutter={15} type="flex">
                  {checkValidValue(data.externalRepresentative.averageRating) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.externalRepresentative.averageRating.count)}</div>
                      <div className="stats-name">Average Rating</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.externalRepresentative.lastRating) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.externalRepresentative.lastRating.value)}</div>
                      <div className="stats-name">Last Rating {formatDate(data.externalRepresentative.lastRating.date)}</div>
                    </Col>
                  ) : null }
                </Row>
              ) : null}
            </div>
          </div>
        ) : (
          <div>
            <div className="stats-group b-b-1 p-b-extra-md m-t-extra-xs m-b-extra-xs">
              <div className="text-title m-b-md">{data.contactName}</div>
              {data.internalUserLayout ? (
                <Row gutter={15} type="flex">
                  {checkValidValue(data.internalUserLayout.daySinceLastReferral) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.internalUserLayout.daySinceLastReferral)}</div>
                      <div className="stats-name">Day Since Last Referral</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.openCases) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.internalUserLayout.openCases)}</div>
                      <div className="stats-name">Open Cases</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.walkthroughApprovalRating) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{data.internalUserLayout.walkthroughApprovalRating !== '-' ? `${formatMetricsValue(data.internalUserLayout.walkthroughApprovalRating)}%` : '-'}</div>
                      <div className="stats-name">Walkthrough Approval Rating</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.iwoSuccessRate) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{data.internalUserLayout.iwoSuccessRate !== '-' ? `${formatMetricsValue(data.internalUserLayout.iwoSuccessRate)}%` : '-'}</div>
                      <div className="stats-name">IWO Success Rate</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.iwoSuccessRatio) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{data.internalUserLayout.iwoSuccessRatio !== '-' ? `${formatMetricsValue(data.internalUserLayout.iwoSuccessRatio)}%` : '-'}</div>
                      <div className="stats-name">IWO Closure Ratio</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.iwoAvgTurnAroundTime) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.internalUserLayout.iwoAvgTurnAroundTime)}</div>
                      <div className="stats-name">IWO Avg Turn Around Time</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.walkthroughTurnAroundTime) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.internalUserLayout.walkthroughTurnAroundTime)}</div>
                      <div className="stats-name">Walkthrough Turn Around Time</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.lienClosureRatio) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{data.internalUserLayout.lienClosureRatio}</div>
                      <div className="stats-name">Lien Closure Ratio</div>
                    </Col>
                  ) : null }
                </Row>
              ) : null}
            </div>
            <div className="stats-group p-b-extra-md m-t-extra-xs">
              {data.internalUserLayout ? (
                <Row gutter={15} type="flex">
                  {checkValidValue(data.internalUserLayout.avgCostSavings) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.internalUserLayout.avgCostSavings)}</div>
                      <div className="stats-name">Avg Cost Savings 30 Days</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.medianCostSavings) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.internalUserLayout.medianCostSavings)}</div>
                      <div className="stats-name">Median Cost Savings 30 Days</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.turnAroundTime) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.internalUserLayout.turnAroundTime)}</div>
                      <div className="stats-name">Turn Around Time (Lien-Days)</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.numberInPersonEvents) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.internalUserLayout.numberInPersonEvents)}</div>
                      <div className="stats-name">Number of In Person Events</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.averageRating) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.internalUserLayout.averageRating.count)}</div>
                      <div className="stats-name">Average Rating</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.lastRating) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{formatMetricsValue(data.internalUserLayout.lastRating.value)}</div>
                      <div className="stats-name">
                        Last Rating {data.internalUserLayout.lastRating.date ? formatDate(data.internalUserLayout.lastRating.date) : '-'}
                      </div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.injuredWorkerMeetings) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{data.internalUserLayout.injuredWorkerMeetings.length}</div>
                      <div className="stats-name">Injured Worker Meetings</div>
                    </Col>
                  ) : null }
                  {checkValidValue(data.internalUserLayout.lienAppearance) ? (
                    <Col className="stats-item" sm={6} xs={8}>
                      <div className="stats-value">{data.internalUserLayout.lienAppearance.length}</div>
                      <div className="stats-name">Lien Appearance</div>
                    </Col>
                  ) : null }
                </Row>
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: (id) => dispatch(fetchContactMetricsStart(id))
});

const mapStateToProps = (state) => ({
  contactId: getContactId(state.get('route').get('location').get('pathname')),
  data: state.get('contactMetrics').get('data').toJS(),
  loading: state.get('contactMetrics').get('fetch').get('loading')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'contactMetrics', reducer });
const withSaga = injectSaga({ key: 'contactMetrics', saga });

export default compose(withReducer, withSaga, withConnect)(Metrics);
