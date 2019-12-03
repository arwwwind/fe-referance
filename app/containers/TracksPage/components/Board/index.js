import React from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { Button } from 'antd';

class Board extends React.Component {
  state = {...this.props.data, dragging: false};
  onDragStart = () => {
    this.setState((state) => ({
      dragging: !state.dragging
    }));
  };
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)){
      const newState = {
        ...this.state,
        dragging: false,
      };
      this.setState(newState);
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIDs = Array.from(start.taskIDs);
      newTaskIDs.splice(source.index, 1);
      newTaskIDs.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIDs: newTaskIDs
      };

      const newState = {
        ...this.state,
        dragging: !this.state.dragging,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
    } else {
      const startTaskIDs = Array.from(start.taskIDs);
      startTaskIDs.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIDs: startTaskIDs
      };

      const finishTaskIDs = Array.from(finish.taskIDs);
      finishTaskIDs.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIDs: finishTaskIDs
      };

      const newState = {
        ...this.state,
        dragging: !this.state.dragging,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      };

      this.setState(newState);

    }

    this.props.onMoveTask({...destination, draggableId});
  };
  addBtn = (boardID) => (e) => {
    e.preventDefault();
    this.props.onAdd(undefined, boardID);
  };
  render() {
    return (
      <div style={{position: 'relative'}}>
        <div className="tasks-board">
          <div className="board-title">
            <div>{this.props.boardTitle}</div>
            <Button type="primary" size="small" onClick={this.addBtn(this.props.boardID)}>Add</Button>
          </div>
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragUpdate={this.onDragUpdate}
            onDragEnd={this.onDragEnd}
          >
            {
              this.state.columnOrder.map((columnId) => {
                const column = this.state.columns[columnId];
                const tasks = column.taskIDs.map((taskID) => this.state.tasks[taskID]);

                return <Column key={column.id} column={column} tasks={tasks} boardID={this.props.boardID} onEditTask={this.props.onEditTask} dragging={this.state.dragging} />;
              })
            }
          </DragDropContext>
        </div>
        <div className="vertical-line" />
      </div>
    );
  }
}

export default Board;
