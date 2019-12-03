import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchTaskStart } from './actions';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../reducer';
import injectSaga from '../../../utils/injectSaga';
import saga from './saga';
import List from '../List';

class ListPerCase extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <List {...this.props} />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchTaskStart())
});

const mapStateToProps = (state) => ({
  data: state.get('tasks').get('data').toJS(),
  loading: state.get('tasks').get('fetch').get('loading')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'tasks', reducer });
const withSaga = injectSaga({ key: 'tasksList', saga });

export default compose(withReducer, withSaga, withConnect)(ListPerCase);
export { mapDispatchToProps };
