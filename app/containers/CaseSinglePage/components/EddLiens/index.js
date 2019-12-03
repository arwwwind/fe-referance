import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import { fetchLiensStart, editLiensStart } from './components/actions';
import reducer from './components/reducer';
import saga from './components/saga';
import Header from './components/EddLiensHeader';
import Details from './components/EddLiensDetails';
import Chart from './components/EddLiensChart';

class EddLiens extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="case-stats p-b-extra-sm m-b-extra-sm">
        <Header
          editData={this.props.data}
          loading={this.props.loading}
          overlapDays={this.props.overlapDays}
          amountOwned={this.props.amountOwned}
          savings={this.props.savings}
          editLiensStart={this.props.editLiensStart}
        />
        <div className="stats-content">
          <Details data={this.props.data} />
          <Chart data={this.props.chartData || []} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { id }) => ({
  fetchData: () => dispatch(fetchLiensStart(id)),
  editLiensStart: (data, form, onClose) => dispatch(editLiensStart(id, data, form, onClose))
});

const mapStateToProps = (state) => ({
  data: state.get('eddLiens').get('data').toJS(),
  chartData: state.get('eddLiens').get('chartData').toJS(),
  overlapDays: state.get('eddLiens').get('overlapDays'),
  amountOwned: state.get('eddLiens').get('amountOwned'),
  savings: state.get('eddLiens').get('savings'),
  loading: state.get('eddLiens').get('fetch').get('loading')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'eddLiens', reducer });
const withSaga = injectSaga({ key: 'eddLiens', saga });

export default compose(withReducer, withSaga, withConnect)(EddLiens);
export { mapDispatchToProps };
