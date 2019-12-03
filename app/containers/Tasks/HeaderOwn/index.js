import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Header from '../Header';

const computeCount = (state) => ['next-7-days', 'today', 'overdue'].reduce((ret, filter) => {
  ret += state.get(filter).get('data').size;
  return ret;
}, 0);

const HeaderOwn = (props) => (
  <Header title="My Tasks" count={props.count} />
);

const mapStateToProps = (state) => ({
  count: state.get('tasks') ? computeCount(state.get('tasks').get('fetchMyOwn')) : 0
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(HeaderOwn);
