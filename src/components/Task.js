import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTask, completeTask, incompleteTask } from "../redux/actions";

import "./Task.scss";

class Task extends Component {
  onDelete = () => {
    this.props.deleteTask(this.props.task.id)
  };

  onComplete = () => {
    this.props.completeTask(this.props.task.id)
  };

  onIncomplete = () => {
    this.props.incompleteTask(this.props.task.id)
  };

  render() {
    const { task } = this.props;
    return (
      <div className="task">
        <h2 className="task-title">{task.title}</h2>
        <p className="task-body">{task.body}</p>
        <p></p>
        {task.completed ? (
          <button onClick={this.onIncomplete}>
            In Progress
          </button>
        ) : (
          <button onClick={this.onComplete}>
            Done
          </button>
        )}
        <button onClick={this.onDelete}>Delete</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTask: id => dispatch(deleteTask(id)),
    completeTask: id => dispatch(completeTask(id)),
    incompleteTask: id => dispatch(incompleteTask(id)),
  };
}

export default connect(null, mapDispatchToProps)(Task);
