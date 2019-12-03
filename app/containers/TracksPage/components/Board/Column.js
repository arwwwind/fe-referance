import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

class Column extends React.Component {
  render() {
    return (
      <div className="column-container">
        <div className="category-title">{this.props.column.title}</div>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div className={`tasks-list ${this.props.dragging ? 'all-dragging' : ''} ${snapshot.isDraggingOver ? 'dragging' : ''}`} {...provided.droppableProps} ref={provided.innerRef}>
              {this.props.tasks.map((task, index) => <Task key={task.id} task={task} boardID={this.props.boardID} index={index} onEditTask={this.props.onEditTask} />)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default Column;
