import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col } from 'antd';
import classNames from 'classnames';
import { fetchStatisticsStart } from './actions';

import reducer from './reducer';
import { saga } from './saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import StatisticsItem from './components/StatisticsItem';
import Preloader from '../Preloader';

class Statistics extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    const { data } = this.props;
    return !Object.keys(data).length ? <Preloader /> : (
      <div className={classNames(this.props.className, 'juvo-statistics')}>
        <Row type="flex" justify="space-between" gutter={8}>
          <Col span={5}>
            <StatisticsItem value={data.outstandingCases} title="Outstanding Cases" link="/cases" linkText="See All Lien Cases" />
          </Col>
          <Col span={5}>
            <StatisticsItem value={data.injuredWorkerCases} title="Injured Worker Cases" link="/cases" linkText="See All Lien Cases" />
          </Col>
          <Col span={5}>
            <StatisticsItem value={data.newCases} title="New Cases" link="/cases" linkText="See All Lien Cases" />
          </Col>
          <Col span={5}>
            <StatisticsItem value={data.oldCases} title="Old Cases" link="/cases" linkText="See All Lien Cases" />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchStatisticsStart()),
});

const mapStateToProps = (state) => ({
  data: state.get('statistics').get('data').toJS(),
  loading: state.get('statistics').get('fetch').get('loading')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'statistics', reducer });
const withSaga = injectSaga({ key: 'statistics', saga });

export default compose(withReducer, withSaga, withConnect)(Statistics);
export { mapDispatchToProps };
