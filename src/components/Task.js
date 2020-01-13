import React, { Component } from "react";
import { connect } from "react-redux";

import "./Task.scss";

class Task extends Component {
  onDelete = () => {
    this.props.dispatch({ type: "DELETE_TASK", id: this.props.task.id });
  };

  onComplete = () => {
    this.props.dispatch({ type: "COMPLETE_TASK", id: this.props.task.id });
  };

  render() {
    const { task } = this.props;
    return (
      <div className="task">
        <h2 className="task-title">{task.title}</h2>
        <p className="task-body">{task.body}</p>
        <p></p>
        {!task.completed && (
          <button onClick={this.onComplete} disabled={task.completed}>
            {task.completed ? "Completed" : "Done"}
          </button>
        )}
        <button onClick={this.onDelete}>Delete</button>
      </div>
    );
  }
}
export default connect()(Task);
