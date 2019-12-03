import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import injectSaga from '../../../utils/injectSaga';
import circleEmpty from '../../../images/icons/circle-empty.png';
import circleChecked from '../../../images/icons/circle-check.png';
import { taskCheckedStart } from './actions';
import { DAEMON } from '../../../utils/constants';

const checkTask = (e, props) => {
  e.preventDefault();
  props.onCheck(props.id, props.checked);
};

const TaskChecked = (props) => (
  <a className="prevent-to-open-edit" href="#" onClick={(e) => checkTask(e, props)}>
    <img className="prevent-to-open-edit" src={props.checked ? circleChecked : circleEmpty} alt="not-checked" />
  </a>
);

const mapDispatchToProps = (dispatch) => ({
  onCheck: (id, checked) => dispatch(taskCheckedStart(id, checked))
});

const withConnect = connect(null, mapDispatchToProps);
const withSaga = injectSaga({ key: 'task-checked', saga, mode: DAEMON });

export default compose(withSaga, withConnect)(TaskChecked);
