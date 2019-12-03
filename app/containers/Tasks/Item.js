import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import iconDate from '../../images/icons/icon-date.png';
import { singleTaskStart } from './Drawer/actions';
import TaskChecked from './TaskChecked';

const openEditDrawer = (e, props) => {
  if (e.target.className !== 'prevent-to-open-edit') {
    props.onEdit();
  }
};

const Task = (props) => (
  <div className="events-tasks-widget-item" role="link" tabIndex="0" onKeyPress={props.onEdit} onClick={(e) => openEditDrawer(e, props)} style={{ cursor: 'pointer' }}>
    <div className="icon">
      <TaskChecked id={props.id} checked={props.endedOn} />
    </div>
    <div className="content">
      <div className="events-tasks-widget-item-header">
        {props.title ?
          (
            <div className="title">{props.title}</div>
          ) : null
        }
        <div className="date">
          <img src={iconDate} alt="date" />
          <span>{props.date}</span>
        </div>
      </div>
      {props.info ?
        (
          <div>{props.info}</div>
        ) : null
      }
      {props.account ? props.account : null}
    </div>
  </div>
);

const mapDispatchToProps = (dispatch, { id }) => ({
  onEdit: () => dispatch(singleTaskStart(id))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(Task);
