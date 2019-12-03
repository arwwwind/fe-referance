import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

class Task extends React.Component {
  onEditTask = (id, boardID) => (e) => {
    e.preventDefault();
    if (!e.target.getAttribute('href')) {
      this.props.onEditTask(id, boardID);
    }
  };
  render() {
    const { task, index, boardID } = this.props;
    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div className={`task-container ${snapshot.isDragging ? 'dragging' : ''}`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} onClick={this.onEditTask(task.id, boardID)}>
            <div className="info-container">
              <div className="title">{task.name}</div>
              <div className="date">
                <svg viewBox="64 64 896 896" className="clock-icon" data-icon="clock-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
                { moment(task.dueDate).format('MMM D') }
              </div>
              <div className="owned-by"><span>For</span> { `${task.preAssignedToUser.firstName} ${task.preAssignedToUser.lastName}` }</div>
              {task.preAssignedToUser.organisation ?
                <div className="account"><span>Account:</span> <NavLink to={`/organization/${task.preAssignedToUser.organisation.id}`}>{task.preAssignedToUser.organisation.companyName}</NavLink></div>
                : null}
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Task;
