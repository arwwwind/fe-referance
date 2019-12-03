import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchFilteredTaskStart } from './actions';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../utils/injectSaga';
import saga from './saga';
import List from '../List';
import { DAEMON } from '../../../utils/constants';

class ListMyOwn extends React.Component {
  componentDidMount() {
    this.props.fetchData(this.props.filter);
  }

  render() {
    return (
      <List {...this.props} />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: (filter) => dispatch(fetchFilteredTaskStart(filter))
});

const mapStateToProps = (state, props) => ({
  data: state.get('tasks').get('fetchMyOwn').get(props.filter).get('data')
    .toJS(),
  loading: state.get('tasks').get('fetchMyOwn').get(props.filter).get('loading')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'tasks', reducer });
const withSaga = injectSaga({ key: 'tasksListMyOwn', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(ListMyOwn);
export { mapDispatchToProps };
