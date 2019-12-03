import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { formatMetricsValue } from '../../../../../utils/common';
import { statisticsLienStart } from '../actions';
import Preloader from '../../../../../components/Preloader/Preloader';

class LiensMetrics extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { data, loading } = this.props;

    if (loading) {
      return <Preloader />;
    }

    return (
      <div className="group">
        <div>
          <div className="value">{formatMetricsValue(data.get('costSavings'))}%</div>
          <div className="f-s-13">Cost of Savings</div>
        </div>
        <div>
          <div className="value">{formatMetricsValue(data.get('outstandingLiens'))}</div>
          <div className="f-s-13">Outstnading Liens</div>
        </div>
        <div>
          <div className="value">{formatMetricsValue(data.get('settledLiens'))}</div>
          <div className="f-s-13">Settled Liens</div>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch, props) => ({
  fetchData: () => dispatch(statisticsLienStart(props.caseId))
});

const mapStateToProps = (state) => {
  const statistics = state.get('liens').get('statistics');
  return {
    data: statistics.get('data'),
    loading: statistics.get('loading')
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LiensMetrics);
